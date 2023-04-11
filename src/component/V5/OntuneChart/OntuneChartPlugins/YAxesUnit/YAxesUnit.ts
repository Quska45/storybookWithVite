import type { Chart, Plugin } from "chart.js";
import type { AnyObject, EmptyObject } from "chart.js/dist/types/basic";

export class YAxesUnit {
    id: string;
    unit: string;
    plugin: Plugin;

    /**
     * 차트의 y축 상단에 단위 값을 표시해주는 Plugin
     * @param {string} unit 화면에 표시될 단위 값
     */
    constructor( unit: string ){
        this.id = 'yAxesUnit'
        this.unit = unit;

        let plugin: Plugin & { unit } = {
            id: this.id,
            unit: this.unit
        };
        plugin.afterRender = this.afterRender;
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
        const { ctx, chartArea: { left, right, top, bottom } } = chart;
        const yLabelItems = chart.scales['y'].getLabelItems();
        const lastYLabelItem = yLabelItems[ yLabelItems.length - 1 ];

        const fontSize = 12;
        const xPosition = yLabelItems[ yLabelItems.length - 1 ].options.translation[0] - yLabelItems[ yLabelItems.length - 1 ].font.size + (fontSize /2);
        const yPosition = yLabelItems[ yLabelItems.length - 1 ].options.translation[1] - yLabelItems[ yLabelItems.length - 1 ].font.size - (fontSize /2);

        
        ctx.save();
        // ctx.strokeStyle = 'black';

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText( `(${this.unit})`, xPosition, yPosition );

        ctx.restore();
    };

};