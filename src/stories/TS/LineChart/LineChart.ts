import { Engine } from "../../CanvasEngine/API/Engine"
import { Vector } from "../../CanvasEngine/Core/Math/Vector";
import { Quadrant } from "../../CanvasEngine/Core/Object2D/Scene";
import type { DataSet } from "../Chart/DataSet";
import type { Label } from "../Chart/Label";
import type { TConfig } from "../Common/Config";
import type { TData, TDataset } from "../Common/Data";
import { v4 as uuid } from 'uuid';
import { X_POSTION, Y_POSTION, LABEL_COORDINATE, DATA_COORDINATE, STEP_COUNT } from '../Common/ConstValue'

export class LineChart {
    engine: Engine;
    config: TConfig;
    // labels: Label[] = [];
    dataSets: DataSet[] = [];

    constructor( selector, config: TConfig ){
        this.engine = new Engine( selector );
        this.config = config;
    };

    init(){
        let fullDataArr = this.config.data.datasets.reduce(( acc, cur ) => {
            acc = [ ...acc, ...cur.data ];
            return acc;
        }, []);

        let dataMaxValue = Math.max.apply( null, fullDataArr );
        let dataMinValue = Math.min.apply( null, fullDataArr );
        let range = dataMaxValue - dataMinValue;
        let stepSize: number = this.getStepSize( range, STEP_COUNT );
        
        this.engine.setQuadrant( Quadrant.quadrant1 );
        
        let dataArr = this.getDataArr( dataMaxValue, dataMinValue, range, stepSize );
        let labelStepSize: number = (this.engine.renderer.canvas.width - X_POSTION * 2) / (this.config.data.labels.length - 1);
        let dataStepSize: number = (this.engine.renderer.canvas.height - Y_POSTION * 2) / (dataArr.length - 1);
        let positions:[Vector[]] = [];

        this.addDataTexts( dataArr, dataStepSize, stepSize );
        this.addLabelTexts( labelStepSize );
        this.config.data.datasets.forEach(( cur, i ) => {
            let positionArr = this.addPoint( cur, labelStepSize, dataArr[dataArr.length-1] - dataArr[0], dataArr, dataStepSize );
            this.addLegend( cur, this.engine.renderer.canvas.height - Y_POSTION, i, this.config.data.datasets.length-1 );
            positions.push( positionArr );
        });
        positions.forEach(( position, i ) => {
            this.addLines( position, this.config.data.datasets[i] );
        });
    };

    /**
     * this.config의 label을 이용해 line의 꼭지점을 그리는 기능
    */
    addPoint( dataset: TDataset, labelInterval, range, dataArr: number[], dataStepSize: number ){
        let dataStepSizeRatio = dataStepSize * (dataArr.length-1) / range;
        let positions: Vector[] = [];

        dataset.data.forEach(( cur, i ) => {
            let realHeight;
            let position;
            if( dataArr[0] < 0 && cur >= 0 ){
                realHeight = Y_POSTION + ((cur + (dataArr[0] * -1))*dataStepSizeRatio);
            } else {
                realHeight = Y_POSTION + (cur*dataStepSizeRatio);
            };

            if( cur < 0 ){
                let dataZeroIndex = dataArr.findIndex(( data ) => { return data == 0 });
                let dataZeroPosition = ((dataArr[ dataZeroIndex ] - dataArr[ 0 ]) * dataStepSizeRatio);
                realHeight = Y_POSTION + dataZeroPosition + (cur*dataStepSizeRatio);
            };
            position = new Vector( X_POSTION + (labelInterval * i), realHeight);
            positions.push( position );

            let circle = this.engine.addCircle( uuid(), position );
            circle.strokeStyle = dataset.borderColor;
        });

        return positions;
    };

    /**
     * this.config의 label을 이용해 실제 line을 추가하는 기능
    */
    addLines( positions: Vector[], dataset: TDataset ){
        for( let i=0; i<positions.length; ++i ){
            if( positions.length-1 == i ){
                return;
            };

            let lineFirstPosition = positions[ i ];
            let lineSecondPosition = positions[ i + 1 ];

            let line = this.engine.addLine( uuid(), lineFirstPosition, lineSecondPosition );
            line.strokeStyle = dataset.borderColor;
            line.lineWidth = dataset.lineWidth
        };
    };

    /**
     * this.config를 이용해 X축에 표시되는 텍스트인 label을 그리는 기능
    */
    addLabelTexts( labelStepSize: number ){
        this.config.data.labels.reduce(( acc, cur, i ) => {
            this.addLabel( cur, labelStepSize * i );

            return acc;
        }, []);
    };
    
    /**
     * this.config의 label을 이용해 실제 label에 해당하는 text 추가 기능
    */
    addLabel( label: string, stepSize ){
        let startXPosition = LABEL_COORDINATE.x;
        let startYPosition = LABEL_COORDINATE.y;

        let position = new Vector( startXPosition + stepSize, startYPosition );
        let lineFirstPosition = new Vector( X_POSTION + stepSize, Y_POSTION );
        let lineSecondPosition = new Vector( X_POSTION + stepSize , this.engine.renderer.canvas.height - Y_POSTION + 5 );
        let text = this.engine.addText( uuid(), label, position );
        let line = this.engine.addLine( uuid(), lineFirstPosition, lineSecondPosition );

        line.lineWidth = 0.2;

        return text;
    };

    /**
     * y축에 표시될 data의 배열을 실제로 캔버스에 그리는 기능
    */
    addDataTexts( dataArr: number[], dataStepSize: number, stepSize: number ){
        let dataStepSizeRatio = Math.abs(dataStepSize/stepSize);
        dataArr.reduce(( acc, cur, i ) => {
            let text = this.addData( cur, (dataStepSizeRatio*stepSize) * i );
            // let text = this.addData( cur, (dataStepSize) * i );
                
            acc.push( text );
            return acc;
        }, []);
    };

    /**
     * this.config의 dataset을 이용해 data에 해당하는 text를 추가 기능
    */
    addData( data: number, stepSize: number ){
        let startXPosition = DATA_COORDINATE.x;
        let startYPosition = DATA_COORDINATE.y;

        let position = new Vector( startXPosition, startYPosition + stepSize );
        let lineFirstPosition = new Vector( X_POSTION, Y_POSTION + stepSize );
        let lineSecondPosition = new Vector( this.engine.renderer.canvas.width - X_POSTION , Y_POSTION + stepSize );

        let text = this.engine.addText( uuid(), data.toString(), position );
        let line = this.engine.addLine( uuid(), lineFirstPosition, lineSecondPosition );
        line.lineWidth = 0.2;

        return text;
    };

    /**
     * y축에 표시될 데이터의 간격을 구하는 알고리즘
    */
    getStepSize(range, targetStepCount) {
        // calculate an initial guess at step size
        let tempStep = range / targetStepCount;

        // get the magnitude of the step size
        let mag = Math.floor(Math.log(tempStep) / Math.LN10);
        let magPow = Math.pow(10, mag);

        // calculate most significant digit of the new step size
        let magMsd = Math.round(tempStep / magPow + 0.5);

        // promote the MSD to either 1, 2, or 5
        if (magMsd > 5.0)
            magMsd = 10.0;
        else if (magMsd > 2.0)
            magMsd = 5.0;
        else if (magMsd > 1.0)
            magMsd = 2.0;

        return magMsd * magPow;
    };

    /**
     * y축에 표시될 data의 배열을 구하는 기능
    */
    getDataArr( max: number, min: number, range: number, stepSize: number ){
        if( max % stepSize != 0 ){
            let share = Math.floor( max / stepSize );
            if( Math.sign( share ) >= 0 ){
                max = (Math.floor( max / stepSize ) + 1) * stepSize;
            } else {
                max = (Math.floor( max / stepSize )) * stepSize;
            }
        };
        if( min % stepSize != 0 ){
            let share2 = Math.floor( min / stepSize );
            if( Math.sign( share2 ) >= 0 ){
                min = (Math.floor( min / stepSize ) + 1) * stepSize;
            } else {
                min = (Math.floor( min / stepSize )) * stepSize;
            }
        };

        let resultArr = [];
        let resultIndex = 0;
        if( Math.sign( min ) >= 0 ){
            while( min - (stepSize * resultIndex) != 0 ){
                resultArr.push( min - (stepSize * resultIndex) );
                resultIndex++;
            };
        } else {
            while( min + (stepSize * resultIndex) != 0 ){
                resultArr.push( min + (stepSize * resultIndex) );
                resultIndex++;
            };
        }
        resultIndex = 0;
        while( max - (stepSize * resultIndex) != 0 ){
            resultArr.push( max - (stepSize * resultIndex) );
            resultIndex++;
        };
        resultArr.push(0)
        resultArr.sort(function(a, b)  {
            return a - b;
        });

        return resultArr;
    };

    addLegend( dataset: TDataset, y: number, index: number, legendLength: number ){
        let position = new Vector( (this.engine.renderer.canvas.width / 2) - ( legendLength * 25 ) + ( index * 50 ), y + Y_POSTION / 2 );
        let text = this.engine.addText( uuid(), dataset.label, position );
        text.strokeStyle = dataset.borderColor;
    };

    run(){
        this.engine.run();
    };
};