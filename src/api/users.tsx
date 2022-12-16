import { KrossClient } from '../kross-client'
import { QueryType } from '../types'

export class Users extends KrossClient {
  async checkVirtualAccount(user_id: number, query: QueryType) {
    try {
      return await this.client.get(`/users/virtual-account/${user_id}`, {
        data: {
          query,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async releaseDepositControl(query: QueryType) {
    try {
      return await this.client.patch(`/users/release-deposit`, {
        data: {
          query,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async unRegisterMember(query: QueryType) {
    try {
      return await this.client.patch(`/users/welcome-unregister`, {
        data: {
          query,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async getVirtualAccCertificate(query: QueryType) {
    try {
      return await this.client.get(`/users/account-certificate`, {
        data: {
          query,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
