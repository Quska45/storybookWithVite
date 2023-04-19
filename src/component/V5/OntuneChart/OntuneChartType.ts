import type { ChartDataset, ChartTypeRegistry, LayoutPosition } from "chart.js";
import { DefaultValue } from "./OntuneChartConst";

const defaultValue = {...DefaultValue};
export type TOntuneChartProps = {
    componentWidth: number;
    componentHeight: number;
    chartType: keyof ChartTypeRegistry;
    showLegend: boolean;
    legendPosition: LayoutPosition;
    showCanvasLegend: boolean;
    canvasLegendPosition: LayoutPosition;
    leftYAxesMin: number;
    leftYAxesMax: number;
    rightYAxesMin: number;
    rightYAxesMax: number;
    yAxesPosition: TYAxesPosition;
    showLegendValue: boolean;
    globalLineWidth: number;
    showCrossHair: boolean;
    useIndicator: boolean;
    useAnimation: boolean;
    aodMaxTooltipPosition: TAODMaxTooltipPostion;
    showAodMaxTooltip: boolean;
    showLevel1Event: boolean;
    showLevel2Event: boolean;
    showLevel3Event: boolean;
    showLevel4Event: boolean;
    showLevel5Event: boolean;
    level1EventValue: number;
    level2EventValue: number;
    level3EventValue: number;
    level4EventValue: number;
    level5EventValue: number;
    level1EventLineWidth: number;
    level2EventLineWidth: number;
    level3EventLineWidth: number;
    level4EventLineWidth: number;
    level5EventLineWidth: number;
    level1EventPosition: TEventIndicatorPosition;
    level2EventPosition: TEventIndicatorPosition;
    level3EventPosition: TEventIndicatorPosition;
    level4EventPosition: TEventIndicatorPosition;
    level5EventPosition: TEventIndicatorPosition;
    yAxesUnit: string;
    showYAxesUnit: boolean;
    lineTension: number;
    showDataValueTooltip: boolean;
    labels: unknown[];
    datasets: ChartDataset[];
};
export class OntuneChartProps {
    ontuneChartProps = {} as TOntuneChartProps;

    constructor( ontuneChartProps: TOntuneChartProps ){
        ontuneChartProps.componentWidth ? this.ontuneChartProps.componentWidth = ontuneChartProps.componentWidth :  ontuneChartProps.componentWidth = defaultValue.COMPONENT_WIDTH;
        ontuneChartProps.componentHeight ? this.ontuneChartProps.componentHeight = ontuneChartProps.componentHeight :  ontuneChartProps.componentHeight = defaultValue.COMPONENT_HEIGHT;
        ontuneChartProps.chartType ? this.ontuneChartProps.chartType = ontuneChartProps.chartType :  ontuneChartProps.chartType = defaultValue.CHART_TYPE as keyof ChartTypeRegistry;
        ontuneChartProps.showLegend ? this.ontuneChartProps.showLegend = ontuneChartProps.showLegend :  ontuneChartProps.showLegend = defaultValue.SHOW_LEGEND;
        ontuneChartProps.legendPosition ? this.ontuneChartProps.legendPosition = ontuneChartProps.legendPosition :  ontuneChartProps.legendPosition = defaultValue.LEGEND_POSITION as LayoutPosition;
        ontuneChartProps.showCanvasLegend ? this.ontuneChartProps.showCanvasLegend = ontuneChartProps.showCanvasLegend :  ontuneChartProps.showCanvasLegend = defaultValue.SHOW_CANVAS_LEGEND;
        ontuneChartProps.canvasLegendPosition ? this.ontuneChartProps.canvasLegendPosition = ontuneChartProps.canvasLegendPosition :  ontuneChartProps.canvasLegendPosition = defaultValue.CANVAS_LEGEND_POSITION as LayoutPosition;
        ontuneChartProps.leftYAxesMin ? this.ontuneChartProps.leftYAxesMin = ontuneChartProps.leftYAxesMin :  ontuneChartProps.leftYAxesMin = defaultValue.LEFT_Y_AXES_MIN;
        ontuneChartProps.leftYAxesMax ? this.ontuneChartProps.leftYAxesMax = ontuneChartProps.leftYAxesMax :  ontuneChartProps.leftYAxesMax = defaultValue.LEFT_Y_AXES_MAX;
        ontuneChartProps.rightYAxesMin ? this.ontuneChartProps.rightYAxesMin = ontuneChartProps.rightYAxesMin :  ontuneChartProps.rightYAxesMin = defaultValue.RIGHT_Y_AXES_MIN;
        ontuneChartProps.rightYAxesMax ? this.ontuneChartProps.rightYAxesMax = ontuneChartProps.rightYAxesMax :  ontuneChartProps.rightYAxesMax = defaultValue.RIGHT_Y_AXES_MAX;
        ontuneChartProps.yAxesPosition ? this.ontuneChartProps.yAxesPosition = ontuneChartProps.yAxesPosition :  ontuneChartProps.yAxesPosition = defaultValue.Y_AXES_POSITION as TYAxesPosition;
        ontuneChartProps.showLegendValue ? this.ontuneChartProps.showLegendValue = ontuneChartProps.showLegendValue :  ontuneChartProps.showLegendValue = defaultValue.SHOW_LEGEND_VALUE;
        ontuneChartProps.globalLineWidth ? this.ontuneChartProps.globalLineWidth = ontuneChartProps.globalLineWidth :  ontuneChartProps.globalLineWidth = defaultValue.GLOBAL_LINE_WIDTH;
        ontuneChartProps.showCrossHair ? this.ontuneChartProps.showCrossHair = ontuneChartProps.showCrossHair :  ontuneChartProps.showCrossHair = defaultValue.SHOW_CROSS_HAIR;
        ontuneChartProps.useIndicator ? this.ontuneChartProps.useIndicator = ontuneChartProps.useIndicator :  ontuneChartProps.useIndicator = defaultValue.USE_INDICATOR;
        ontuneChartProps.useAnimation ? this.ontuneChartProps.useAnimation = ontuneChartProps.useAnimation :  ontuneChartProps.useAnimation = defaultValue.USE_ANIMATION;
        ontuneChartProps.aodMaxTooltipPosition ? this.ontuneChartProps.aodMaxTooltipPosition = ontuneChartProps.aodMaxTooltipPosition :  ontuneChartProps.aodMaxTooltipPosition = defaultValue.AOD_MAX_TOOLTIP_POSITION as TAODMaxTooltipPostion;
        ontuneChartProps.showAodMaxTooltip ? this.ontuneChartProps.showAodMaxTooltip = ontuneChartProps.showAodMaxTooltip :  ontuneChartProps.showAodMaxTooltip = defaultValue.SHOW_AOD_MAX_TOOLTIP;
        ontuneChartProps.showLevel1Event ? this.ontuneChartProps.showLevel1Event = ontuneChartProps.showLevel1Event :  ontuneChartProps.showLevel1Event = defaultValue.SHOW_LEVEL_1_EVENT;
        ontuneChartProps.showLevel2Event ? this.ontuneChartProps.showLevel2Event = ontuneChartProps.showLevel2Event :  ontuneChartProps.showLevel2Event = defaultValue.SHOW_LEVEL_2_EVENT;
        ontuneChartProps.showLevel3Event ? this.ontuneChartProps.showLevel3Event = ontuneChartProps.showLevel3Event :  ontuneChartProps.showLevel3Event = defaultValue.SHOW_LEVEL_3_EVENT;
        ontuneChartProps.showLevel4Event ? this.ontuneChartProps.showLevel4Event = ontuneChartProps.showLevel4Event :  ontuneChartProps.showLevel4Event = defaultValue.SHOW_LEVEL_4_EVENT;
        ontuneChartProps.showLevel5Event ? this.ontuneChartProps.showLevel5Event = ontuneChartProps.showLevel5Event :  ontuneChartProps.showLevel5Event = defaultValue.SHOW_LEVEL_5_EVENT;
        ontuneChartProps.level1EventValue ? this.ontuneChartProps.level1EventValue = ontuneChartProps.level1EventValue :  ontuneChartProps.level1EventValue = defaultValue.LEVEL_1_EVENT_VALUE;
        ontuneChartProps.level2EventValue ? this.ontuneChartProps.level2EventValue = ontuneChartProps.level2EventValue :  ontuneChartProps.level2EventValue = defaultValue.LEVEL_2_EVENT_VALUE;
        ontuneChartProps.level3EventValue ? this.ontuneChartProps.level3EventValue = ontuneChartProps.level3EventValue :  ontuneChartProps.level3EventValue = defaultValue.LEVEL_3_EVENT_VALUE;
        ontuneChartProps.level4EventValue ? this.ontuneChartProps.level4EventValue = ontuneChartProps.level4EventValue :  ontuneChartProps.level4EventValue = defaultValue.LEVEL_4_EVENT_VALUE;
        ontuneChartProps.level5EventValue ? this.ontuneChartProps.level5EventValue = ontuneChartProps.level5EventValue :  ontuneChartProps.level5EventValue = defaultValue.LEVEL_5_EVENT_VALUE;
        ontuneChartProps.level1EventLineWidth ? this.ontuneChartProps.level1EventLineWidth = ontuneChartProps.level1EventLineWidth :  ontuneChartProps.level1EventLineWidth = defaultValue.LEVEL_1_EVENT_LINE_WIDTH;
        ontuneChartProps.level2EventLineWidth ? this.ontuneChartProps.level2EventLineWidth = ontuneChartProps.level2EventLineWidth :  ontuneChartProps.level2EventLineWidth = defaultValue.LEVEL_2_EVENT_LINE_WIDTH;
        ontuneChartProps.level3EventLineWidth ? this.ontuneChartProps.level3EventLineWidth = ontuneChartProps.level3EventLineWidth :  ontuneChartProps.level3EventLineWidth = defaultValue.LEVEL_3_EVENT_LINE_WIDTH;
        ontuneChartProps.level4EventLineWidth ? this.ontuneChartProps.level4EventLineWidth = ontuneChartProps.level4EventLineWidth :  ontuneChartProps.level4EventLineWidth = defaultValue.LEVEL_4_EVENT_LINE_WIDTH;
        ontuneChartProps.level5EventLineWidth ? this.ontuneChartProps.level5EventLineWidth = ontuneChartProps.level5EventLineWidth :  ontuneChartProps.level5EventLineWidth = defaultValue.LEVEL_5_EVENT_LINE_WIDTH;
        ontuneChartProps.level1EventPosition ? this.ontuneChartProps.level1EventPosition = ontuneChartProps.level1EventPosition :  ontuneChartProps.level1EventPosition = defaultValue.LEVEL_1_EVENT_POSITION as TEventIndicatorPosition;
        ontuneChartProps.level2EventPosition ? this.ontuneChartProps.level2EventPosition = ontuneChartProps.level2EventPosition :  ontuneChartProps.level2EventPosition = defaultValue.LEVEL_2_EVENT_POSITION as TEventIndicatorPosition;
        ontuneChartProps.level3EventPosition ? this.ontuneChartProps.level3EventPosition = ontuneChartProps.level3EventPosition :  ontuneChartProps.level3EventPosition = defaultValue.LEVEL_3_EVENT_POSITION as TEventIndicatorPosition;
        ontuneChartProps.level4EventPosition ? this.ontuneChartProps.level4EventPosition = ontuneChartProps.level4EventPosition :  ontuneChartProps.level4EventPosition = defaultValue.LEVEL_4_EVENT_POSITION as TEventIndicatorPosition;
        ontuneChartProps.level5EventPosition ? this.ontuneChartProps.level5EventPosition = ontuneChartProps.level5EventPosition :  ontuneChartProps.level5EventPosition = defaultValue.LEVEL_5_EVENT_POSITION as TEventIndicatorPosition;
        ontuneChartProps.yAxesUnit ? this.ontuneChartProps.yAxesUnit = ontuneChartProps.yAxesUnit :  ontuneChartProps.yAxesUnit = defaultValue.Y_AXES_UNIT;
        ontuneChartProps.showYAxesUnit ? this.ontuneChartProps.showYAxesUnit = ontuneChartProps.showYAxesUnit :  ontuneChartProps.showYAxesUnit = defaultValue.SHOW_Y_AXES_UNIT;
        ontuneChartProps.lineTension ? this.ontuneChartProps.lineTension = ontuneChartProps.lineTension :  ontuneChartProps.lineTension = defaultValue.LINE_TENSION;
        ontuneChartProps.showDataValueTooltip ? this.ontuneChartProps.showDataValueTooltip = ontuneChartProps.showDataValueTooltip :  ontuneChartProps.showDataValueTooltip = defaultValue.SHOW_DATA_VALUE_TOOLTIP;
        ontuneChartProps.labels ? this.ontuneChartProps.labels = ontuneChartProps.labels :  ontuneChartProps.labels = [];
        ontuneChartProps.datasets ? this.ontuneChartProps.datasets = ontuneChartProps.datasets :  ontuneChartProps.datasets = [];
    };
};

export type TYAxesPosition = 'left' | 'right' | 'both';

export type TLengendOptions = {
    position: LayoutPosition,
    showLegend: boolean,
    showLegendValue: boolean
};

export type TChartAreaInfo = {
    startX: number,
    startY: number,
    endX: number,
    endY: number
};

export type TAODMaxTooltipPostion = 'first' | 'middle' | 'last';

export type TEventIndicatorPosition = 'left' | 'right';
export interface IEventIndicator {
    id: string;
    isShow: boolean;
    value: number;
    color: string;
    level: number;
    lineWidth: number;
    position: TEventIndicatorPosition
};