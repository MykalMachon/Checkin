<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import { enhance } from '$app/forms';
  
  export let form: ActionData;
  export let data: PageData;
</script>

<h1>Signup</h1>

<form method="POST" use:enhance>
  {#if form?.status}
    <p class="warning">{form.status}</p>
  {/if}
  <label for="username">
    email
    <input type="email" name="username" id="username" required />
  </label>
  <label for="password">
    password
    <input type="password" name="password" id="password" required />
  </label>
  <label for="confirmPassword">
    repeat password
    <input type="password" name="confirmPassword" id="confirmPassword" required />
  </label>
  <button>Signup</button>
</form>