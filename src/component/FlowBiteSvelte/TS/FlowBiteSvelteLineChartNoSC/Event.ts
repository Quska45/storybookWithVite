export function onButtonClick( index: number, chart, _zoomOption, zoom, buttonProp ){
    let resultFunction;

    if( index == 0 ){
        resultFunction = function( e ){
            _zoomOption.zoom.drag.enabled = !_zoomOption.zoom.drag.enabled;
            _zoomOption.pan.enabled = !_zoomOption.pan.enabled;                
            zoomReset( chart, zoom, buttonProp )
            chart.update();
        };
    }

    return resultFunction;
};

export function zoomReset( chart, zoom, buttonProp ){
    zoom.reset(chart);
    // onButtonClick( 0, chart, zoomOption );
    buttonProp.isSelected = !buttonProp.isSelected;
};