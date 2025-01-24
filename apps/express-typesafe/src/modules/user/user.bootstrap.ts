import { Database } from '@express-typesafe/core';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { v4 as uuidv4 } from 'uuid';

const db = new Database('user', {
  defaultData: [
    {
      id: uuidv4(),
      username: 'username',
      password: 'password',
      email: 'username@email.com',
    },
  ],
});

const userRepository = new UserRepository(db);
export const userController = new UserController(userRepository);
