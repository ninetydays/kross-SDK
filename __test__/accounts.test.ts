import { Accounts } from '../src/api/accounts'
import { getToken } from './getToken';
import { AccountCheckDto, WithdrawCancelDto, WithdrawRequestDto } from '../src/types';
const client = new Accounts({
    baseURL: 'https://olive-dev.kross.kr',
    accessId: '',
    secretKey: '',
  });

beforeEach(async()=> {
  let token = await getToken()
  client.authToken = token.token
})

const checkParams : AccountCheckDto = {
  bankId: '',
  accountNumber: '',
  name: '',
}

const withdrawParams : WithdrawRequestDto= {
  member_no: 12,
  amount: 2323,
}

const verifyParams = {
  idempotency_key: '',
  verify_code: 1232,
}
const cancelParams : WithdrawCancelDto = {
  idempotency_key: '',
}

it('AccountCheck:  ', async () => {
  return await client.accountCheck(checkParams)
  .then(response => {
    expect(response.status).toBe(200);
  })
 })

it('WithdrawRequest:  ', async () => {
  return await client.withdrawRequest(withdrawParams)
  .then(response => {
    expect(response.status).toBe(200);
  })
 })

 it('WithdrawVerify:  ', async () => {
  return await client.withdrawVerify(verifyParams)
  .then(response => {
    expect(response.status).toBe(200);
  })
 })

 it('WithdrawCancel:  ', async () => {
  return await client.withdrawCancel(cancelParams)
  .then(response => {
    expect(response.status).toBe(200);
  })
 })