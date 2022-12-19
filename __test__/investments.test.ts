import { Users } from '../src/api/users'
import { randomBytes } from 'crypto'


describe('getInvestment', () => {
  let member_no: number;
  let client: Users;

  const OLIVE_BASE_URL = 'http://olive-dev.kross.kr';
  const token = randomBytes(8).toString('hex')
  const refresh_token = randomBytes(256).toString('base64')
// Current implementation is invalid for the reason we should get token/refresh-token from
//user auth. To be continued
  beforeAll(() => {
    client = new Users({ baseURL: OLIVE_BASE_URL, accessId: token, secretKey: refresh_token })
    member_no = 4544;
  });

  it('returns 200 with valid Authorization header', async () => {
    return client.checkVirtualAccount(member_no)
      .then((response) => {
      expect(response.status).toBe(200)
      });
  });
})
