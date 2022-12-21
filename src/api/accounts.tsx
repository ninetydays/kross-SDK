import { KrossClient } from '../kross-client'
export class Accounts  extends KrossClient{
  accountCheck = async (
    bankId: number,
    accountNumber: number,
    verify_code: number
  ) => {
    const response = await this.client.post('/accounts/check', {
      bankId,
      accountNumber,
      verify_code,
    })
    return response.data
  }

  withdrawRequest = async (
    member_no: number,
    amount: number
  ) => {
    const response = await this.client.post('/accounts/withdraw/init', {
      member_no,
      amount,
    })
    return response.data
  }
  withdrawVerify = async (
    idempotency_key: number,
    verify_code: number
  ) => {
    const response = await this.client.post('/accounts/withdraw/verify', {
      idempotency_key,
      verify_code,
    })
    return response.data
  }

  withdrawCancel = async (idempotency_key: number) => {
    const response = await this.client.patch('/accounts/withdraw/cancel', {
      idempotency_key,
    })
    return response.data
  }
}
