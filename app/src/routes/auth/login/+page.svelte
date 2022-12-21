
<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import { enhance } from '$app/forms';

  // export let data: PageData;
  export let form: ActionData;
</script>

<h1>Login</h1>
<form method="POST" use:enhance>
  {#if form?.status}
    <p class="warning">{form.status}</p>
  {/if}
  <label for="username">
    email
    <input type="email" name="username" id="username" value={form?.username || ''} required />
  </label>
  <label for="password">
    password
    <input type="password" name="password" id="password" required />
  </label>
  <button>Login</button>
</form>