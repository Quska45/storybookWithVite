<script lang="ts">
    import { Engine } from './CanvasEngine/API/Engine';
    import { onMount } from 'svelte';
    import { Vector } from './CanvasEngine/Core/Math/Vector';
    import { Quadrant } from './CanvasEngine/Core/Object2D/Scene';

    onMount(async () => {
        let engine = new Engine( '#canvasTarget' );

        engine.setQuadrant( Quadrant.quadrant1 );
        engine.renderer.ctx.save()
        engine.addLine( 'testLine', new Vector(0,0), new Vector(50,50) );
        engine.addText('1', 'abcdef', new Vector(50,50));
        // engine.renderer.ctx.restore()

        engine.run();
    });

</script>
<div id='canvasTarget' style="width: 300px; height: 300px; border: 1px solid red;">

</div>
