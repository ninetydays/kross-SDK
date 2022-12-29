import { Investments } from '../src/api/investments'
import { getToken } from './getToken'

const client = new Investments({
  baseURL: 'https://olive-dev.kross.kr/',
  accessId: '',
  secretKey: '',
});

beforeEach(async() => {
  let credentials = await getToken()
  client.authToken = credentials.token
})

const paramsInvestment = {
  amount: 10000,
  loan_id: 380348,
  user_id: 14218,
}

const params = {
  offset: '2'
}
const investment_id = 380213;


it('PostInvestment:  ', async () => {
  return client.postInvestments(paramsInvestment)
  .then(response => {
    expect(response?.status).toBe(200)
  })
})

it('UserNoteLog:  ', async () => {
  return client.userNoteLogs(params)
  .then(response => {
    expect(response?.status).toBe(200)
  })
})

it('Notes:  ', async () => {
  return client.notes(params)
  .then(response => {
    expect(response?.status).toBe(200)
  })
})

it('GetInvestment:  ', async () => {
  return client.getInvestments(params)
  .then(response => {
    expect(response?.status).toBe(200)
  })
})

it('InvestmentCancel:  ', async () => {
  return client.investmentCancel(investment_id)
  .then(response => {
    expect(response?.status).toBe(200)
  })
})
