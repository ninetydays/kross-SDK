import { Polly } from '@pollyjs/core'
import NodeHttpAdapter from '@pollyjs/adapter-node-http'
import FSPersister from '@pollyjs/persister-fs'
import { Users } from '../src/api/users'
import { randomBytes } from 'crypto'


Polly.register(NodeHttpAdapter)
Polly.register(FSPersister)

const polly = new Polly(__filename, {
  adapters: ['node-http'],
  persister: 'fs',
})

polly.configure({
  persisterOptions: { fs: { recordingsDir: '__test__/recordings' } },
  matchRequestsBy: {
    headers: false,
  },
})

describe('getInvestment', () => {
  let member_no: number;
  let client: Users;
  const OLIVE_BASE_URL = 'http://olive-dev.kross.kr';
  const accessId = randomBytes(8).toString('hex')
  const secretKey = randomBytes(256).toString('base64')


  beforeAll(() => {
    member_no = 4544;
  });

  it('can create an instance', () => {
    client = new Users({ baseURL: OLIVE_BASE_URL, accessId, secretKey })
    expect(client).toBeDefined()
  })

  it('returns 200 with valid Authorization header', async () => {
    return client.checkVirtualAccount(member_no)
      .then((response) => {
      expect(response.status).toBe(200)
      });
  });
})
