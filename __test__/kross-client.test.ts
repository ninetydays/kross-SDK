import { Polly } from '@pollyjs/core'
import NodeHttpAdapter from '@pollyjs/adapter-node-http'
import FSPersister from '@pollyjs/persister-fs'
import { randomBytes } from 'crypto'
import { KrossClient, hmacHashString } from '../src/kross-client'
// Register the node http adapter so its accessible by all future polly instances
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

const { server } = polly

afterAll(() => polly.stop())

describe('KrossClient', () => {
  let client: KrossClient
  const baseURL = 'https://jsonplaceholder.typicode.com'
  const accessId = randomBytes(8).toString('hex')
  const secretKey = randomBytes(256).toString('base64')

  it('can create an instance', () => {
    client = new KrossClient({ baseURL, accessId, secretKey })
    expect(client).toBeDefined()
  })

  it('has get method', async () => {
    const res = await client.get('/posts')
    expect(res.status).toBe(200)
  })

  it('has post method', async () => {
    const res = await client.post('/posts')
    expect(res.status).toBe(201)
  })

  it('has put method', async () => {
    const res = await client.put('/posts/1')
    expect(res.status).toBe(200)
  })

  it('has put method', async () => {
    const res = await client.patch('/posts/1')
    expect(res.status).toBe(200)
  })

  it('has request method', async () => {
    const res = await client.request({ url: '/posts/1', method: 'get' })
    expect(res.status).toBe(200)
  })

  it('contains valid Authorization header', async () => {
    server.get(`${baseURL}/posts/99`).intercept((req, res) => {
      expect(req.headers.Authorization).toBeDefined()
      expect(req.headers['X-Date']).toBeDefined()
      const hashString = hmacHashString(
        secretKey,
        [req.headers['X-Date'], 'get'].join(' ')
      )
      expect(
        (req.headers.Authorization as string).replace(`KROSS ${accessId}:`, '')
      ).toBe(hashString)
      res.status(200)
    })
    await client.get('/posts/99')
  })
})
