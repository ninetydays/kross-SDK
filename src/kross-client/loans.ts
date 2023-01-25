import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { useQuery } from 'react-query';
import {
  LoansResponse,
  PaymentScheduleDto,
  PaymentScheduleResponse,
  LoanConfigResponse,
  LoanRepaymentResponse,
  LoansQueryDto,
} from '../types/kross-client/loans';
export class Loans extends KrossClientBase {
  loanData: FunctionRegistered<LoansQueryDto, LoansResponse>;
  loanRepayments: FunctionRegistered<LoansQueryDto, LoanRepaymentResponse>;
  loanConfigs: FunctionRegistered<LoansQueryDto, LoanConfigResponse>;
  constructor(options: KrossClientOptions) {
    super(options);
    this.loanConfigs = Loans.registerFunction<
      LoansQueryDto,
      LoanConfigResponse
    >({
      url: '/loan-configs',
      method: 'get',
    });

    this.loanRepayments = Loans.registerFunction<
      LoansQueryDto,
      LoanRepaymentResponse
    >({
      url: '/loan-repayments',
      method: 'get',
    });
    this.loanData = Loans.registerFunction<LoansQueryDto, LoansResponse>({
      url: '/loans',
      method: 'get',
    });
  }

  loanPaymentSchedule({ loan_id }: PaymentScheduleDto) {
    return this.instance.get<PaymentScheduleResponse>(
      `/loans/${loan_id}/payment-schedule`
    );
  }

  async recentFundingItem() {
    const recentProduct = await this.loanData({
      fields:
        'id,name,fund_amount,payment_date,due_date,category,interest_rate,investor_fee_rate,state',
      sort_by: 'id.desc',
      query: {
        state: 'funding',
      },
      limit: '3',
    });

    return recentProduct;
  }
  useLoanHooks() {
    return {
      loanConfigs: (loansQueryDto: LoansQueryDto) => {
        return useQuery({
          queryKey: 'loanConfigs',
          queryFn: async () => this.loanConfigs(loansQueryDto).then((res) => res.data),
        }).refetch();
      },
      loanRepayments: (loansQueryDto: LoansQueryDto) => {
        return useQuery({
          queryKey: 'loanRepayments',
          queryFn: async () => this.loanRepayments(loansQueryDto).then((res) => res.data),
        }).refetch();
      },
      loanPaymentSchedule: (loan_id: PaymentScheduleDto) => {
        return useQuery({
          queryKey: 'loanPaymentSchedule',
          queryFn: async () => this.loanPaymentSchedule(loan_id).then((res) => res.data),
        }).refetch();
      },
      loanData: (loansQueryDto: LoansQueryDto) => {
        return useQuery({
          queryKey: 'loanData',
          queryFn: async () => this.loanData(loansQueryDto).then((res) => res.data),
          keepPreviousData: true,
        }).refetch();
      },
      recentFundingItem: () => {
        return useQuery({
          queryKey: 'recentFundingItem',
          queryFn: async () => this.recentFundingItem().then((res) => res.data),
        }).refetch();
      },
    };
  }
}
