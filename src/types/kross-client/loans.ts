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
  id: number;
  no: number;
  application_id: string;
  user_id: number;
  name: string;
  category: string;
  state: string;
  is_displayed: boolean;
  payment_date: string;
  due_date: string;
  repayment_date: string;
  period: number;
  interest_rate: number;
  overdue_interest_rate: number;
  investor_fee_rate: number;
  borrower_fee_rate: number;
  fund_amount: number;
  invested_amount: number;
  expected_amount: number;
  repayment_amount: number;
  principal: number;
  interest_amount: number;
  investor_fee_amount: number;
  borrower_fee_amount: number;
  tax_amount: number;
  repayment_type: string;
  repayment_cycle: number;
  repayment_count: number;
  wc_tid: string;
  wc_rtid: string;
  wc_keepid: string;
  kftc_loan_register_id: string;
  kftc_loan_contract_id: string;
  kftc_goods_id: string;
  memo: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  userInvestedAmount?: number;
  isUserInvested?: boolean;
  investmentId?: number | null;
  reservedAt: Date;
};

export type LoansResponse = FunctionResponse<LoanResponseData>;

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
