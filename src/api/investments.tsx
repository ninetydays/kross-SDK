import { KrossClient } from '../kross-client'
import { QueryType } from '../types'

export class Investments extends KrossClient{
  notes = async (params: QueryType) => {
    this.method = 'get'
    const response = await this.client.get('/notes', {
      params,
    })
    return response.data
  }

  getInvestments = async (params: QueryType) => {
    this.method = 'get'
    const response = await this.client.get('/investments', {
      params,
    })
    return response.data
  }

  postInvestments = async (params: QueryType) => {
    this.method = 'post'
    const response = await this.client.post('/investments', {
      params,
    })
    return response.data

  }
  investmentCancel = async (investment_id: number) => {
    this.method = 'patch'
    const response = await this.client.patch(`/investments/${investment_id}/cancel`, {
      investment_id,
    })
    return response.data
  }

  userNoteLogs = async (params: QueryType) => {
    this.method = 'get'
    const response = await this.client.get('/user-note-logs', {
      params,
    })
    return response.data
  }
}
