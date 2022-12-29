import { KrossClient } from '../kross-client'
import { ParamType } from '../types'

export class Users extends KrossClient {
  cmsTradebook = async (params: ParamType) => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get('/cms-tradebooks', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  checkVirtualAccount = async () => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get('/users/virtual-account')
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  releaseDepositControl = async () => {
    this.method = 'patch'
    let response
    try {
      response = await this.client.patch('/users/release-deposit')
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  unRegisterMember = async () => {
    this.method = 'patch'
    let response
    try {
      response = await this.client.patch('/users/welcome-unregister')
    } catch (error) {
      console.error(error)
      return error
    }

    return response
  }

  getVirtualAccCertificate = async () => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get('/users/account-certificate')
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  kftcBalance = async () => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get('/users/borrower-amount')
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  userAccountLogs = async (params: ParamType) => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get('/user-account-logs', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }
}
