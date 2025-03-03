import { BaseUser, UserType } from '../types/user';
import { addUser, findUserById } from './user.service';

describe('findUserById', () => {
  it('should throw an error if the user does not exist', async () => {
    await expect(findUserById('missingUserid123')).rejects.toThrow(
      new Error('User not found'),
    );
  });

  it('should return a single user by id', async () => {
    const mockUser = {
      firstName: 'John',
      lastName: 'Williams',
      password: 'randomPass123',
      emailAddress: 'hello@testy.mcTest',
      createdAt: '2025-03-01T20:46:43.085Z',
      userType: UserType.student,
    };

    const newUser = await addUser(mockUser);
    const user = await findUserById(newUser.id);
    expect(user).toStrictEqual(newUser);
  });
});

describe('addUser', () => {
  const mockBaseUser: BaseUser = {
    firstName: 'John',
    lastName: 'Williams',
    password: 'randomPass123',
    emailAddress: 'hello@testy.mcTest',
    createdAt: '2025-03-01T20:46:43.085Z',
    userType: UserType.student,
  };

  it('should successfully create a new user with a user id', async () => {
    const newUser = await addUser(mockBaseUser);

    expect(newUser).toStrictEqual({
      ...mockBaseUser,
      id: expect.any(String),
    });
  });
});
