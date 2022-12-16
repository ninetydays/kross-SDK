import { KrossClient } from '../kross-client'

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
}
