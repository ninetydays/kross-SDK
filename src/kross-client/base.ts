import { useMutation, useQuery } from 'react-query';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import {
  KrossClientOptions,
  FunctionOptions,
  LoginDto,
  LoginResponse,
  GetAuthTokenResponse,
} from '../types';
import { hmacTokenFunction } from '../utils/encryptor';
import { isBefore } from 'date-fns';
import jwt_decode from 'jwt-decode';

export class KrossClientBase {
  instance: AxiosInstance;
  authToken?: string | null | undefined;
  refreshToken?: string | null | undefined;
  refreshTokenCallback?: ((token: string) => void) | null | undefined;

  accessId: string;
  secretKey: string;

  constructor(options: KrossClientOptions) {
    this.instance = axios.create(options);
    this.authToken = options?.authToken || null;
    this.refreshToken = options?.refreshToken || null;
    this.refreshTokenCallback = options?.refreshTokenCallback || null;
    this.accessId = options.accessId;
    this.secretKey = options.secretKey;

    this.instance.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const getHmacToken = await hmacTokenFunction(
          this.accessId as string,
          this.secretKey as string
        );

        const hmacToken = await getHmacToken(config.method as string);
        config.headers = {
          ...config.headers,
          'client-authorization': hmacToken.hmacToken,
          'X-Date': hmacToken.xDate,
        };

        if (config.url?.includes('/idcard/ocr')) {
          config.headers = {
            ...config.headers,
            'Content-type': 'multipart/form-data',
          };
        }

        if (this.authToken) {
          const user: any = await jwt_decode(this.authToken as string);
          const isExpired = user.exp
            ? isBefore(new Date(user.exp * 1000), new Date())
            : true;

          if (!isExpired) {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${this.authToken}`,
            };
            if (config.url === '/verifications/idcard/ocr') {
              config.headers = {
                ...config.headers,
                'Content-type': 'multipart/form-data',
              };
            }
            return config;
          }
          const refreshTokenResponse = await axios.get(
            `${options.baseURL}/auth/refresh`,
            {
              headers: {
                'X-Date': hmacToken.xDate,
                'client-authorization': hmacToken.hmacToken,
                Authorization: `Bearer ${this.refreshToken}`,
              },
            },
          );

          if (refreshTokenResponse.status === 200) {
            if (this?.refreshTokenCallback) {
              await this.refreshTokenCallback(refreshTokenResponse.data.token);
            }
            this.authToken = refreshTokenResponse.data.token;
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${refreshTokenResponse.data.token}`,
            };
          }
        }
        return config;
      }
    );
  }
  login({ keyid, password, refreshExpiresIn }: LoginDto) {
    const loginDto = refreshExpiresIn
      ? {
          keyid,
          password,
          refreshExpiresIn,
        }
      : {
          keyid,
          password,
        };
    return this.instance
      .post<LoginResponse>('/auth/login', loginDto)
      .then((response) => {
        this.authToken = response.data.token;
        this.refreshToken = response?.data?.refresh;
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
