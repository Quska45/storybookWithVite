<script lang="ts">
    import { Engine } from './CanvasEngine/API/Engine';
    import { onMount } from 'svelte';

    onMount(async () => {
        let engine = new Engine( '#canvasTarget' );
    });  
</script>
<div id='canvasTarget' style="width: 300px; height: 300px; border: 1px solid red;">
</div>
