import { KrossClient } from '../kross-client'

export class Accounts extends KrossClient {
  async accountCheck(bankId: number, accountNumber: number, verify_code: number) {
    try {
      return this.client.post(`/accounts/check`, {
        data: {
          bankId,
          verify_code,
          accountNumber,
        }
      })

    }catch (error){
      console.log(error);
      return error;
    }
  }

  async withdrawRequest(member_no: number, amount: number) {
    try {
      return await this.client.post(`/accounts/withdraw/init`), {
        data: {
          member_no,
          amount,
        }
      }
    }catch (error){
      console.log(error);
      return error;
    }
  }

  async withdrawVerify(idempotency_key: number, verify_code: number) {
    try {
      return await this.client.post(`/accounts/withdraw/verify`), {
        data: {
          idempotency_key,
          verify_code,
        }
      }
    }catch (error){
      console.log(error);
      return error;
    }
  }

  async withdrawCancel(idempotency_key: number) {
    try {
      return await this.client.post(`/accounts/withdraw/cancel`), {
        data: {
          idempotency_key,
        }
      }
    }catch (error){
      console.log(error);
      return error;
    }
  }
  
}
