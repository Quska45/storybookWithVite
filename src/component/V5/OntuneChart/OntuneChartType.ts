import type { LayoutPosition } from "chart.js";

export type TYAxesPosition = 'left' | 'right' | 'both';

export type TLengendOptions = {
    position: LayoutPosition,
    showLegend: boolean,
    showLegendValue: boolean
};

export type TCrossHairInfo = {
    startX: number,
    startY: number,
    endX: number,
    endY: number
}