import {
  LoanDetailQueryDto,
  LoanDetailResponse,
  LoansDistributionsQueryDto,
  LoanDistributionsResponseData,
} from './../types/kross-client/loans';
import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { useInfiniteQuery, useQuery } from 'react-query';
import {
  LoansResponse,
  PaymentScheduleResponse,
  LoanConfigResponse,
  LoanRepaymentResponse,
  LoansQueryDto,
  LoanResponseData,
  LoanRepaymentPendingResponse,
} from '../types/kross-client/loans';
export class Loans extends KrossClientBase {
  loanData: FunctionRegistered<LoansResponse, LoansQueryDto>;
  loanRepayments: FunctionRegistered<LoanRepaymentResponse, LoansQueryDto>;
  loanRepaymentsPending: FunctionRegistered<LoanRepaymentPendingResponse>;
  loanConfigs: FunctionRegistered<LoanConfigResponse, LoansQueryDto>;
  loanDetail: FunctionRegistered<LoanDetailResponse, LoanDetailQueryDto>;
  loanDistributions: FunctionRegistered<
    LoanDistributionsResponseData,
    LoansDistributionsQueryDto
  >;
  constructor(options: KrossClientOptions) {
    super(options);
    this.loanConfigs = Loans.registerFunction<
      LoanConfigResponse,
      LoansQueryDto
    >({
      url: '/loan-configs',
      method: 'get',
    });

    this.loanRepayments = Loans.registerFunction<
      LoanRepaymentResponse,
      LoansQueryDto
    >({
      url: '/loan-repayments',
      method: 'get',
    });
    this.loanData = Loans.registerFunction<LoansResponse, LoansQueryDto>({
      url: '/loans',
      method: 'get',
    });
    this.loanRepaymentsPending =
      Loans.registerFunction<LoanRepaymentPendingResponse>({
        url: '/loan-repayments/pending',
        method: 'get',
      });
    this.loanDetail = Loans.registerFunction<
      LoanDetailResponse,
      LoanDetailQueryDto
    >({
      url: '/loan-detail',
      method: 'get',
    });
    this.loanDistributions = Loans.registerFunction<
      LoanDistributionsResponseData,
      LoansDistributionsQueryDto
    >({
      url: '/loan-distributions',
      method: 'get',
    });
  }

  loanPaymentSchedule(loanId: number) {
    return this.instance.get<PaymentScheduleResponse>(
      `/loans/${loanId}/payment-schedule`
    );
  }

  loanDetails(loanDetailId: number) {
    return this.instance.get<LoanDetailResponse>(
      `/loan-detail/${loanDetailId}`
    );
  }
  useLoanHooks() {
    return {
      loanConfigs: (loansQueryDto?: LoansQueryDto) => {
        return useQuery('loanConfigs', async () => {
          return this.loanConfigs(loansQueryDto).then(res => {
            return res.data;
          });
        });
      },
      loanRepayments: (loansQueryDto?: LoansQueryDto) => {
        return useQuery('loanRepayments', async () => {
          return this.loanRepayments(loansQueryDto).then(res => {
            return res.data;
          });
        });
      },
      loanPaymentSchedule: (loanId: number) => {
        return useQuery('loanPaymentSchedule', async () => {
          return this.loanPaymentSchedule(loanId).then(res => {
            return res.data;
          });
        });
      },
      loanRepaymentsPending: () => {
        return useQuery('loanRepaymentsPending', async () => {
          return this.loanRepaymentsPending().then(res => {
            return res.data;
          });
        });
      },
      loanData: (loansQueryDto?: LoansQueryDto, enabled?: boolean) => {
        return useInfiniteQuery(
          [
            'loanData',
            {
              ...loansQueryDto,
            },
          ],
          async ({ pageParam = 0 }) => {
            const skip = (
              pageParam *
              (isNaN(parseInt(loansQueryDto?.take as string, 10))
                ? 0
                : parseInt(loansQueryDto?.take as string, 10))
            ).toString();
            const loan = await this.loanData({
              ...loansQueryDto,
              skip,
            });
            const loansArray = Object.values(loan?.data);
            const loansResponseArray = loansArray.map(
              (item: any): LoanResponseData => {
                if (item.investments.length > 0) {
                  const investment = item.investments[0];
                  return {
                    ...item,
                    isUserInvested: true,
                    investmentId: investment.id,
                    userInvestedAmount: investment.amount,
                  };
                }
                return {
                  ...item,
                  isUserInvested: false,
                  userInvestedAmount: 0,
                  investmentId: null,
                };
              }
            );
            return loansResponseArray || [];
          },
          {
            getNextPageParam: (lastPage, pages) => {
              if (lastPage.length === 0) {
                return null;
              }
              return pages?.length;
            },
            enabled: enabled !== undefined ? enabled : true,
          }
        );
      },
      loanDetail: (loanDetailId: string, enabled?: boolean) => {
        return useQuery(
          'loanDetail',
          async () => {
            return this.loanDetail({ id: loanDetailId }).then(res => {
              return res.data;
            });
          },
          {
            enabled: enabled !== undefined ? enabled : true,
          }
        );
      },
      loanDistributions: (
        LoansDistributionsQueryDto?: LoansDistributionsQueryDto
      ) => {
        return useQuery('loanConfigs', async () => {
          return this.loanDistributions(LoansDistributionsQueryDto).then(
            res => {
              return res.data;
            }
          );
        });
      },
      loanDetails: (loanDetailId: number, enabled?: boolean) => {
        return useQuery(
          'loanDetails',
          async () => {
            return this.loanDetails(loanDetailId).then(res => {
              return res.data;
            });
          },
          {
            enabled: enabled !== undefined ? enabled : true,
          }
        );
      },
    };
  }
}
