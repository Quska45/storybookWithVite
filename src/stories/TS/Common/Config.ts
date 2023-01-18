import type { TData } from "./Data";
import type { TOption } from "./Option";

export type TChartType = 'line';

export type TConfig = {
    type: TChartType, // 차트의 타입.
    data: TData,
    options: TOption
};