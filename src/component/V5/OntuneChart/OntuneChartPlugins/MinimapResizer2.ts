import type { Chart, Plugin } from "chart.js";
import type { AnyObject, EmptyObject } from "chart.js/dist/types/basic";
import type { OntuneChart } from "../OntuneChart";

export class MinimapResizer {
    id: string;
    plugin: Plugin;
    ontuneChart: OntuneChart;

    /**
     * 미니맵의 표시된 영역을 조절 하는 plugin. 기능 추가 개발 필요.
     * @param {OntuneChart} OntuneChart 컴포넌트 인스턴스
    */
    constructor( ontuneChart: OntuneChart ){
        this.id = 'minimapResizer'
        this.ontuneChart = ontuneChart;

        let plugin: Plugin & { ontuneChart } = {
            id: this.id,
            ontuneChart: this.ontuneChart
        };
        // plugin.afterRender = this.afterRender;
        plugin.afterDatasetsDraw = this.afterRender;
        this.plugin = plugin;
    };

    /**
     * chartjs plugin의 beforeRender 콜백에 등록 되는 메서드.
     * 개발자가 호출하면 안됨. chartjs가 this.plugin을 등록 받는 형태로 개발되어야 함.
     *
     * @param {Chart} chart
     * @param {args} args
     * @param {options} options
     * @return {void}
     */
    afterRender( chart: Chart, args: EmptyObject, options: AnyObject ){
        this.ontuneChart.resizeMinimapController();
    };
};