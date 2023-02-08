import { useMutation, useQuery } from 'react-query';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
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

  constructor(options: KrossClientOptions) {
    this.instance = axios.create(options);

    this.instance.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const getHmacToken = await hmacTokenFunction(
          options.accessId as string,
          options.secretKey as string
        );

        const hmacToken = await getHmacToken(config.method as string);

        config.headers = {
          ...config.headers,
          'client-authorization': hmacToken.hmacToken,
          'X-Date': hmacToken.xDate,
        };

        if (options?.refreshTokenCallback) {
          await options.refreshTokenCallback(config, hmacToken);
        }

        return config;
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
        return response;
      })
      .catch((e) => console.error(e));
  }

  async updateAuthToken(refreshToken?: string) {
    const res = await this.instance.get<GetAuthTokenResponse>(`/auth/refresh`, {
      headers: {
        authorization: `Bearer ${refreshToken}`,
      },
    });
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
