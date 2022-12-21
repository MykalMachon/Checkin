import { fail } from '@sveltejs/kit';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '$env/static/private';

export const actions: import('./$types').Actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    // this is bad. don't do this.
    const adminUsername = ADMIN_USERNAME
    const adminPassword = ADMIN_PASSWORD;

    if (adminUsername != username && adminPassword != password) {
      return fail(400, { username: username, status: 'incorrect login' })
    }

    return {
      status: `correct! you're logged in.`
    }
  }
}