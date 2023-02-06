<script lang="ts">
    import "flowbite/dist/flowbite.css";
    // import { Button } from 'flowbite-svelte'
    import Button from './Button.svelte'
    import { createEventDispatcher } from "svelte";
    import type { TFlowBiteSvelteButton, TFlowBiteSvelteButtonObjectSize } from './TS/FlowBiteSvelteButton'

    export let color;
    export let size: TFlowBiteSvelteButtonObjectSize;
    export let width;
    export let height;
    export let styleStr;
    export let svgClass;
    export let svg_d;
    export let isSelected;

    let buttonProps: TFlowBiteSvelteButton = {
        color: color,
        size: size,
        width: width,
        height: height,
        styleStr: styleStr,
        svgClass: svgClass,
        svg_d: svg_d,
        isSelected: isSelected
    };

    const dispatch = createEventDispatcher();

    function onButtonClick( event ) {
        isSelected = !isSelected;
        dispatch( 'onButtonClick', event );
    }
</script>

<Button 
    color="{color}"
    size="{size}"
    class="{width} {height}"
    style="{styleStr}"
    isSelected="{isSelected}"
    on:click={onButtonClick}
>
    {#if buttonProps.svg_d}
        <svg fill="none" class="{buttonProps.svgClass}" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="{buttonProps.svg_d}"></path>
        </svg>
    {/if}
    <slot></slot>
</Button>