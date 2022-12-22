import { KrossClient } from '../kross-client'
export class Accounts extends KrossClient {
  accountCheck = async (
    bankId: number,
    accountNumber: number,
    verify_code: number
  ) => {
    this.method = 'post'
    let response
    try {
      response = await this.client.post('/accounts/check', {
        bankId,
        accountNumber,
        verify_code,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  withdrawRequest = async (member_no: number, amount: number) => {
    this.method = 'post'
    let response
    try {
      response = await this.client.post('/accounts/withdraw/init', {
        member_no,
        amount,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }
  withdrawVerify = async (idempotency_key: number, verify_code: number) => {
    this.method = 'post'
    let response
    try {
      response = await this.client.post('/accounts/withdraw/verify', {
        idempotency_key,
        verify_code,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  withdrawCancel = async (idempotency_key: number) => {
    this.method = 'patch'
    let response
    try {
      response = await this.client.patch('/accounts/withdraw/cancel', {
        idempotency_key,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }
}
