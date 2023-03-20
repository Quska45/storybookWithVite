import type { ChartDataset } from "chart.js";
import { OntuneChartDateUtil, OntuneChartColorUtil } from "./OntuneChartUtils";

export const DefaultValue = {
    COMPONENT_WIDTH: 800,
    COMPONENT_HEIGHT: 500,
    CANVAS_WIDTH: '100%',
    CANVAS_HEIGHT: '100%',
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
            
            timeStr = `${fullDate} ${hour}:${min}:${sec}`;

            resultTermArr.push(timeStr);
        };
        
        return resultTermArr;
    },
    getHost: function getHost(){
        let _this = this;
        let resultHostArr: ChartDataset[] = [];

        for( let i=0; i<this.host; ++i ){
            let dataset = {
                label: 'Test PC' + _this.testDataIndex,
                fill: false,
                borderColor: `rgb(${OntuneChartColorUtil.randomColorFactor()}, ${OntuneChartColorUtil.randomColorFactor()}, ${OntuneChartColorUtil.randomColorFactor()})`,
                // borderColor: OntuneChartColorUtil.makeHexColor(),
                data: [],
                radius: 0,
                borderWidth: 1,
                tension: false,
                stepped: 0,
                borderDash: [],
                minRotation: 0,
                maxRotation: 0,
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