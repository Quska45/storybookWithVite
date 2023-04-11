import type { ChartTypeRegistry, Plugin, PointElement } from "chart.js";
import type { AnyObject } from "chart.js/dist/types/basic";

/**
 * 현재 화면에 보이는 최대값에 툴팁을 띄워주는 plugin. class 형태로 리팩토링 필요함.
 * @type {Plugin & { aodMaxTooltipPosition }} chart.js의 Plugin의 유니온 타입.
 */
export const MaxValueTooltip: Plugin & { aodMaxTooltipPosition } = {
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

        // tooltip value
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

        let textWidth = ctx.measureText( maxDataValue.toString() ).width;
        tooltipWidth = textWidth + 5;

        // tooltip value
        const xPosition = maxPointElement.x - (tooltipWidth/2);
        const yPosition = maxPointElement.y - (tooltipHeight/2) - tooltipMargin - fontSize;
        const triangleLineScale = 10;
        const rectRadius = 5;
        const triangleVertex1 = { 
            x: xPosition,
            y: maxPointElement.y - tooltipMargin - (fontSize/2)
        };
        const triangleVertex2 = { 
            x: xPosition + tooltipWidth,
            y: maxPointElement.y - tooltipMargin - (fontSize/2)
        };
        const triangleVertex3 = { 
            x: xPosition + (tooltipWidth / 2),
            y: maxPointElement.y - tooltipMargin + triangleLineScale - (fontSize/2)
        };
        const textXPosition = maxPointElement.x;
        const textYPosition = maxPointElement.y - tooltipMargin - (tooltipHeight/2) - (fontSize/3) ;

        // tooltip draw 시작
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = 'black';

        ctx.save();
        ctx.beginPath();

        ctx.fillStyle = 'red';

        // triangle
        ctx.moveTo( triangleVertex1.x, triangleVertex1.y );
        ctx.lineTo( triangleVertex2.x, triangleVertex2.y );
        ctx.lineTo( triangleVertex3.x, triangleVertex3.y );
        ctx.lineWidth = 1;
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        
        // rect
        // ctx.rect( xPosition, yPosition, tooltipWidth, tooltipHeight ); // yaxes value
        ctx.beginPath();
        ctx.moveTo( xPosition + rectRadius, yPosition );

        ctx.lineTo( xPosition + tooltipWidth - rectRadius, yPosition );
        ctx.quadraticCurveTo( xPosition + tooltipWidth, yPosition, xPosition + tooltipWidth, yPosition + rectRadius );

        ctx.lineTo( xPosition + tooltipWidth, yPosition + tooltipHeight - rectRadius );
        ctx.quadraticCurveTo( xPosition + tooltipWidth, yPosition + tooltipHeight, xPosition + tooltipWidth - rectRadius, yPosition + tooltipHeight );

        ctx.lineTo( xPosition + rectRadius, yPosition + tooltipHeight );
        ctx.quadraticCurveTo( xPosition, yPosition + tooltipHeight, xPosition, yPosition + tooltipHeight - rectRadius );

        ctx.lineTo( xPosition, yPosition + rectRadius );
        ctx.quadraticCurveTo( xPosition, yPosition, xPosition + rectRadius, yPosition );
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText( 
            maxDataValue.toFixed(), 
            textXPosition,
            textYPosition
        );
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