<script lang="ts">
    import "flowbite/dist/flowbite.css";
    import { Card } from 'flowbite-svelte'

    export let size;
    export let padding;
    export let styleStr;
</script>

<Card 
    size="{size}"
    padding="{padding}"
    style="{styleStr}"
>
    <slot>
        <em>카드 컴포넌트</em>
    </slot>
</Card>