import type { ChartMeta, ChartTypeRegistry, Element, Plugin, PointElement, ChartDatasetProperties } from "chart.js";
import type { AnyObject } from "chart.js/dist/types/basic";

export const maxValueTooltip: Plugin<keyof ChartTypeRegistry, AnyObject> = {
    id: 'maxValueTooltip',
    afterDatasetDraw(chart, args, options) {
        const { ctx, chartArea: { left, right, top, bottom }, scales: { x, y } } = chart;
        let datasets = chart.data.datasets;
        let datasetMetas = chart.getSortedVisibleDatasetMetas();
        let xScale = chart.scales['x']; // x축 스케일링 객체
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

        let xMin = xScale.getValueForPixel(chart.chartArea.left); // 현재 화면에서 가장 왼쪽 데이터 포인트의 x값
        let xMax = xScale.getValueForPixel(chart.chartArea.right); // 현재 화면에서 가장 오른쪽 데이터 포인트의 x값
        
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
        
        fillteredDatasets.forEach(( fillteredDataset, i ) => {
            fillteredDataset.forEach(( data, j ) => {
                if( data > maxDataValue ){
                    maxDataValue = data;
                    maxDataValueIndex = j;
                    maxDatasetIndex = i;
                };
            });
        });
        
        maxPointElement = fillteredDatasetMetas[maxDatasetIndex][maxDataValueIndex];

        ctx.save();
        ctx.beginPath();

        // ctx.fillStyle = 'red';
        // ctx.fillRect( maxPointElement.x - (tooltipWidth/2), maxPointElement.y - (tooltipHeight/2) - tooltipMargin, tooltipWidth, tooltipHeight ); // yaxes value

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = 'black';
        ctx.fillText( maxDataValue.toFixed(), maxPointElement.x - (fontSize/2), maxPointElement.y - tooltipMargin - (tooltipHeight/2) + (fontSize) );

        ctx.stroke()
    },
}