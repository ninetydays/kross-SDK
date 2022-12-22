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

export type QueryType = {
  application_id?: number
  id?: number
  user_id?: number
  name?: string
  member_id?: number
  startAt?: Date
  endAt?: Date
  state?: string
  offset?: number
  fields?: string
  limit?: any
  sortBy?: string
  bankId?: string
  accountNumber?: number
  loanId?: number
  investmentId?: number
  amount?: number
  idempotencyKey?: number
  loan_id?: number
}

export type KrossClientOptions = AxiosRequestConfig & {
  accessId: string
  secretKey: string
}

export type options = {
  accessId: string
  secretKey: string
}
