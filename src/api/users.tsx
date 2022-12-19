import oliveClient from '../oliveClient'
import { AxiosRequestConfig } from 'axios'
import { QueryType } from '../types'

export class Users {
  users = async (authToken: string, params: QueryType) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/user',
      data: {
        params,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }
  cmsTradebook = async (authToken: string, params: QueryType) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/cms-tradebooks',
      data: {
        params,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  checkVirtualAccount = async (authToken: string, member_no: number) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: `/users/virtual-account/${member_no}`,
      data: {
        member_no,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  releaseDepositControl = async (authToken: string, member_no: number) => {
    const config: AxiosRequestConfig = {
      method: 'patch',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/users/release-deposit',
      data: {
        member_no,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  unRegisterMember = async (authToken: string, member_no: number) => {
    const config: AxiosRequestConfig = {
      method: 'patch',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/users/welcome-unregister',
      data: {
        member_no,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  getVirtualAccCertificate = async (authToken: string, member_no: number) => {
    const config: AxiosRequestConfig = {
      method: 'patch',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/users/account-certificate',
      data: {
        member_no,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  kftcBalance = async (authToken: string, member_no: number) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/users/borrower-amount',
      data: {
        member_no,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  userAccountLogs = async (authToken: string, params: QueryType) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/user-account-logs',
      data: {
        params,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }
}
