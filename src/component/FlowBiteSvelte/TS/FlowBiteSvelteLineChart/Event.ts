export class FlowBiteSvelteLineChartEvent{
    chart;
    options;
    zoomOption;

    constructor( chart, options, zoomOption ){
        this.chart = chart;
        this.options = options;
        this.zoomOption = zoomOption;
    };

    triggerButtonEventByButtonIndex( index: number, buttonProp ){
        let event = this;

        if( index == 0 ){
            event.clickZoomButton( buttonProp );
        };
    };

    clickZoomButton( buttonProp ){
        let event = this;

        event.zoomOption.zoom.drag.enabled = !event.zoomOption.zoom.drag.enabled;
        event.zoomOption.pan.enabled = !event.zoomOption.pan.enabled;                
        event.toggleButtonSelected( buttonProp );
        // event.chart.update();
    };

    /**
     * chart의 zoom을 초기 상태로 reset
    */
    toggleButtonSelected( buttonProp){
        let event = this;

        buttonProp.isSelected = !buttonProp.isSelected;
    };
};