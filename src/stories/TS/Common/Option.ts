export type TPosition = 'top' | 'right' | 'bottom' | 'left';

export type TLegend = {
    position: TPosition
}

export type TTitle = {
    display: boolean,
    text: string
}

export type TPlugin = {
    legend: TLegend,
    title: TTitle
}

export type TOption = {
    plugins: TPlugin
}