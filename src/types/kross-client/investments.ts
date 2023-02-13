import { FunctionResponse } from './index';

export type InvestmentQueryDto = {
  fields?: string;
  offset?: string;
  limit?: string;
  sort_by?: string;
  group_by?: string;
  query?: Record<string, unknown>;
  include?: Record<string, unknown>;
  filter?: string;
};

export type InvestmentsWengeQueryDto = {
  select?: string;
  skip?: string;
  take?: string;
  order?: string;
  filter?: string;
  join?: string;
};

export type InvestmentListResponseData = {
  id: number;
  product_id: number;
  applicant_id: number;
  member_id: number;
  user_id: number;
  amount: number;
  state: string;
  wc_tid: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  loan: Record<string, unknown>;
};

export type InvestmentListResponse = Array<InvestmentListResponseData>;

export type InvestmentRegisterDto = {
  amount: number;
  loan_id: number;
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
  productId: number;
  productCode: string;
  applicantId: number;
  userId: number;
  memberId: number;
  amount: number;
  rate: number;
  feeRate: number;
  period: number;
  startAt: string;
  issueAt: string;
  returnAt: string;
  doneAt: Date;
  fundAmount: number;
  investedAmount: number;
  returnedAmount: number;
  expectedAmount: number;
  feeAmount: number;
  taxAmount: number;
  escrowAmount: number;
  guaranteeId: string;
  principal: number;
  interest: number;
  originPrincipal: number;
  state: string;
  data: Record<string, unknown>;
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
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

export type CmsTradebookResponse = FunctionResponse<CmsTradebookResponseData>;

export interface InvestmentData {
  id: string;
  createdAt: string;
  updatedAt: string;
  productId: string;
  memberId: string;
  amount: number;
  state: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: {};
  applicantId: string;
  wcTid: null | string;
  userId: string;
  kftcInvestmentRegisterId: string;
  kftcContractId: null | string;
}
