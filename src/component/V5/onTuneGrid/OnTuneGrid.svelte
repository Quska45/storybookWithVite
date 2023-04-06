<script lang="ts">
    import { TabulatorFull as Tabulator, type Options } from 'tabulator-tables';
    import { onMount } from 'svelte';

    // export let data: unknown[] = [];
    // export let columns: unknown[] = [];

    export let options: Options;
    export let w: number;
    let tableComponent: HTMLElement;

    onMount(() => {
        new Tabulator(tableComponent, options);
    });
</script>

<div style="{`width:${w}px`}" bind:this="{tableComponent}"></div>

<svelte:head>
    <link
        href="https://unpkg.com/tabulator-tables@5.4.4/dist/css/tabulator.min.css"
        rel="stylesheet"
    />
</svelte:head>
