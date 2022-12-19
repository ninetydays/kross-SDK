import { AxiosRequestConfig } from 'axios'
import oliveClient from '../oliveClient'
export class Accounts {
  accountCheck = async (
    authToken: string,
    bankId: number,
    accountNumber: number,
    verify_code: number
  ) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/accounts/check',
      data: {
        bankId,
        verify_code,
        accountNumber,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  withdrawRequest = async (
    authToken: string,
    member_no: number,
    amount: number
  ) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/accounts/withdraw/init',
      data: {
        member_no,
        amount,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }
  withdrawVerify = async (
    authToken: string,
    idempotency_key: number,
    verify_code: number
  ) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/accounts/withdraw/verify',
      data: {
        idempotency_key,
        verify_code,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  withdrawCancel = async (authToken: string, idempotency_key: number) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/accounts/withdraw/cancel',
      data: {
        idempotency_key,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }
}
