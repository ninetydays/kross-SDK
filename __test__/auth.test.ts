import { KrossClient } from '../src/kross-client';
import { getToken } from './getToken';
const client = new KrossClient({
    baseURL: 'https://olive-dev.kross.kr',
    accessId: '',
    secretKey: '',
  });

beforeAll( async ()=>{
  let credentials = await getToken();
  client.refreshToken = credentials.refresh
})

it('Regenerate the token with valid token:  ', async () => {
  return await client.getAuthToken()
  .then(response => {
    expect(response?.status).toBe(200);
    expect(response.data).toEqual(expect.objectContaining({
      token: expect.any(String)}));
  })
}, )