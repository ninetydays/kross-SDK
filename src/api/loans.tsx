import { KrossClient } from '../kross-client'
import { QueryType } from '../types';

export class Accounts extends KrossClient {
  async paymentSchedule(loan_id: number) {
    try {
      return this.client.post(`/loans/${loan_id}/payment-schedule`, {
        data: {
          loan_id,
        }
      })

    }catch (error){
      console.log(error);
      return error;
    }
  }
  
  async loans(params: QueryType) {
    try {
      return this.client.get(`/loans`), {
        params,
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async loanConfigs(params: QueryType) {
    try {
      return this.client.get(`/loan-configs`), {
        params,
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async loanRepayments(params: QueryType) {
    try {
      return this.client.get(`/loan-repayments`), {
        params,
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
