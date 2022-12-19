import oliveClient from '../oliveClient'
import { AxiosRequestConfig } from 'axios'
import { QueryType } from '../types'

export class Investments {
  notes = async (authToken: string, params: QueryType) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/notes',
      data: {
        params,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  getInvestments = async (authToken: string, params: QueryType) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/investments',
      data: {
        params,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  postInvestments = async (authToken: string, params: QueryType) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/investments',
      data: {
        params,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  investmentCancel = async (authToken: string, investment_id: number) => {
    const config: AxiosRequestConfig = {
      method: 'patch',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: `/investments/${investment_id}/cancel`,
      data: {
        investment_id,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }

  userNoteLogs = async (authToken: string, params: QueryType) => {
    const config: AxiosRequestConfig = {
      method: 'patch',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      url: '/user-note-logs',
      data: {
        params,
      },
    }
    const response = await oliveClient(config)
    return response.data
  }
}
