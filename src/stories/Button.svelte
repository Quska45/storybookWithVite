<script lang="ts">
  import './button.css';
  import { createEventDispatcher } from 'svelte';
  /**
   * Is this the principal call to action on the page?
   */
  export let primary = false;

  /**
   * What background color to use
   */
  export let backgroundColor;
  /**
   * How large should the button be?
   */
  export let size = 'medium';
  /**
   * Button contents
   */
  export let label = '';

  let mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  let style = backgroundColor ? `background-color: ${backgroundColor}` : '';

  const dispatch = createEventDispatcher();

  /**
   * Optional click handler
   */
  function onClick(event) {
    dispatch('click', event);
  }

  let count: number = 0;
  const increment = () => {
    count += 1
  };
</script>

<button
  type="button"
  class={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
  {style}
  on:click={onClick}>
  {label}
  Hello world!
</button>
<button
  on:click={increment}
>
  Clicks: {count}
</button>
