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

export interface IEventDispacher {
    id: string,
    dispatchEvent: Function
};

export interface IEventDispacherIndexMap {
    id: string,
    index: number
};