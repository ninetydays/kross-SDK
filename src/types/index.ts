import { AxiosRequestConfig } from "axios"

export interface WindowFeatures {
  width: number
  height: number
  top: number
  left: number
}
export interface WindowPopUpParams {
  url: string
  windowFeatures: WindowFeatures
}

export type QueryList = {
  user_id: any; 
  state?: any;
  limit?: any;
  offset?: any;
  sortBy?: any;
};

export type KrossClientOptions = AxiosRequestConfig & {
  baseURL: string | undefined,
  accessId: string
  secretKey: string
}
