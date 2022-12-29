import { KrossClient } from '../kross-client'
import { ParamType, InvestmentRegisterDto } from '../types'

export class Investments extends KrossClient {
  notes = async (params: ParamType) => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get('/notes', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  getInvestments = async (params: ParamType) => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get('/investments', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  postInvestments = async (params: InvestmentRegisterDto) => {
    this.method = 'post'
    let response
    try {
      response = await this.client.post('/investments', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }
  investmentCancel = async (investment_id: number) => {
    this.method = 'patch'
    let response
    try {
      response = await this.client.patch(`/investments/${investment_id}/cancel`)
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  userNoteLogs = async (params: ParamType) => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get('/user-note-logs', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }
}
