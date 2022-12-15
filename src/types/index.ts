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

export type queryType = {
  name?: string,
  startAt?: Date,
  endAt?: Date,
  state?: string,
  offset?: number,
  fields?: string,
  limit?: any;
  sortBy?: string;
};

export type KrossClientOptions = AxiosRequestConfig & {
  accessId: string
  secretKey: string
}
