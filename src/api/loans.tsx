import { KrossClient } from '../kross-client'
import { QueryType } from '../types'

export class Accounts extends KrossClient {

  paymentSchedule = async (loan_id: number) => {
    const response = await this.client.get(`/loans/${loan_id}/payment-schedule`, {
      data: {
        loan_id,
      }
    })
    return response.data
  }

  loans = async (params: QueryType) => {
    const response = await this.client.get('/notes', {
      params,
    })
    return response.data
  }

  loanConfigs = async (params: QueryType) => {
    const response = await this.client.get('/loan-configs', {
      params,
    })
    return response.data
  }

  loanRepayments = async (params: QueryType) => {
    const response = await this.client.get('/loan-repayments', {
      params,
    })
    return response.data
  }
}
