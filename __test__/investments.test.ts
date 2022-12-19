import { Users } from '../src/api/users'
import { randomBytes } from 'crypto'


describe('getInvestment', () => {
  let member_no: number;
  let client: Users;

  const OLIVE_BASE_URL = 'http://olive-dev.kross.kr';
  const accessId = randomBytes(8).toString('hex')
  const secretKey = randomBytes(256).toString('base64')

  beforeAll(() => {
    client = new Users({ baseURL: OLIVE_BASE_URL, accessId, secretKey })
    member_no = 4544;
  });

  it('returns 200 with valid Authorization header', async () => {
    return client.checkVirtualAccount(member_no)
      .then((response) => {
      expect(response.status).toBe(200)
      });
  });
})
