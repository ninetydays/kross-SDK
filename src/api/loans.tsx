import { KrossClient } from '../kross-client'
import { QueryType } from '../types'

export class Accounts extends KrossClient {

  paymentSchedule = async (loan_id: number) => {
    this.method = 'get'
    const response = await this.client.get(`/loans/${loan_id}/payment-schedule`, {
      data: {
        loan_id,
      }
    })
    return response.data
  }

  loans = async (params: QueryType) => {
    let response;
    this.method = 'get';
    try {
    response = await this.client.get(
      '/loans',
      {
        data: {
          params,
        }
      })
    } catch (e){
      console.error(e);
      return e;
    }
    return response.data
  }

  loanConfigs = async (params: QueryType) => {
    this.method = 'get';
    const response = await this.client.get(
      '/loan-configs', 
      {
        params,
      })
    return response.data
  }

  loanRepayments = async (params: QueryType) => {
    this.method = 'get'
    const response = await this.client.get('/loan-repayments', {
      params,
    })
    return response.data
  }
}
