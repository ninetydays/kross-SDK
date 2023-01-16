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
  loanData: FunctionRegistered<LoansResponse>
  loanPaymentSchedule: FunctionRegistered<PaymentScheduleDto, PaymentScheduleResponse>
  loanRepayments: FunctionRegistered<LoanRepaymentResponse>
  loanConfigs: FunctionRegistered<LoanConfigResponse>
  constructor(options: KrossClientOptions) {
    super(options);
    this.loanConfigs = Loans.registerFunction<LoanConfigResponse>({
      url: '/loan-configs',
      method: 'get',
    })

    this.loanRepayments = Loans.registerFunction<LoanRepaymentResponse>({
      url: '/loan-repayments',
      method: 'get',
    })
    this.loanData = Loans.registerFunction<LoansResponse>({
      url: '/loans',
      method: 'get'
    })

    this.loanPaymentSchedule = Loans.registerFunction<PaymentScheduleDto, PaymentScheduleResponse>({
      url: `/loans/payment-schedule`,
      method: 'get',
    })
  }
  useLoanHooks() {
    return {
      loanConfigs: () => {
        return useQuery('loanConfigs', () => this.loanConfigs)
      },
      loanRepayments: () => {
        return useQuery('loanRepayments', () => this.loanRepayments)
      },
      loanPaymentSchedule: () => {
        return useQuery('loanPaymentSchedule', () => this.loanPaymentSchedule)
      },
      loanData: () => {
        return useQuery('loansData', () => this.loanData)
      }

    };
  };
}
