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
  TransactionQueryDto,
} from '../types/kross-client/investments';
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

  async transactionHistory(transactionQueryDto: TransactionQueryDto) {
    const {include, ...rest} = transactionQueryDto;
    const paramInclude = include !== 'all'
      ? [include]
      : [
          'deposit',
          'withdraw',
          'invest',
          'distribute',
          'merchant_withdraw',
          'merchant_deposit',
        ];
    const resp = await this.cmsTradebook({
      query: {
        category: {
          in: paramInclude,
        },
      },
      sort_by: 'created_at.desc',
      ...rest,
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
        return useInfiniteQuery(
          'notes',
          async ({ pageParam = 0 }) => {
            const skip = (
              pageParam *
              (isNaN(parseInt(investmentsWengeQueryDto?.take as string, 10))
                ? 0
                : parseInt(investmentsWengeQueryDto?.take as string, 10))
            ).toString();
            const notesData = await this.notes({
              ...investmentsWengeQueryDto,
              skip,
            });
            const notesArray = Object.values(
              notesData?.data || []
            );
            return notesArray;
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
      transactionHistory: (transactionQueryDto: TransactionQueryDto) => {
        return useInfiniteQuery(
          'transactionHistory',
          async ({ pageParam = 0 }) => {
            const transactionData = await this.transactionHistory({
              ...transactionQueryDto,
              offset: pageParam.toString(),
            });
            const transactionDataArray = transactionData?.data?.data
              ? Object.values(transactionData.data.data)
              : [];
            return transactionDataArray;
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
            const skip = (
              pageParam *
              (isNaN(parseInt(investmentsWengeQueryDto?.take as string, 10))
                ? 0
                : parseInt(investmentsWengeQueryDto?.take as string, 10))
            ).toString();
            const appliedInvestmentData = await this.investmentList({
              ...investmentsWengeQueryDto,
              join: 'loan',
              skip,
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
      investmentLimit: ({ enabled = false }: { enabled?: boolean }) => {
        return useQuery({
          cacheTime: 0,
          enabled: enabled ? enabled : false,
          queryKey: 'invesmentLimit',
          queryFn: async () => {
            const kftcInvestInquiry: any = await this.get(
              '/kftc/invest-inquiry'
            );
            const accountData: any = await this.get('/users/account');

            const kftcInvestmentLimit =
              (kftcInvestInquiry?.data?.data?.limit || 0) -
              (kftcInvestInquiry?.data?.data?.balance || 0);
            const availableAmountToWithdrawInAccount =
              accountData?.data?.data?.available_withdraw_amount || 0;
            const investmentAmountLimit = Math.min(
              kftcInvestmentLimit,
              availableAmountToWithdrawInAccount
            );

            return {
              investmentAmountLimit,
            };
          },
        });
      },
    };
  }
}
