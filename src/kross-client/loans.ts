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
import { parseJwt } from '../utils/encryptor';
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
            const authToken = this.authToken || '';
            const userData = await parseJwt(authToken as string);
            const skip = (
              pageParam * parseInt(loansQueryDto?.take as string, 10) || 0
            ).toString();
            const loan = await this.loanData({
              ...loansQueryDto,
              join: 'investments',
              skip,
            });
            const loansArray = Object.values(loan?.data);
            const loansResponseArray = await loansArray.map(
              (item: any): LoansResponse => {
                if (userData?.user_id) {
                  const investment = item.investments.find(
                    (invItem: any) => invItem?.userId == userData.user_id
                  );
                  return {
                    ...item,
                    isUserInvested: investment ? true : false,
                    investmentId: investment ? investment.id : null,
                    userInvestedAmount: investment ? investment.amount : 0,
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
              return pages?.length >= 1 ? pages.length : null;
            },
          }
        );
      },
    };
  }
}
