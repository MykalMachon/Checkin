import { fail } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';

const prisma = new PrismaClient();

export const actions: import('./$types').Actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    if (!username || !password) {
      return fail(422, { status: 'missing username or password' })
    }

    const user = await prisma.user.findFirst({
      where: {
        email: username
      }
    })

    if (!user) {
      return fail(200, { status: 'no user exists with that username/email' })
    }



    const validPass = await compare(password, user.password);
    console.log(`password is valid ${validPass}`)
    console.log(await hash(password, 10), user.password)

    if (!validPass) {
      return fail(422, { status: 'your username or password is wrong. check again.' })
    }

    // TODO: create a session and send a cookie
    return { status: `hey ${user.email} your id is ${user.id} and you should be signed in` }
  }
}