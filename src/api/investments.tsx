import { KrossClient } from '../kross-client'
import { QueryType } from '../types'

export class Investments extends KrossClient {
  async notes(query: QueryType) {
    try {
      return await this.client.get(`/notes`, {
        data: {
          query,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }
  async investments(query: QueryType) {
    try {
      return await this.client.get(`/investments`, {
        data: {
          query,
        }
      })
    }catch (error) {
      console.error(error);
      return error;
    }
  }
  async InvestmentCancel(investment_id: number) {
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
    
}
