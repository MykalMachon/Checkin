<script lang="ts">
  import type { PageLoad } from './$types';

  export let data: PageLoad;
</script>

<header>
  <p>Check In</p>
  {#if data}
    {JSON.stringify(data)}
  {/if}
</header>

<slot />

<footer>
  made by <a href="https://mykal.codes">mykal.codes</a>
</footer>