const axios = require('axios')
import { Users } from '../src/api/users'
import {getToken} from './getToken'

const client = new Users({
  baseURL: 'https://olive-dev.kross.kr/',
  accessId: '',
  secretKey: '',
});

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
    interceptors: {
      request: {use: jest.fn(), eject: jest.fn()},
      response: { use: jest.fn(), eject: jest.fn()},
    },
    get: jest.fn(),
    post: jest.fn(),
  }))
  }
})

const users = 
  {
    okay: true,
    status: 200,
    data: [
      {
        id: 14218,
        member_no: 10783,
        keyid: 'random@kross.kr',
        password: 'b9d3f2ef0da36ceb5ab33032dfeb6efec0a22b0f86b7f0cdfadb8da82f1d5efe06d512c2325a92ede52b81ef0637d6ad3bff17534b52a864ac1fed7a55c3b38e',
        name: 'MURZAMIDINOV AZIYAT',
        member_type: 'investor',
        kftc_type: 'I110',
        guid: 'd7c717bb76a641c196f926e0dbb656f1',
        is_corp: false,
        state: 'live',
        birthday: '19990919',
        ssn: '990919xxxxxxx',
        email: 'xyz@kross.kr',
        mobile: '010########',
        phone_verified: true,
        id_card_verified: true,
        bank_account_verified: true,
        zip: '47502',
        address1: '부산 연제구 미남로 1',
        address2: '하나빌딩',
        financial_provider: false,
        fds_except: false,
        deposit_control: true,
        notify_on_new_products: false,
        notify_on_repayments: true,
        data: [Object],
        createdAt: '2022-11-17T04:44:28.301Z',
        updatedAt: '2023-01-03T00:33:57.185Z'
      }
    ]
  };

  
beforeEach(async() => {
  const credentials = await getToken()
  client.authToken = credentials?.token
  console.log("Authtoken: ", client.authToken)
})

it('It should fetch user details: ', async () => {
  const resp = { data: users };
  jest.spyOn(client, 'users').mockResolvedValueOnce(resp);
  const response = await client.users({});
  expect(response?.data).toEqual(users)
  expect(response?.data?.status).toBe(200)
  console.log("Response: ", response.data)
})