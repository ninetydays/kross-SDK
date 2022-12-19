import oliveClient from '../oliveClient'
import { AxiosRequestConfig } from 'axios'
import { QueryType } from '../types'

export class Accounts {
  paymentSchedule = async (authToken: string, loan_id: number) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: `/loans/${loan_id}/payment-schedule`,
      data: {
        loan_id,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  loans = async (authToken: string, params: QueryType) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/loans',
      data: {
        params,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  loanConfigs = async (authToken: string, params: QueryType) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/loan-configs',
      data: {
        params,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  loanRepayments = async (authToken: string, params: QueryType) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/loan-repayments',
      data: {
        params,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }
}
