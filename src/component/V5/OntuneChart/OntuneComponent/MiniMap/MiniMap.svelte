<script lang="ts">
    export let minimapCanvas;

</script>

<div class="chart_minimap_container">
    <canvas bind:this={minimapCanvas} class="minimap_canvas" id="minimapChart"  style="width: 100%;"></canvas>
    <div id="leftMinimapController" class="minimap_controller left"></div>
    <div id="centerMinimapController" class="minimap_controller center"></div>
    <div id="rightMinimapController" class="minimap_controller right"></div>
</div>

<style>
    .chart_minimap_container {
        position: relative;
        height: 40px;
        border: 1px solid #ddd;
        border-radius: 6px;
        margin-top: -40px;
    }
    .minimap_canvas {
        height: 40px;
        border-radius: 5px;
    }
    .minimap_controller {
        position: absolute;
        width: 20px;
        height: 100%;
        top: 0;
    }
</style>

