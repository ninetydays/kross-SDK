import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { KrossClientOptions } from './types'
import { generateToken } from './encryptor'

export class KrossClient {
  client: AxiosInstance
  authToken?: string
  refresh?: string
  isLogin: boolean
  constructor(options: KrossClientOptions) {
    this.isLogin = false;
    const { hmacToken, xDate }  = generateToken();
    this.client = axios.create(options)
    this.client.interceptors.request.use(
      (config) => {
        console.log("Config header: ", config);
        this.isLogin ? 
        config.headers = {
          ...config.headers,
          'client-authorization': hmacToken,
          'X-Date': xDate, 
          'authorization': `Bearer ${this.refresh}`,
        }
        :
        config.headers = {
          ...config.headers,
          'client-authorization': hmacToken,
          'X-Date': xDate,
        }
        return config
      },
      (error) => Promise.reject(error)
)
  }

  async login(keyid: string, password: string) {
    let response;
    try {
      response =  await this.client.post(
        '/auth/login',
        {
          keyid,
          password,
        }
      );
      let {tokenAuth} = response.data
      this.authToken = tokenAuth
      this.isLogin = true;
    } catch (error) {
      console.error(error)
      return error
    }
    return response.data;
  }

  async refreshToken() {
    try {
      const response = await this.client.get(`/auth/refresh`);
      
      let {tokenAuth} = response.data;
      this.refresh = tokenAuth;
      return response;
    } catch (error) {
      console.error(error)
      return error
    }
  }


  
  get(url: string, options?: AxiosRequestConfig) {
    return this.client.get(url, options)
  }

  put(url: string, options?: AxiosRequestConfig) {
    return this.client.put(url, options)
  }

  patch(url: string, options?: AxiosRequestConfig) {
    return this.client.patch(url, options)
  }

  post(url: string, options?: AxiosRequestConfig) {
    return this.client.post(url, options)
  }

  request(options: AxiosRequestConfig) {
    return this.client.request(options)
  }
}
