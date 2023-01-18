import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { useQuery } from 'react-query';
import {
  LoansResponse,
  PaymentScheduleDto,
  PaymentScheduleResponse,
  LoanConfigResponse,
  LoanRepaymentResponse,
} from '../types/kross-client/loans';
export class Loans extends KrossClientBase {
  loanData: FunctionRegistered<LoansResponse>;
  loanRepayments: FunctionRegistered<LoanRepaymentResponse>;
  loanConfigs: FunctionRegistered<LoanConfigResponse>;
  constructor(options: KrossClientOptions) {
    super(options);
    this.loanConfigs = Loans.registerFunction<LoanConfigResponse>({
      url: '/loan-configs',
      method: 'get',
    });

    this.loanRepayments = Loans.registerFunction<LoanRepaymentResponse>({
      url: '/loan-repayments',
      method: 'get',
    });
    this.loanData = Loans.registerFunction<LoansResponse>({
      url: '/loans',
      method: 'get',
    });
  }

  loanPaymentSchedule({ loan_id }: PaymentScheduleDto) {
    return this.instance.patch<PaymentScheduleResponse>(`/loans/${loan_id}/payment-schedule`, {
      loan_id,
    });
  }
  useLoanHooks() {
    return {
      loanConfigs: () => {
        return useQuery({
          queryKey: 'loanConfigs',
          queryFn: async () => await this.loanConfigs(),
        });
      },
      loanRepayments: () => {
        return useQuery({
          queryKey: 'loanRepayments',
          queryFn: async () => await this.loanRepayments(),
        });
      },
      loanPaymentSchedule: (loan_id: PaymentScheduleDto) => {
        return useQuery({
          queryKey: 'loanPaymentSchedule',
          queryFn: async () => await this.loanPaymentSchedule(loan_id),
        });
      },
      loanData: () => {
        return useQuery({
          queryKey: 'loanData',
          queryFn: async () => await this.loanData(),
        });
      },
    };
  }
}
