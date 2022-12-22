import { KrossClient } from '../kross-client'
import { QueryType } from '../types'

export class Accounts extends KrossClient {
  paymentSchedule = async (loan_id: number) => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get(`/loans/${loan_id}/payment-schedule`, {
        data: {
          loan_id,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  loans = async (params: QueryType) => {
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

  loanConfigs = async (params: QueryType) => {
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

  loanRepayments = async (params: QueryType) => {
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
