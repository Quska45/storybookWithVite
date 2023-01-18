<script lang="ts">
    import { onMount } from 'svelte';
    import type { TConfig } from './TS/Common/Config';
    import { LineChart } from './TS/LineChart/LineChart';

    export let containerId: string;
    export let config: TConfig;
    let lineChart: LineChart;

    onMount(async () => {
        lineChart = new LineChart( '#' + containerId, config );
        lineChart.init();
        lineChart.run();
    });

</script>
<div id='canvasContainer1' style="width: 300px; height: 300px; border: 1px solid red; display: inline-block;">
</div>

<div id='canvasContainer2' style="width: 600px; height: 300px; border: 1px solid red; display: inline-block;">
</div>

<div id='canvasContainer3' style="width: 300px; height: 600px; border: 1px solid red; display: inline-block;">
</div>
