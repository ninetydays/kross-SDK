import { KrossClient } from '../kross-client'
import {
  AccountCheckDto,
  WithdrawCancelDto,
  WithdrawRequestDto,
  WithdrawVerifyDto,
} from '../types'

export class Accounts extends KrossClient {
  accountCheck = async (params: AccountCheckDto) => {
    this.method = 'post'
    let response
    try {
      response = await this.client.post('/accounts/check', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  withdrawRequest = async (params: WithdrawRequestDto) => {
    this.method = 'post'
    let response
    try {
      response = await this.client.post('/accounts/withdraw/init', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }
  withdrawVerify = async (params: WithdrawVerifyDto) => {
    this.method = 'post'
    let response
    try {
      response = await this.client.post('/accounts/withdraw/verify', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  withdrawCancel = async (params: WithdrawCancelDto) => {
    this.method = 'patch'
    let response
    try {
      response = await this.client.patch('/accounts/withdraw/cancel', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }
}
