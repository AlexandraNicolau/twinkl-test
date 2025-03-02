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
});
