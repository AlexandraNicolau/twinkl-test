import { UserType } from '../user/user';
import * as userService from '../services/user.service';
import { createUser, getUserById } from './user.controller';
import httpMocks from 'node-mocks-http';

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
});
