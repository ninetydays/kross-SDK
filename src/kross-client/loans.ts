import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { useInfiniteQuery, useQuery } from 'react-query';
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
      select:
        'id,name,fund_amount,payment_date,due_date,category,interest_rate,investor_fee_rate,state',
      order: 'id.desc',
      filter: 'id||$eq||funding',
      take: '3',
    });

    return recentProduct;
  }
  useLoanHooks() {
    return {
      loanConfigs: (loansQueryDto: LoansQueryDto) => {
        return useQuery('loanConfigs', async () => {
          return this.loanConfigs(loansQueryDto).then((res) => {
            return res.data;
          });
        });
      },
      loanRepayments: (loansQueryDto: LoansQueryDto) => {
        return useQuery('loanRepayments', async () => {
          return this.loanRepayments(loansQueryDto).then((res) => {
            return res.data;
          });
        });
      },
      loanPaymentSchedule: (loan_id: PaymentScheduleDto) => {
        return useQuery('loanPaymentSchedule', async () => {
          return this.loanPaymentSchedule(loan_id).then((res) => {
            return res.data;
          });
        });
      },
      loanData: (loansQueryDto: LoansQueryDto) => {
        return useInfiniteQuery(
          'loanData',
          async ({ pageParam = 0 }) => {
            return this.loanData({
              ...loansQueryDto,
              offset: pageParam,
            }).then((res) => {
              return res.data?.data;
            });
          },
          {
            getNextPageParam: (lastPage, pages) => {
              return pages?.length > 1 ? pages.length + 1 : null;
            },
          }
        );
      },
      recentFundingItem: () => {
        return useQuery('recentFundingItem', async () => {
          return this.recentFundingItem().then((res) => {
            return res.data;
          });
        });
      },
    };
  }
}
