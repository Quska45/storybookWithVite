import type { LayoutPosition } from "chart.js";

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

export type TChartCategory = {
    id: string,
    name: string
};

export type TTest1 = '';

export interface TEventIndicator {
    id: string;
    isShow: boolean;
    value: number;
    color: string;
    level: number;
    lineWidth: number;
};