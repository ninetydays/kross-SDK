import { KrossClient } from '../kross-client'
import { QueryType } from '../types'

export class Investments extends KrossClient {
  async notes(params: QueryType) {
    try {
      return await this.client.get(`/notes`, {
        params,
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }
  async getInvestments(params: QueryType) {
    try {
      return await this.client.get(`/investments`, {
        params,
      })
    }catch (error) {
      console.error(error);
      return error;
    }
  }

  async postInvestments(params: QueryType) {
    try {
      return await this.client.post(`/investments`, {
        params,
      })
    }catch (error) {
      console.error(error);
      return error;
    }
  }

  async investmentCancel(investment_id: number) {
    try {
      return await this.client.patch(`/investments/${investment_id}/cancel`), {
        data: {
          investment_id,
        }
      }
    }catch (error) {
      console.error(error);
      return error;
    }
  }

async userNoteLogs(params: QueryType) {
    try {
      return await this.client.patch(`/user-note-logs`), {
        params,
      }
    }catch (error) {
      console.error(error);
      return error;
    }
  }

  

    
}
