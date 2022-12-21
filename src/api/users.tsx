import { KrossClient } from '../kross-client'
import { QueryType } from '../types'

export class Users extends KrossClient {
  users = async (params: QueryType) => {
    const response = await this.client.get('/user', {
      params,
    })
    return response.data
  }
  cmsTradebook = async (params: QueryType) => {
    const response = await this.client.get('/cms-tradebooks', {
      params,
    })
    return response.data
  }

  checkVirtualAccount = async (member_no: number) => {
    const response = await this.client.get(`/users/virtual-account/${member_no}`, {
      data: {
        member_no,
      }
    })
    return response.data
  }

  releaseDepositControl = async (member_no: number) => {
    const response = await this.client.patch('/users/release-deposit', {
      member_no,
    })
    return response.data
  }

  unRegisterMember = async (member_no: number) => {
    const response = await this.client.patch('/users/welcome-unregister', {
      member_no,
    })
    return response.data
  }

  getVirtualAccCertificate = async (member_no: number) => {
    const response = await this.client.patch('/users/account-certificate', {
      member_no,
    })
    return response.data
  }

  kftcBalance = async (member_no: number) => {
    let response;
    try {
      response = await this.client.get(
        '/users/borrower-amount',
        {
          data: {
            member_no
          },
        }
      );
    } catch(error) {
      console.error(error);
      return error;
    }
    return response.data
  }

  userAccountLogs = async (params: QueryType) => {
    const response = await this.client.get('/user-account-logs', {
      params,
    })
    return response.data
  }
}
