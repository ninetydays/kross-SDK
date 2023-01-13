import { FunctionResponse } from './index';

export type InvestmentListResponseData = {
  id: number;
  product_id: number;
  applicant_id: number;
  member_id: number;
  user_id: number;
  amount: number;
  state: string;
  wc_tid: string;
  data: {};
  createdAt: Date;
  updatedAt: Date;
}

export type InvestmentListResponse = FunctionResponse<InvestmentListResponseData>

export type InvestmentRegisterDto = {
  amount: number;
  loan_id: number;
  user_id: number;
}

export type InvestmentRegisterResponse = FunctionResponse;

export type InvestmentCancelDto = {
  investment_id: number;
}

export type InvestmentCancelReponseData = {
  rsp_code: string;
  rsp_message: string;
}

export type InvestmentCancelResponse = FunctionResponse<InvestmentCancelReponseData>

