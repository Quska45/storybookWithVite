<script lang="ts">
    export let data: string;
    export let color: string;
    export let id: string;
</script>

<div class="relative flex h-full items-center justify-center">
    <label for="{`colorInput${id}`}" class="flex  h-full min-w-[10px] ">
        <div
            class="color-chip mr-[4px] h-[calc(100%-4px)] min-w-[16px]"
            style="{`background:${color || '#e5e5e5'}`}"></div>
        <input
            type="color"
            id="{`colorInput${id}`}"
            name="colorInput"
            class="hidden bg-transparent opacity-0"
        />
    </label>
    {data}
</div>
