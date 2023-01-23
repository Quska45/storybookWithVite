import { Engine } from "../../CanvasEngine/API/Engine"
import { Vector } from "../../CanvasEngine/Core/Math/Vector";
import { Quadrant } from "../../CanvasEngine/Core/Object2D/Scene";
import type { DataSet } from "../Chart/DataSet";
import type { Label } from "../Chart/Label";
import type { TConfig } from "../Common/Config";
import type { TData } from "../Common/Data";
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
        let dataStepSize: number = (this.engine.renderer.canvas.height - Y_POSTION) / dataArr.length;

        this.addDataTexts( dataArr, dataStepSize );
        this.addLabelTexts( labelStepSize );
        // this.addLines( labelStepSize, dataStepSize );
        // this.addPoint( labelStepSize, dataStepSize );
    };

    addLines2( data: number[] ){
        data.forEach(( cur, i ) => {
            
        });
    };

    /**
     * this.config의 label을 이용해 실제 line을 추가하는 기능
    */
    addLines( labelInterval: number, dataStepSize: number ){
        this.config.data.labels.reduce(( acc, cur, i ) => {
            let lineFirstPosition = new Vector( X_POSTION + (labelInterval * (i - 1)), Y_POSTION + (dataStepSize * (i - 1)) );
            let lineSecondPosition = new Vector( X_POSTION + (labelInterval * i) , Y_POSTION + (dataStepSize * i) );

            let line = this.engine.addLine( uuid(), lineFirstPosition, lineSecondPosition );

            return acc;
        });
    };

    /**
     * this.config의 label을 이용해 line의 꼭지점을 그리는 기능
    */
    addPoint( labelStepSize: number, dataStepSize: number ){
        this.config.data.labels.reduce(( acc, cur, i ) => {
            let position = new Vector( X_POSTION + (labelStepSize * i), Y_POSTION + (dataStepSize * i) );

            let circle = this.engine.addCircle( uuid(), position );

            return acc;
        });
    };
    
    /**
     * y축에 표시될 data의 배열을 실제로 캔버스에 그리는 기능
    */
    addDataTexts( dataArr: number[], dataStepSize: number ){
        dataArr.reduce(( acc, cur, i ) => {
            let text = this.addData( cur, dataStepSize * i );
                
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
        let lineSecondPosition = new Vector( this.engine.renderer.canvas.width - startXPosition , Y_POSTION + stepSize );
        let text = this.engine.addText( uuid(), data.toString(), position );
        let line = this.engine.addLine( uuid(), lineFirstPosition, lineSecondPosition );
        line.lineWidth = 0.2;

        return text;
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
        let lineSecondPosition = new Vector( X_POSTION + stepSize , this.engine.renderer.canvas.height - startYPosition );
        let text = this.engine.addText( uuid(), label, position );
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
        let rangeShare = Math.ceil( range / stepSize );
        let isMaxPositive = Math.sign( min ) >= 0 ? true : false;
        let isMinPositive = Math.sign( min ) >= 0 ? true : false;
        let startPoint = Math.ceil( min / rangeShare );
        let endPoint = Math.ceil( max / rangeShare );

        if( isMaxPositive ){
            endPoint = Math.ceil( max / rangeShare ) * stepSize;
        } else {
            endPoint = Math.floor( max / rangeShare ) * stepSize;
        };

        if( isMinPositive ){
            startPoint = Math.ceil( min / rangeShare ) * stepSize;
        } else {
            startPoint = Math.floor( min / rangeShare ) * stepSize;
        };

        let dataArr = [];
        let whileEndValue = 0;
        let whileIndex = 0;
        while( whileEndValue != endPoint ){
            whileEndValue = startPoint + (stepSize * whileIndex);
            dataArr.push( whileEndValue );
            whileIndex++;
        };

        return dataArr;
    };

    run(){
        this.engine.run();
    };
};