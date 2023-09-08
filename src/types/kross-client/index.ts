import { AxiosRequestConfig, AxiosResponse } from 'axios';
export * from './account';
export * from './investments';
export * from './loans';
export * from './user';
export * from './investments';
export * from './account';
export * from './inquiry';
export * from './general-info';
export * from './sign-contract';
export * from './fcm-management';

type RefreshTokenCallback = (token: string) => void;
type forceLogoutCallback = () => void;

export type KrossClientOptions = AxiosRequestConfig & {
  baseURL: string;
  accessId: string;
  secretKey: string;
  authToken?: string;
  refreshToken?: string;
  refreshTokenCallback?: RefreshTokenCallback;
  forceLogoutCallback?: forceLogoutCallback;
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

export type FunctionRegistered<O = unknown, I = unknown> = (
  input?: I
) => Promise<AxiosResponse<O>>;

export type LoginDto = {
  keyid: string;
  password: string;
  refreshExpiresIn?: number;
};

export type LoginResponse = {
  token: string;
  refresh: string;
};

export type GetAuthTokenResponse = {
  token: string;
};

export type UserRegisterDto = {
  keyid: string;
  password: string;
  password2: string;
  isBorrower?: boolean;
  email?: string;
  corpRegNo?: string;
  name?: string;
  verificationType?: string;
  verificationData?: Record<string, unknown>;
};
