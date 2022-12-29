import { Users } from '../src/api/users'
import {getToken} from './getToken'
const client = new Users({
  baseURL: 'https://olive-dev.kross.kr/',
  accessId: '',
  secretKey: '',
});

beforeEach(async() => {
  const credentials = await getToken()
  client.authToken = credentials.token
})


it('cmsTradeBook:  ', async () => {
  return client.cmsTradebook({})
  .then(response => {
    expect(response?.status).toBe(200)
  })
})

it('CheckVirtualAccount:  ', async () => {
  return client.checkVirtualAccount()
  .then(response => {
    expect(response?.status).toBe(200)
  })
})

it('releaseDepositControl:  ', async () => {
  return client.releaseDepositControl()
  .then(response => {
    expect(response?.status).toBe(200)
  })
})

it('unRegisterMember:  ', async () => {
  return client.unRegisterMember()
  .then(response => {
    expect(response?.status).toBe(200)
  })
})


it('getVirtualAccountCertificate:  ', async () => {
  return client.getVirtualAccCertificate()
  .then(response => {
    expect(response?.status).toBe(200)
  })
})


it('kftcBalance:  ', async () => {
  return client.kftcBalance()
  .then(response => {
    expect(response?.status).toBe(200)
  })
})


it('userAccountLogs:  ', async () => {
  return client.userAccountLogs({})
  .then(response => {
    expect(response?.status).toBe(200)
  })
})