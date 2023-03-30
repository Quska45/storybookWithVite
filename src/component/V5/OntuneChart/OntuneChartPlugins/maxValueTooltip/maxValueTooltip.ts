import type { ChartTypeRegistry, Plugin, PointElement } from "chart.js";
import type { AnyObject } from "chart.js/dist/types/basic";

export const maxValueTooltip: Plugin & { aodMaxTooltipPosition } = {
    aodMaxTooltipPosition: null, // 차트 컴포넌트에서 받아오는 값. 어느 위치에 있는 툴팁이 보여 질지에 대한 값.
    id: 'maxValueTooltip',
    afterRender( chart, args, options ) {
        const { ctx, chartArea: { left, right, top, bottom }, scales: { x, y } } = chart;
        
        let xScale = chart.scales['x']; // x축 스케일링 객체

        let datasets = chart.data.datasets;
        let datasetMetas = chart.getSortedVisibleDatasetMetas();

        let fillteredDatasetMetas = [];
        let fillteredDatasetMetaLabels = [];
        let fillteredDatasets = [];

        let maxDatasetIndex = -Infinity;
        let maxDataValueIndex = -Infinity;
        let maxDataValue = -Infinity;
        let maxPointElement: PointElement;

        let tooltipWidth = 20;
        let tooltipHeight = 15;
        let fontSize = 12;
        let tooltipMargin = 5;

        let xMin = xScale.getValueForPixel( chart.chartArea.left ); // 현재 화면에서 가장 왼쪽 데이터 포인트의 x값
        let xMax = xScale.getValueForPixel( chart.chartArea.right ); // 현재 화면에서 가장 오른쪽 데이터 포인트의 x값

        datasetMetas.forEach(( datasetMeta ) => {
            fillteredDatasetMetas.push( datasetMeta.data.slice( xMin, xMax ) );
            fillteredDatasetMetaLabels.push( datasetMeta.label );
        });

        datasets.forEach(( dataset ) => {
            let isDatasetVisible = fillteredDatasetMetaLabels.findIndex(( label ) => {
                return label == dataset.label;
            });

            if( isDatasetVisible < 0 ){
                return;
            };

            fillteredDatasets.push( dataset.data.slice( xMin, xMax ) );
        });
        
        let valueManager = {};
        fillteredDatasets.forEach(( fillteredDataset, i ) => {
            fillteredDataset.forEach(( data, j ) => {
                if( !valueManager[ data ] ){
                    valueManager[ data ] = [];
                };

                valueManager[ data ].push({
                    maxDatasetIndex: i,
                    maxDataValueIndex: j
                });

                if( data > maxDataValue ){
                    maxDataValue = data;
                    maxDataValueIndex = j;
                    maxDatasetIndex = i;
                };
            });
        });
        
        const sorted = quickSort(valueManager[ maxDataValue ]);
        let maxValue;
        if( this.aodMaxTooltipPosition == 'first' ){
            maxValue = sorted[ 0 ];
        } else if( this.aodMaxTooltipPosition == 'middle' ){
            const index = Math.floor( sorted.length / 2 );
            maxValue = sorted[ index ];
        } else {
            const index = sorted.length - 1;
            maxValue = sorted[ index ];
        };
        
        maxDataValueIndex = maxValue.maxDataValueIndex;
        maxDatasetIndex = maxValue.maxDatasetIndex
        maxPointElement = fillteredDatasetMetas[maxDatasetIndex][maxDataValueIndex];

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = 'black';

        ctx.save();
        ctx.beginPath();

        // ctx.fillStyle = 'red';
        // ctx.fillRect( maxPointElement.x - (tooltipWidth/2), maxPointElement.y - (tooltipHeight/2) - tooltipMargin, tooltipWidth, tooltipHeight ); // yaxes value

        ctx.fillText( 
            maxDataValue.toFixed(), 
            maxPointElement.x - (fontSize/2),
            maxPointElement.y - tooltipMargin - (tooltipHeight/2) + (fontSize) 
        );
        // ctx.fillText( maxDataValue.toFixed(), maxPointElement.x - (fontSize/2), maxPointElement.y - tooltipMargin - (tooltipHeight/2) + (fontSize) );

        ctx.stroke();

        ctx.restore();
    },
};

function quickSort ( array ) {
    if ( array.length < 2 ) {
        return array;
    }
    const pivot = [array[ 0 ]];
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
        if ( array[ i ].maxDataValueIndex < pivot[0].maxDataValueIndex ) {
            left.push( array[ i ] );
        } else if ( array[ i ].maxDataValueIndex > pivot[0].maxDataValueIndex ) {
            right.push( array[ i ] );
        } else {
            pivot.push( array[ i ] );
        };
    };

    return quickSort( left ).concat( pivot, quickSort( right ) );
};