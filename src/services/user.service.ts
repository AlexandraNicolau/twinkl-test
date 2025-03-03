import { BaseUser, User, UserWithoutPassword } from '../types/user';
import { v4 as uuidv4 } from 'uuid';

let users: Record<string, User> = {};

// we will do try catch when we call this function
export const findUserById = async (
  id: string,
): Promise<UserWithoutPassword> => {
  const user = users[id];

  if (user === undefined) {
    throw new Error('User not found');
  }

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
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
