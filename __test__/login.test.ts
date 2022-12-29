import { KrossClient } from '../src/kross-client';

const client = new KrossClient({
    baseURL: 'https://olive-dev.kross.kr',
    accessId: '',
    secretKey: '',
  });

const credentials = {
  0: {keyid:  'mad@kross.kr', password: 'Kross123!' }
}

it('Successful Login:  ', async () => {
  return await client.login(credentials[0].keyid, credentials[0].password)
  .then(response => {
    expect(response.status).toBe(201)
    expect(response.data).toEqual(expect.objectContaining({
      token: expect.any(String),
      refresh: expect.any(String)
    }));
  })
 })
