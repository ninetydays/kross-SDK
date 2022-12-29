import { Loans } from '../src/api/loans'
import { getToken } from './getToken'
import { ParamType } from '../src/types';

const client = new Loans({
  baseURL: 'https://olive-dev.kross.kr',
  accessId: '',
  secretKey: '',
});

beforeEach( async()=> { 
  const credentials = await getToken();
  client.authToken = credentials.token;
})

const loan_id = 11111

const params : ParamType = {
}

it('PaymentSChedule:  ', async () => {
  return await client.paymentSchedule(loan_id)
  .then(response => {
    expect(typeof response.data).toBe('object')
    expect(response.status).toBe(200);
  })
 })

it('Loans:  ', async () => {
  return await client.loans({})
  .then(response => {
    expect(typeof response.data).toBe('object')
    expect(response.status).toBe(200);
  })
 })

 it('loanCongigs:  ', async () => {
  return await client.loanConfigs(params)
  .then(response => {
    expect(response.status).toBe(200);
  })
 })

 it('loanRepayments:  ', async () => {
  return await client.loanRepayments(params)
  .then(response => {
    expect(response.status).toBe(200);
  })
 })