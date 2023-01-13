import { FunctionResponse } from './index';

export type LoanResponseData = {
  id: number;
  no:	number;
  application_id:	string;
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
  invested_amount: number
  expected_amount: number;
  repayment_amount:	number;
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
  data: {}
  createdAt: Date;
  updatedAt: Date;
}

export type LoansResponse = FunctionResponse<LoanResponseData>

export type PaymentScheduleDto = {
  loan_id: number;
}
export type PaymentScheduleResponse = FunctionResponse;

