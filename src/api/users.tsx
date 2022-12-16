import { KrossClient } from '../kross-client'
import { QueryType } from '../types'
export class Users extends KrossClient {

  async users(params: QueryType) {
    try {
      return await this.client.get(`/user`), {
        params,
      }
    } catch (error) {
      console.error(error)
      return error
    }
  }
  async cmsTradebook(params: QueryType) {
    try {
      return await this.client.get(`/cms-tradebooks`), {
        params,
      }
    }catch (error){
      console.log(error);
      return error;
    }
  }


  async checkVirtualAccount(member_no: number) {
    try {
      return await this.client.get(`/users/virtual-account/${member_no}`)
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async releaseDepositControl(member_no: number) {
    try {
      return await this.client.patch(`/users/release-deposit`, {
        data: {
          member_no,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async unRegisterMember(member_no: number) {
    try {
      return await this.client.patch(`/users/welcome-unregister`, {
        data: {
          member_no,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async getVirtualAccCertificate(member_no: number) {
    try {
      return await this.client.get(`/users/account-certificate`, {
        data: {
          member_no,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async kftcBalance(member_no: number) {
    try {
      return await this.client.get(`/users/borrower-amount`, {
        data: {
          member_no,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }
  async userAccountLogs(params: QueryType) {
    try {
      return await this.client.get(`/user-account-logs`, {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
