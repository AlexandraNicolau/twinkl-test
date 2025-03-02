import { BaseUser, User, UserType } from '../user/user';
import { v4 as uuidv4 } from 'uuid';

let users: Record<string, User> = {
  '1': {
    firstName: 'John',
    lastName: 'Williams',
    password: 'randomPass123',
    emailAddress: 'hello@testy.mcTest',
    createdAt: '2025-03-01T20:46:43.085Z',
    userType: UserType.student,
    id: '1',
  },
};

// we will do try catch when we call this function
export const findUserById = async (id: string) => {
  const user = users[id];

  if (user === undefined) {
    throw new Error('User not found');
  }
  return user;
};

export const addUser = async (user: BaseUser) => {
  const id = uuidv4();

  const newUser: User = {
    id,
    ...user,
  };

  users[id] = newUser;
  return newUser;
};
