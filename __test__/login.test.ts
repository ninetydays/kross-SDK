import { KrossClient } from '../src/kross-client'
import axios from 'axios'
const client = new KrossClient({
  baseURL: 'https://olive-dev.kross.kr',
  accessId: '',
  secretKey: '',
})

const credentials = {
  0: { keyid: 'username@kross.kr', password: 'password8chars' },
}
jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      post: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
      }
    }))
  }
})

const log = 
{
    okay: true,
    status: 201,
    data: [
      {
        token: 'ifsdfkenJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJfbm8iOjEwNzgzLCJuYW1lIjoiTVVSWkFNSURJTk9WIEFaSVlBVCIsImlzX2NvcnAiOmZhbHNlLCJrZXlpZCI6Im1hZEBrcm9zcy5rciIsImNvcnBfbnVtYmVyIjoibWFkQGtyb3NzLmtyIiwibWVtYmVyX3R5cGUiOiJpbnZlc3RvciIsInVzZXJfaWQiOjE0MjE4LCJlbWFpbCI6Im1hZEBrcm9zcy5rciIsInN0YXRlIjoibGl2ZSIsImZpbmFuY2lhbF9wcm92aWRlciI6ZmFsc2UsImlhdCI6MTY3MjcxODE3MCwiZXhwIjoxNjcyNzE5MDcwfQ.kyNzgmZ2OTMSZ49sWWAxUa467pH2cKTk7_rhL0cGLak',
        refresh: 'fsdfJGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0MjE4LCJpYXQiOjE2NzI3MTgxNzAsImV4cCI6MTY3NTMxMDE3MH0.OhsS0bZp__6R1FKmusX1pr3UqkiWBrm3JkMllO_3yEM'
      }
    ]
  };

it('Login:  ', async () => {
  const resp = { data: log };
  jest.spyOn(client, 'login').mockResolvedValueOnce(resp);
  return await client
    .login(credentials[0].keyid, credentials[0].password)
    .then((response) => {
      expect(response?.data?.status).toBe(201)
      expect(response).toEqual(resp);
      console.log(response.data)
    })
})
