import { KrossClient } from '../kross-client'
import { ParamType } from '../types'

export class Loans extends KrossClient {
  paymentSchedule = async (loan_id: number) => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get(`/loans/${loan_id}/payment-schedule`)
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  loans = async (params: ParamType) => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get('/loans', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  loanConfigs = async (params: ParamType) => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get('/loan-configs', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  loanRepayments = async (params: ParamType) => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get('/loan-repayments', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }
}
