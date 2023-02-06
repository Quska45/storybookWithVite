import type { ButtonProps } from "flowbite-svelte/buttons/Button.svelte"

export type TFlowBiteSvelteButtonObjectSize = ButtonProps[ "size" ];
export type TFlowBiteSvelteButton = {
    color: string;
    size: TFlowBiteSvelteButtonObjectSize;
    width: string;
    height: string;
    styleStr: string;
    svgClass: string;
    svg_d: string;
    isSelected: boolean;
};

export class FlowBiteSvelteButtonObject {
    color: string;
    size: TFlowBiteSvelteButtonObjectSize;
    width: string;
    height: string;
    styleStr: string;
    svgClass: string;
    svg_d: string;
};