import { fail, redirect } from '@sveltejs/kit';
import { hash, compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const actions: import('./$types').Actions = {
  default: async ({ event, request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    // check if password does not exist
    if (password != confirmPassword) {
      return fail(200, { username: username, status: `Passwords did not match` });
    }

    // check if user exists already
    const userExists = await prisma.user.findFirst({
      where: {
        email: username,
      }
    })

    if (userExists) {
      return fail(200, { username: username, status: `User with ${username} already exists` });
    }

    // hash password
    const passHash = await hash(password, 10);

    // create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        email: username,
        password: passHash,
      }
    })

    throw redirect(307, '/auth/login');
  }
}