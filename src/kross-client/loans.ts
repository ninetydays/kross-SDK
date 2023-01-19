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
    return this.instance.patch<PaymentScheduleResponse>(
      `/loans/${loan_id}/payment-schedule`,
      {
        loan_id,
      }
    );
  }
  useLoanHooks() {
    return {
      loanConfigs: (loansQueryDto: LoansQueryDto) => {
        return useQuery({
          queryKey: 'loanConfigs',
          queryFn: async () => await this.loanConfigs(loansQueryDto),
        });
      },
      loanRepayments: (loansQueryDto: LoansQueryDto) => {
        return useQuery({
          queryKey: 'loanRepayments',
          queryFn: async () => await this.loanRepayments(loansQueryDto),
        });
      },
      loanPaymentSchedule: (loan_id: PaymentScheduleDto) => {
        return useQuery({
          queryKey: 'loanPaymentSchedule',
          queryFn: async () => await this.loanPaymentSchedule(loan_id),
        });
      },
      loanData: (loansQueryDto: LoansQueryDto) => {
        return useQuery({
          queryKey: 'loanData',
          queryFn: async () => await this.loanData(loansQueryDto),
        });
      },
    };
  }
}
