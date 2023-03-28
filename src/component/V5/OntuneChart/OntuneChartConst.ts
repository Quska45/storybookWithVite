import type { ChartDataset, LayoutPosition } from "chart.js";
import { OntuneChartDateUtil, OntuneChartColorUtil } from "./OntuneChartUtils";

export const DefaultValue = {
    COMPONENT_WIDTH: 800,
    COMPONENT_HEIGHT: 500,
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
    SHOW_CROSS_HAIR: true,
    USE_INDICATOR: true,
    USE_ANIMATION: false,
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
        TOP: 'flex-direction: column-reverse;',
        RIGHT: 'flex-direction: row;',
        BOTTOM: 'flex-direction: column;',
        LEFT: 'flex-direction: row-reverse;',
        getStyleByPosition: function( position: LayoutPosition ){
            const _this = this;
            if( position == 'top' ){
                return _this.TOP;
            } else if( position == 'right' ){
                return _this.RIGHT;
            } else if( position == 'bottom' ){
                return _this.BOTTOM;
            } else {
                return _this.LEFT;
            };
        }
    },
    ChartBody: {
        HORIZON: 'width: 100%; height: 70%;',
        VERTICAL: 'width: 70%; height: 100%;',
        FULL_HORIZON: 'width: 100%; height: 100%;',
        FULL_VERTICAL: 'width: 100%; height: 100%;',
        getStyleByPositionAndShowLegend( position: LayoutPosition, showLegend: boolean ){
            const _this = this;
            if( position == 'top' || position == 'bottom' ){
                if( showLegend ){
                    return _this.HORIZON;
                } else {
                    return _this.FULL_HORIZON;
                };
            } else {
                if( showLegend ){
                    return _this.VERTICAL;
                } else {
                    return _this.FULL_VERTICAL;
                };

            };
        }
    },
    ResizeBar: {
        HORIZON: 'width: 100%; cursor: row-resize;',
        VERTICAL: 'height: 100%; cursor: col-resize;',
        HIDDEN: 'display: none;',
        getStyleByPositionAndShowLegend( position: LayoutPosition, showLegend: boolean ){
            const _this = this;

            if( !showLegend ){
                return _this.HIDDEN;
            };

            if( position == 'top' || position == 'bottom' ){
                return _this.HORIZON;
            } else {
                return _this.VERTICAL;
            };
        }
    },
    LegendContainer: {
        HORIZON: 'width: 100%; height: 30%;',
        VERTICAL: 'width: 30%; height: 100%;',
        HIDDEN: 'display: none;',
        getStyleByPositionAndShowLegend( position: LayoutPosition, showLegend: boolean ){
            const _this = this;

            if( !showLegend ){
                return _this.HIDDEN;
            };

            if( position == 'top' || position == 'bottom' ){
                return _this.HORIZON;
            } else {
                return _this.VERTICAL;
            };
        }
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
                backgroundColor: 
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
                hoverBorderWidth: (globalLineWidth * 2)
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