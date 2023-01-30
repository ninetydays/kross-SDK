import { useMutation, useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {
  KrossClientOptions,
  FunctionOptions,
  LoginDto,
  LoginResponse,
  GetAuthTokenResponse,
} from '../types';
import { hmacTokenFunction } from '../utils/encryptor';

export class KrossClientBase {
  instance: AxiosInstance;
  refreshToken?: string;
  authToken?: string;
  tempToken?: string;
  getHmacToken: (method: string) => { hmacToken: string; xDate: string };
  constructor(options: KrossClientOptions) {
    this.getHmacToken = hmacTokenFunction(options.accessId, options.secretKey);
    this.instance = axios.create(options);

    this.instance.interceptors.request.use((config) => {
      AsyncStorage.getItem('authToken').then((value: string | null) => {
        this.authToken = value as string;
      });
      const { hmacToken, xDate } = this.getHmacToken(config.method as string);
      config.headers = {
        ...config.headers,
        'client-authorization': hmacToken,
        'X-Date': xDate,
      };

      if (this.authToken && config.url != '/auth/refresh') {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${this.authToken}`,
        };
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => {
        if (response.status === 404) {
          console.log('preflight request needs to be handled');
        }
        return response;
      },
      async (error: AxiosError) => {
        // Access Token was expired
        if (
          error?.response?.status === 401 &&
          error?.config?.url !== '/auth/login'
        ) {
          await this.updateAuthToken();
          return this.instance.request(error.config);
        } else {
          console.log('Error in axios response interceptor', { ...error });
          return Promise.reject(error.response);
        }
      }
    );
  }
  login({ keyid, password }: LoginDto) {
    return this.instance
      .post<LoginResponse>('/auth/login', {
        keyid,
        password,
      })
      .then((response) => {
        if (response.data?.token && response.data?.refresh) {
          AsyncStorage.setItem('authToken', response.data.token as string);
          AsyncStorage.setItem('refreshToken', response.data.refresh as string);
        }
        return response;
      });
  }

  async updateAuthToken() {
    this.refreshToken =
      (await AsyncStorage.getItem('refreshToken')) || undefined;
    const res = await this.instance.get<GetAuthTokenResponse>(`/auth/refresh`, {
      headers: { authorization: `Bearer ${this.refreshToken}` },
    });
    if (res.data?.token && !this.refreshToken) {
      AsyncStorage.setItem('authToken', res.data.token as string);
    }
    return res;
  }

  useAuthHooks() {
    return {
      useLogin: () => {
        const mutation = useMutation((loginDto: LoginDto) =>
          this.login(loginDto)
        );
        return mutation;
      },
      updateAuthToken: () => {
        return useQuery({
          queryKey: 'updateAuthToken',
          queryFn: async () => {
            return this.updateAuthToken().then((res) => {
              return res.data;
            });
          },
        });
      },
    };
  }

  get<T = unknown>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, options);
  }

  put<T = unknown>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, options);
  }

  patch<T = unknown>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, options);
  }

  post<T = unknown>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, options);
  }

  request<T = unknown>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.request<T>(options);
  }

  static registerFunction<I = unknown, O = unknown>(
    options: FunctionOptions
  ): (input?: I) => Promise<AxiosResponse<O>> {
    return function (
      this: KrossClientBase,
      input?: I
    ): Promise<AxiosResponse<O>> {
      let url = '';

      /* replace `/api/user/:user_id` to `/api/user/120` when input.user_id is available
       *
       * For example
       *
       * => when creating a function
       * testFunction = registerFunction({url: '/api/user/:user_id', urlParam: 'user_id', method: 'get'})
       *
       * => when using the function
       * testFunction({user_id: 27})
       */
      if (options.urlParam) {
        const urlParam = (input as unknown as { [name: string]: string })[
          options.urlParam
        ];
        if (!urlParam) {
          throw new Error(`missing ${options.urlParam}`);
        }
        url = options.url.replace(`:${options.urlParam}`, urlParam);
      } else {
        url = options.url;
      }
      const paramsAndDataObject =
        options.method === 'get' ? { params: input } : { data: input };
      return this.request({
        url,
        method: options.method,
        ...paramsAndDataObject,
      });
    };
  }
}
