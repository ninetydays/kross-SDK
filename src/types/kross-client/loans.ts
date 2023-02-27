import { FunctionResponse } from './index';

export type LoansQueryDto = {
  select?: string;
  skip?: string;
  take?: string;
  order?: string;
  filter?: string;
  join?: string;
};
export type LoanResponseData = {
  id: string;
  no: number;
  applicationId: string;
  userId: number;
  name: string;
  category: string;
  state: string;
  isDisplayed: boolean;
  paymentDate: string;
  dueDate: string;
  repaymentDate: string;
  period: number;
  interestRate: number;
  overdueInterestRate: number;
  investorFeeRate: number;
  borrowerFeeRate: number;
  fundAmount: number;
  investedAmount: number;
  expectedAmount: number;
  repaymentAmount: number;
  principal: number;
  interestAmount: number;
  investorFeeAmount: number;
  borrowerFeeAmount: number;
  taxAmount: number;
  repaymentType: string;
  repaymentCycle: number;
  repaymentCount: number;
  wcTid: string;
  wcRtid: string;
  wcKeepid: string;
  kftcLoanRegisterId: string;
  kftcLoanContractId: string;
  kftcGoodsId: string;
  memo: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  userInvestedAmount?: number;
  isUserInvested?: boolean;
  investmentId?: number | null;
  reservedAt: Date;
  investableLimit?: number;
};

export type LoansResponse = Array<LoanResponseData>;

export type PaymentScheduleDto = {
  loan_id: number;
};
export type PaymentScheduleResponse = FunctionResponse;

export type LoanConfigResponseData = {
  id: number;
  user_id: number;
  loan_category: string;
  loan_name: string;
  period: number;
  interest_rate: number;
  investor_fee_rate: number;
  borrower_fee_rate: number;
  repayment_type: string;
  repayment_cycle: string;
  repayment_count: number;
  path: string;
  audit_number: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LoanConfigResponse = FunctionResponse<LoanConfigResponseData>;

export type LoanRepaymentReponseData = {
  id: number;
  loan_id: number;
  seq: number;
  state: string;
  amount: number;
  principal: number;
  interest: number;
  investor_fee: number;
  investor_fee_vat: number;
  borrower_fee: number;
  borrower_fee_vat: number;
  income_tax: number;
  local_tax: number;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

export type LoanRepaymentResponse = FunctionResponse<LoanRepaymentReponseData>;
