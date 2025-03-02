import { UserType } from '../user/user';
import { addUser } from '../services/user.service';
import { getUserById } from './user.controller';
import httpMocks from 'node-mocks-http';

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
    const mockUser = {
      firstName: 'John',
      lastName: 'Williams',
      passowrd: 'randomPass123',
      emailAddress: 'hello@testy.mcTest',
      createdAt: '2025-03-01T20:46:43.085Z',
      userType: UserType.student,
    };

    const newUser = await addUser(mockUser);

    const { id } = newUser;

    const request = httpMocks.createRequest({
      method: 'POST',
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
