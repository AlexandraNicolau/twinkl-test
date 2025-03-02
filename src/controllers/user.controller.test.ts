import { UserType } from '../user/user';
import * as userService from '../services/user.service';
import { createUser, getUserById } from './user.controller';
import httpMocks from 'node-mocks-http';
import { mock } from 'node:test';

const mockUser = {
  firstName: 'John',
  lastName: 'Williams',
  password: 'randomPass123',
  emailAddress: 'hello@testy.mcTest',
  createdAt: '2025-03-01T20:46:43.085Z',
  userType: UserType.student,
};

describe('getUserById', () => {
  it('should return a 404 status code with an error message if the user does not exist', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/user/missing-userid-1234',
      params: {
        id: 'missing-userid-1234',
      },
    });

    const response = httpMocks.createResponse();

    await getUserById(request, response);

    const data = JSON.parse(response._getData());

    expect(data).toStrictEqual({ error: 'User not found' });
    expect(response.statusCode).toBe(404);
  });

  it('should return a 200 status code with the user', async () => {
    const newUser = await userService.addUser(mockUser);

    const { id } = newUser;

    const request = httpMocks.createRequest({
      method: 'GET',
      url: `/user/${id}`,
      params: {
        id,
      },
    });

    const response = httpMocks.createResponse();

    await getUserById(request, response);

    const data = JSON.parse(response._getData());

    expect(data).toStrictEqual(newUser);
    expect(response.statusCode).toBe(200);
  });
});

describe('createUser', () => {
  it('should return a 500 status code with an error message if adding the user fails', async () => {
    jest
      .spyOn(userService, 'addUser')
      .mockRejectedValueOnce(new Error('Something went wrong'));
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/user/signup',
      body: mockUser,
    });

    const response = httpMocks.createResponse();

    await createUser(request, response);

    const data = JSON.parse(response._getData());

    expect(data).toStrictEqual({ error: 'Something went wrong' });
    expect(response.statusCode).toBe(500);
  });

  it('should return a 201 status code and return the new user', async () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/user/signup',
      body: mockUser,
    });

    const response = httpMocks.createResponse();

    await createUser(request, response);

    const data = JSON.parse(response._getData());

    expect(data).toStrictEqual({
      ...mockUser,
      id: expect.any(String),
    });
    expect(response.statusCode).toBe(201);
  });

  it.each([
    ['firstName', '', 'First name is required'],
    ['lastName', '', 'Last name is required'],
    ['emailAddress', '', 'An email address is required'],
    ['createdAt', '', 'A create date is required'],
    [
      'userType',
      '',
      'userType must be one of the following values: student, privateTutor, parent, teacher',
    ],
    ['password', '', 'Password is required'],
    ['password', 'xY1', 'Password is too short - should be 8 chars minimum'],
    [
      'password',
      new Array(33).join('aB1'),
      'Password is too long - should be maximum 64 chars',
    ],
    ['password', 'aBaBaBaB', 'Password must contain at least 1 number'],
    [
      'password',
      'A1A1A1A1',
      'Password must contain at least 1 lower case letter',
    ],
    [
      'password',
      'a1a1a1a1',
      'Password must contain at least 1 upper case letter',
    ],
  ])(
    'should fail validation when "%s" has a value "%s" with an error of "%s"',
    async (field, value, expectedError) => {
      const invalidMockUser = {
        ...mockUser,
        [field]: value,
      };
      const request = httpMocks.createRequest({
        method: 'POST',
        url: '/user/signup',
        body: invalidMockUser,
      });

      const response = httpMocks.createResponse();

      await createUser(request, response);

      const data = JSON.parse(response._getData());

      expect(response.statusCode).toBe(400);
      expect(data.error).toContain(expectedError);
    },
  );
});
