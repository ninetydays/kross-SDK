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
  loanPaymentSchedule: FunctionRegistered<
    PaymentScheduleDto,
    PaymentScheduleResponse
  >;
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

    this.loanPaymentSchedule = Loans.registerFunction<
      PaymentScheduleDto,
      PaymentScheduleResponse
    >({
      url: `/loans/:loan_id/payment-schedule`,
      urlParam: 'loan_id',
      method: 'get',
    });
  }
  useLoanHooks() {
    return {
      loanConfigs: () => {
        return useQuery({
          queryKey: 'loanConfigs',
          queryFn: async () => this.loanConfigs.bind(this),
        });
      },
      loanRepayments: () => {
        return useQuery({
          queryKey: 'loanRepayments',
          queryFn: async () => this.loanRepayments.bind(this),
        });
      },
      loanPaymentSchedule: () => {
        return useQuery({
          queryKey: 'loanPaymentSchedule',
          queryFn: async () => this.loanPaymentSchedule.bind(this),
        });
      },
      loanData: () => {
        return useQuery({
          queryKey: 'loanData',
          queryFn: async () => this.loanData.bind(this),
        });
      },
    };
  }
}
