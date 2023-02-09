import { AxiosRequestConfig, AxiosResponse } from 'axios';
export * from './account';
export * from './investments';
export * from './loans';
export * from './user';
export * from './investments';
export * from './account';

type RefreshTokenCallback = (token: string) => void;

export type KrossClientOptions = AxiosRequestConfig & {
  baseURL: string;
  accessId: string;
  secretKey: string;
  authToken?: string;
  refreshToken?: string;
  refreshTokenCallback?: RefreshTokenCallback;
};

export type FunctionOptions = {
  url: string;
  urlParam?: string;
  method: string;
};

export type FunctionResponse<T = unknown> = {
  data?: T;
  okay: boolean;
  message?: string;
};

export type FunctionRegistered<I = unknown, O = unknown> = (
  input?: I
) => Promise<AxiosResponse<O>>;

export type LoginDto = {
  keyid: string;
  password: string;
  expiresIn?: number;
};

export type LoginResponse = {
  token: string;
  refresh: string;
};

export type GetAuthTokenResponse = {
  token: string;
};
