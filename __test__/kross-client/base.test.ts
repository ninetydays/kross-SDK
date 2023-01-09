import { KrossClient } from '../../src/kross-client';
import axios from 'axios';
jest.mock('axios');

describe('KrossClientBase', () => {
  describe('Token authorization', () => {
    let client: KrossClient;
    const baseURL = 'http://localhost';
    const accessId = 'randomestring';
    const secretKey = 'randomestring';
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    beforeAll(() => {
      mockedAxios.create.mockReturnThis();
      client = new KrossClient({ baseURL, accessId, secretKey });
    });

    it('logins', async () => {
      const loginResponse = {
        data: { token: 'token', refresh: 'refresh' },
      };
      mockedAxios.post.mockResolvedValueOnce(loginResponse);
      const res = await client.login({
        keyid: 'yuzong@naver.com',
        password: 'test123',
      });

      expect(res.data.token).toBeDefined();
      expect(res.data.refresh).toBeDefined();
    });
  });
});
