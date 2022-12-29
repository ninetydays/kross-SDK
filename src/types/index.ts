import { AxiosRequestConfig } from 'axios'

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
export type ParamType = {
  fields?: string
  offset?: string
  limit?: string
  sortby?: string
  group_by?: string
  query?: string
}

export type AccountCheckDto = {
  bankId: string
  accountNumber: string
  name: string
}

export type InvestmentRegisterDto = {
  amount: number
  loan_id: number
  user_id: number
}

export type WithdrawRequestDto = {
  member_no: number
  amount: number
}

export type WithdrawVerifyDto = {
  idempotency_key: string
  verify_code: number
}

export type WithdrawCancelDto = {
  idempotency_key: string
}

export type KrossClientOptions = AxiosRequestConfig & {
  baseURL: string
  accessId: string
  secretKey: string
}

export type options = {
  accessId: string
  secretKey: string
}
