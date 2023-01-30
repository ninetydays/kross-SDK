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
  LoanDto
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

  async loans(data: LoanDto) {
    const { user_id } = data;
    console.log("user: ", user_id);
    const loan = await this.loanData({
      order: 'id.desc',
      filter: 'state||$eq||funding||pending',
      join: 'investments',
    });
    const loanArr = Object.values(loan?.data);
    const zip = loanArr.map((item: any): LoansResponse => {
      if (user_id) {
        const inv = item.investments.find((invItem: any) => invItem?.userId == user_id);
        return {
          ...item,
          is_user_invest: inv ? true : false,
          investment_id: inv ? inv.id : null,
          user_inv_amount: inv ? inv.amount : 0,
        };
      }
      return {
        ...item,
        is_user_invest: false,
        user_inv_amount: 0,
        investment_id: null,
      };
    });
    return {
      data: zip || [],
    };
}
  useLoanHooks() {
    return {
      loans: (data: LoanDto) => {
        return useInfiniteQuery(
          'loans',
          async () => {
            return this.loans(data).then((res) => {
              return res.data;
            });
          },
        );
      },
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
              skip: pageParam.toString(),
            }).then((res) => {
              return res.data;
            });
          },
          {
            getNextPageParam: (lastPage, pages) => {
              return pages?.length > 1 ? pages.length + 1 : null;
            },
          }
        );
      },
    };
  }
}
