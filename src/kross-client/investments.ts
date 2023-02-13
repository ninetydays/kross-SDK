import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { useQuery, useMutation, useInfiniteQuery } from 'react-query';
import {
  InvestmentCancelDto,
  InvestmentCancelResponse,
  InvestmentListResponse,
  InvestmentRegisterDto,
  NotesResponse,
  CmsTradebookResponse,
  InvestmentRegisterResponse,
  InvestmentQueryDto,
  InvestmentsWengeQueryDto,
  InvestmentData,
} from '../types/kross-client/investments';
import jwtDecode from 'jwt-decode';
import {
  calculateAvailableInvAmount,
  getAmountSumByLoanId,
} from '../utils/getSumAmountByLoanId';
import { distributedLoanInvestments } from '../utils/distributedLoanInvestments';
export class Investments extends KrossClientBase {
  investmentList: FunctionRegistered<
    InvestmentsWengeQueryDto,
    InvestmentListResponse
  >;
  notes: FunctionRegistered<InvestmentsWengeQueryDto, NotesResponse>;
  cmsTradebook: FunctionRegistered<InvestmentQueryDto, CmsTradebookResponse>;

  constructor(options: KrossClientOptions) {
    super(options);
    this.cmsTradebook = Investments.registerFunction<
      InvestmentQueryDto,
      CmsTradebookResponse
    >({
      url: '/cms-tradebooks',
      method: 'get',
    });

    this.notes = Investments.registerFunction<
      InvestmentsWengeQueryDto,
      NotesResponse
    >({
      url: '/notes',
      method: 'get',
    });

    this.investmentList = Investments.registerFunction<
      InvestmentsWengeQueryDto,
      InvestmentListResponse
    >({
      url: '/investments',
      method: 'get',
    });
  }

  investmentRegister({ amount, loan_id }: InvestmentRegisterDto) {
    return this.instance.post<InvestmentRegisterResponse>('/investments', {
      amount,
      loan_id,
    });
  }

  investmentCancel({ investment_id }: InvestmentCancelDto) {
    return this.instance.patch<InvestmentCancelResponse>(
      `/investments/${investment_id}/cancel`,
      {
        investment_id,
      }
    );
  }

  async transactionHistory(investmentQueryDto: InvestmentQueryDto) {
    const resp = await this.cmsTradebook({
      query: {
        category: {
          in: [
            'deposit',
            'withdraw',
            'invest',
            'distribute',
            'merchant_withdraw',
            'merchant_deposit',
          ],
        },
      },
      sort_by: 'created_at.desc',
      ...investmentQueryDto,
    });
    return resp;
  }

  useInvestmentHooks() {
    return {
      investmentCancel: () => {
        const mutation = useMutation(
          (investmentCancelDto: InvestmentCancelDto) =>
            this.investmentCancel(investmentCancelDto)
        );
        return mutation;
      },
      investmentList: (investmentsWengeQueryDto: InvestmentsWengeQueryDto) => {
        return useQuery({
          queryKey: 'investmentList',
          queryFn: async () => {
            return this.investmentList(investmentsWengeQueryDto).then((res) => {
              return res.data;
            });
          },
        });
      },
      cmsTradebook: (investmentQueryDto: InvestmentQueryDto) => {
        return useQuery({
          queryKey: 'cmsTradebooks',
          queryFn: async () => {
            return this.cmsTradebook(investmentQueryDto).then((res) => {
              return res.data;
            });
          },
        });
      },
      notes: (investmentsWengeQueryDto: InvestmentsWengeQueryDto) => {
        return useQuery({
          queryKey: 'notes',
          queryFn: async () => {
            return this.notes(investmentsWengeQueryDto).then((res) => {
              return res.data;
            });
          },
        });
      },
      transactionHistory: (investmentQueryDto: InvestmentQueryDto) => {
        return useQuery('transactionHistory', async () => {
          const transactionData = await this.transactionHistory(
            investmentQueryDto
          );
          const transactionDataArray = transactionData?.data?.data
            ? Object.values(transactionData.data.data)
            : [];
          return transactionDataArray;
        });
      },
      investmentRegister: () => {
        const mutation = useMutation(
          (investmentRegisterDto: InvestmentRegisterDto) =>
            this.investmentRegister(investmentRegisterDto)
        );
        return mutation;
      },
      appliedInvestments: (
        investmentsWengeQueryDto: InvestmentsWengeQueryDto
      ) => {
        return useInfiniteQuery(
          'appliedInvestments',
          async ({ pageParam = 0 }) => {
            const skip = isNaN(
              parseInt(investmentsWengeQueryDto?.take as string, 10)
            )
              ? '0'
              : (investmentsWengeQueryDto?.take as string);
            const take = (pageParam * parseInt(skip, 10)).toString();
            const appliedInvestmentData = await this.investmentList({
              ...investmentsWengeQueryDto,
              join: 'loan',
              skip,
              take,
            });
            const appliedInvestmentArray = Object.values(
              appliedInvestmentData?.data || []
            );
            const appliedInvestmentResponse = appliedInvestmentArray.filter(
              (investment: any) => {
                if (
                  investment &&
                  investment?.state === investment?.loan?.state
                ) {
                  return investment;
                }
              }
            );
            return appliedInvestmentResponse || [];
          },
          {
            getNextPageParam: (lastPage, pages) => {
              if (lastPage.length === 0) {
                return null;
              }
              return pages?.length;
            },
          }
        );
      },
    };
  }
}
