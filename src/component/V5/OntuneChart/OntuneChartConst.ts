import type { ChartDataset, LayoutPosition } from "chart.js";
import { OntuneChartDateUtil, OntuneChartColorUtil } from "./OntuneChartUtils";

export const DefaultValue = {
    COMPONENT_WIDTH: 800,
    COMPONENT_HEIGHT: 500,
    CANVAS_WIDTH: '100%',
    CANVAS_HEIGHT: '100%',
    CHART_TYPE: 'line',
    LEGEND_POSITION: 'right',
    SHOW_LEGEND: true,
    SHOW_LEGEND_VALUE: true,
    LEFT_Y_AXES_MIN: 0,
    LEFT_Y_AXES_MAX: 100,
    RIGHT_Y_AXES_MIN: 0,
    RIGHT_Y_AXES_MAX: 100,
    Y_AXES_POSITION: 'left',
    GLOBAL_LINE_WIDTH: 1,
    unicodeBoldNumber: {
        0: '\u{1D7EC}',
        1: '\u{1D7ED}',
        2: '\u{1D7EE}',
        3: '\u{1D7EF}',
        4: '\u{1D7F0}',
        5: '\u{1D7F1}',
        6: '\u{1D7F2}',
        7: '\u{1D7F3}',
        8: '\u{1D7F4}',
        9: '\u{1D7F5}'
    }
};

export const Style = {
    ChartContainer: {
        CONTAINER_TOP: 'flex-direction: column-reverse;',
        CONTAINER_RIGHT: 'flex-direction: row;',
        CONTAINER_BOTTOM: 'flex-direction: column;',
        CONTAINER_LEFT: 'flex-direction: row-reverse;',
        getStyleByPosition: function( position: LayoutPosition ){
            if( position == 'top' ){
                return this.CONTAINER_TOP;
            } else if( position == 'right' ){
                return this.CONTAINER_RIGHT;
            } else if( position == 'bottom' ){
                return this.CONTAINER_BOTTOM;
            } else {
                return this.CONTAINER_LEFT;
            };
        }
    },
    ChartBody: {
        BODY_HORIZON: 'width: 100%; height: 70%;',
        BODY_VERTICAL: 'width: 70%; height: 100%;'
    },
    LegendContainer: {
        CONTAINER_HORIZON: 'width: 100%; height: 30%;',
        CONTAINER_VERTICAL: 'width: 30%; height: 100%;'
    }
};

export const LineDefaultColor = [
    'rgb(154, 32, 140)'
    , 'rgb(225, 18, 153)'
    , 'rgb(255, 234, 234)'
    , 'rgb(245, 198, 236)'
    , 'rgb(113, 73, 198)'
    , 'rgb(252, 41, 71)'
    , 'rgb(254, 98, 68)'
    , 'rgb(255, 222, 185)'
    , 'rgb(255, 242, 204)'
    , 'rgb(255, 217, 102)'
    , 'rgb(244, 177, 131)'
    , 'rgb(223, 166, 123)'
    , 'rgb(36, 89, 83)'
    , 'rgb(64, 142, 145)'
    , 'rgb(228, 147, 147)'
    , 'rgb(216, 216, 216)'
    , 'rgb(187, 214, 184)'
    , 'rgb(174, 194, 182)'
    , 'rgb(148, 175, 159)'
    , 'rgb(219, 228, 198)'
];

export const TestDataMaker = {
    host: 20,
    term: 600,
    testDataIndex: 0,
    getTerm: function getTerm(){
        let resultTermArr = [];
        let startDate = new Date(new Date().getTime() - (this.term*1000));
        let startTime = startDate.getTime();

        let year = startDate.getFullYear();
        let month = OntuneChartDateUtil.getAddZeroValue(startDate.getMonth()+1);
        let day = OntuneChartDateUtil.getAddZeroValue(startDate.getDate());
        let fullDate = `${year}-${month}-${day}`;

        for(let i=1; i<=this.term; ++i){
            let timeStr = '';
            let tempDate = new Date(startTime + (i*1000));
            let hour = OntuneChartDateUtil.getAddZeroValue( tempDate.getHours() );
            let min = OntuneChartDateUtil.getAddZeroValue( tempDate.getMinutes() );
            let sec = OntuneChartDateUtil.getAddZeroValue( tempDate.getSeconds() );
            
            // timeStr = `${fullDate} ${hour}:${min}:${sec}`;
            timeStr = `${hour}:${min}:${sec}`;

            resultTermArr.push(timeStr);
            // resultTermArr.push(tempDate);
        };
        
        return resultTermArr;
    },
    getHost: function getHost( globalLineWidth: number ){
        let _this = this;
        let resultHostArr: ChartDataset[] = [];

        for( let i=0; i<this.host; ++i ){
            let dataset = {
                label: 'Test PC' + _this.testDataIndex,
                fill: false,
                borderColor: 
                    i < 20 
                    ? LineDefaultColor[ i ]
                    : `rgb(${OntuneChartColorUtil.randomColorFactor()}, ${OntuneChartColorUtil.randomColorFactor()}, ${OntuneChartColorUtil.randomColorFactor()})`,
                // borderColor: OntuneChartColorUtil.makeHexColor(),
                data: [],
                radius: 0,
                borderWidth: globalLineWidth,
                tension: false,
                stepped: 0,
                borderDash: [],
                hoverBorderWidth: 5
                // yAxisID: 
                //     i < 10
                //     ? 'y'
                //     : 'y1'
            };

            resultHostArr.push( dataset );
            for( let j=0; j<this.term; ++j ){
                dataset.data.push(parseInt((Math.random() * 100).toString()));
            };

            this.testDataIndex++;
        };

        return resultHostArr;
    },
};