import { FunctionResponse, LoanResponseData } from './index';

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

export type tradeNotesDto = {
  note_id: number;
  origin_amount: number;
  trade_price: number;
  idempotency_key?: string;
};

export type tradeNotesResponse = {
  data: {
    idempotency_key: string;
  };
  okay: boolean;
  error: {
    message: string;
  };
};

export type InvestmentCauseResponse = {
  okay: boolean;
  error: {
    message: string;
  };
};

export type InvestmentRegisterResponse = {
  data: Record<string, unknown>[];
  status?: number;
  statusText?: string;
  message?: string;
  cause?: InvestmentCauseResponse[];
};

export type InvestmentCancelReponseData = {
  rsp_code: string;
  rsp_message: string;
};

export type InvestmentCancelResponse =
  FunctionResponse<InvestmentCancelReponseData>;

export type NotesResponseData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productId: number;
  productCode: string;
  applicantId: number;
  memberId: number;
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
  state: string;
  data: Record<string, unknown>;
  principal: number;
  interest: number;
  originPrincipal: number;
  userId: number;
  documentId: number;
  kftcContractId: string;
  transfer: boolean;
  kftcInvestmentRegisterId: string;
  paymentDate: string;
  dueDate: string;
  repaymentDate: string;
  loan?: LoanResponseData;
};

export type SoldOffNotesData = {
  id: string;
  productId: string;
  productCode: string;
  applicantId: string;
  memberId: string;
  state: string;
  rate: number;
  feeRate: number;
  period: number;
  fundAmount: number;
  investedAmount: number;
  returnedAmount: number;
  expectedAmount: number;
  feeAmount: number;
  taxAmount: number;
  escrowAmount: number;
  principal: number;
  interest: number;
  originPrincipal: number;
  startAt: Date;
  issueAt: Date;
  returnAt: Date;
  doneAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type SoldOffNotesResponse = FunctionResponse<SoldOffNotesData>;

export type NoteTransferLogsData = {
  id: string;
  buyerId: string;
  sellerId: string;
  sellerNoteId: string;
  buyerNoteId: string;
  originAmount: string;
  tradePrice: string;
  loanId: string;
  documentId: string;
  state: string;
  processDate: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NoteTransferResponse = FunctionResponse<NoteTransferLogsData>;

export type NotesByOwnersNameResponseData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  productId: string;
  productCode: string;
  applicantId: string;
  memberId: string;
  rate: number;
  feeRate: number;
  period: number;
  startAt: string;
  issueAt: string;
  returnAt: string | null;
  doneAt: string | null;
  fundAmount: number;
  investedAmount: number;
  returnedAmount: number;
  expectedAmount: number;
  feeAmount: number;
  taxAmount: number;
  state: string;
  data: Record<string, unknown>;
  principal: number;
  interest: number;
  originPrincipal: number;
  userId: string | null;
  documentId: string | null;
  kftcContractId: string | null;
  transfer: boolean;
  kftcInvestmentRegisterId: string | null;
  paymentDate: string;
  dueDate: string;
  repaymentDate: string | null;
  userName: string;
};

export type NotesResponse = NotesResponseData[];

export type NotesByOwnersNameResponse =
  FunctionResponse<NotesByOwnersNameResponseData>;

export type TransactionResponseData = {
  id: string;
  category: string;
  amount: string;
  balance: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  loan: Record<string, unknown> | null;
};

export type TransactionResponse = FunctionResponse<TransactionResponseData>;

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

export type NotesSummary = {
  state: string;
  count: string;
  investedAmount: number;
  buriedPrincipal: number;
  principal: number;
  originPrincipal: number;
  interest: number;
  feeAmount: number;
  taxAmount: number;
  expectedPretaxInterest: number;
  returnRatio: number;
};

export type NotesSummaryResponse = NotesSummary[];

export type ReturnOnInvestments = {
  principal: number;
  returnBeforeTax: number;
  feeAmount: number;
  taxAmount: number;
  returnAfterTax: number;
  returnRateBeforeTax: number;
  returnRateAfterTax: number;
};

export type ReturnOnInvestmentsDto = {
  startDate?: string;
  endDate?: string;
  roiType: string;
};

export type NotesSummaryQueryDto = {
  state: string;
};
