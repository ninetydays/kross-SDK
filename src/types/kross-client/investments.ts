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
};

export type InvestmentListResponse =
  FunctionResponse<InvestmentListResponseData>;

export type InvestmentRegisterDto = {
  amount: number;
  loan_id: number;
  user_id: number;
};

export type InvestmentRegisterResponse = FunctionResponse;

export type InvestmentCancelDto = {
  investment_id: number;
};

export type InvestmentCancelReponseData = {
  rsp_code: string;
  rsp_message: string;
};

export type InvestmentCancelResponse =
  FunctionResponse<InvestmentCancelReponseData>;

export type NotesResponseData = {
  id: number;
  product_id: number;
  product_code: string;
  applicant_id: number;
  user_id: number;
  member_id: number;
  amount: number;
  rate: number;
  fee_rate: number;
  period: number;
  startAt: string;
  issueAt: string;
  returnAt: string;
  doneAt: Date;
  fund_amount: number;
  invested_amount: number;
  returned_amount: number;
  expected_amount: number;
  fee_amount: number;
  tax_amount: number;
  escrow_amount: number;
  guarantee_id: string;
  principal: number;
  interest: number;
  origin_principal: number;
  state: string;
  data: {};
  createdAt: Date;
  updatedAt: Date;
};

export type NotesResponse = FunctionResponse<NotesResponseData>;

export type CmsTradebookResponseData = {
  id: number;
  category: string;
  tag: string;
  amount: number;
  exposure: boolean;
  status: string;
  member_no: string;
  data: {};
  createdAt: Date;
  updatedAt: Date;
};

export type CmsTradebookResponse = FunctionResponse<CmsTradebookResponseData>;
