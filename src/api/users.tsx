import { KrossClient } from '../kross-client'
import { QueryType } from '../types'

export class Users extends KrossClient {
  users = async (params: QueryType) => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get('/user', {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }
  cmsTradebook = async (params: QueryType) => {
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

  checkVirtualAccount = async (member_no: number) => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get(`/users/virtual-account/${member_no}`, {
        data: {
          member_no,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  releaseDepositControl = async (member_no: number) => {
    this.method = 'patch'
    let response
    try {
      response = await this.client.patch('/users/release-deposit', {
        member_no,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  unRegisterMember = async (member_no: number) => {
    this.method = 'patch'
    let response
    try {
      response = await this.client.patch('/users/welcome-unregister', {
        member_no,
      })
    } catch (error) {
      console.error(error)
      return error
    }

    return response
  }

  getVirtualAccCertificate = async (member_no: number) => {
    this.method = 'patch'
    let response
    try {
      response = await this.client.patch('/users/account-certificate', {
        member_no,
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  kftcBalance = async (member_no: number) => {
    this.method = 'get'
    let response
    try {
      response = await this.client.get('/users/borrower-amount', {
        data: {
          member_no,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
    return response
  }

  userAccountLogs = async (params: QueryType) => {
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
