import axios, { AxiosInstance } from 'axios'
import { createHmac } from 'crypto'
import { QueryList } from './types'
import { KrossClientOptions } from './types/index'

export class KrossClient {
  client: AxiosInstance

  constructor(options: KrossClientOptions) {
    options.baseURL = process.env.REACT_APP_OLIVE_BASE_URL,
    this.client = axios.create({
      baseURL: process.env.REACT_APP_OLIVE_BASE_URL,
    })
    this.client.interceptors.request.use(
      (config) => {
        const { method } = config
        const date = new Date().toUTCString()
        const hashString = hmacHashString(
          options.secretKey,
          [date, method].join(' ')
        )

        config.headers = {
          ...config.headers,
          Authorization: `KROSS ${options.accessId}:${hashString}`,
          'X-Date': date,
        }
        return config
      },
      (error) => Promise.reject(error)
    )
  }

  async getNoteList (query : QueryList) {
    const orderBy = query.state === 'done' ? 'doneAt' : 'issueAt';
    const params = {
        orderBy,
        ...query
    }
    try {
      const response = await this.client.get(`/user/${query.user_id}/notes`, {
        params,
      });  
      return response;
    }catch (error) {
      console.error(error);
      return error;
    }
  }

  get(url: string, options?: KrossClientOptions) {
    return this.client.get(url, options)
  }

  put(url: string, options?: KrossClientOptions) {
    return this.client.put(url, options)
  }

  post(url: string, options?: KrossClientOptions) {
    return this.client.post(url, options)
  }

  request(options: KrossClientOptions) {
    return this.client.request(options)
  }
}

export const hmacHashString = (secretKey: string, message: string) => {
  const hmac = createHmac('sha256', secretKey)
  hmac.update(message)
  return hmac.digest('base64')
}
