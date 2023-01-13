import type { TData } from "./Data";
import type { TOption } from "./Option";

export type TChartType = 'line';

export type TConfig = {
    type: TChartType,
    data: TData,
    options: TOption
};