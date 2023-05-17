import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { useQuery, useMutation, useInfiniteQuery } from 'react-query';
import {
  InvestmentCancelResponse,
  InvestmentListResponse,
  InvestmentRegisterDto,
  NotesResponse,
  InvestmentRegisterResponse,
  InvestmentsWengeQueryDto,
  TransactionResponse
} from '../types/kross-client/investments';
import { sk } from 'date-fns/locale';
export class Investments extends KrossClientBase {
  investmentList: FunctionRegistered<
    InvestmentListResponse,
    InvestmentsWengeQueryDto
  >;
  notes: FunctionRegistered<NotesResponse, InvestmentsWengeQueryDto>;
  transactionLogs: FunctionRegistered<TransactionResponse, InvestmentsWengeQueryDto>;

  constructor(options: KrossClientOptions) {
    super(options);
    this.transactionLogs = Investments.registerFunction<
      TransactionResponse,
      InvestmentsWengeQueryDto
    >({
      url: '/transaction-logs',
      method: 'get',
    });

    this.notes = Investments.registerFunction<
      NotesResponse,
      InvestmentsWengeQueryDto
    >({
      url: '/notes',
      method: 'get',
    });

    this.investmentList = Investments.registerFunction<
      InvestmentListResponse,
      InvestmentsWengeQueryDto
    >({
      url: '/investments',
      method: 'get',
    });
  }

  investmentRegister(investments: InvestmentRegisterDto[]) {
    return this.instance.post<InvestmentRegisterResponse>(
      '/investments',
      investments
    );
  }

  investmentCancel(investmentId: number) {
    return this.instance.patch<InvestmentCancelResponse>(
      `/investments/${investmentId}/cancel`,
      {
        investment_id: investmentId,
      }
    );
  }

  useInvestmentHooks() {
    return {
      investmentCancel: () => {
        const mutation = useMutation((investmentId: number) =>
          this.investmentCancel(investmentId)
        );
        return mutation;
      },
      investmentList: (investmentsWengeQueryDto?: InvestmentsWengeQueryDto) => {
        return useQuery({
          queryKey: 'investmentList',
          queryFn: async () => {
            return this.investmentList(investmentsWengeQueryDto).then((res) => {
              return res.data;
            });
          },
        });
      },
      returnOnInvestments: (startDate: string, endDate: string) => {
        return useQuery({
          queryKey: 'returnOnInvestments',
          queryFn: async () => {
            const returnOnInvestmentData: any = await this.get(
              `/investments/roi?startDate=${startDate}&endDate=${endDate}`
            );
            return returnOnInvestmentData?.data;
          },
        });
      },
      notes: (
        investmentsWengeQueryDto?: InvestmentsWengeQueryDto,
        cacheTime?: number
      ) => {
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

            const myHeaders = new Headers(notesData?.headers);
            const notesCount = myHeaders.get('x-total-count');
            const result = {
              notes: notesData?.data,
              notesCount: notesCount,
            };
            const notesArray = Object.values(result || []);
            return notesArray;
          },
          {
            getNextPageParam: (lastPage, pages) => {
              if (lastPage.length === 0) {
                return null;
              }
              return pages?.length;
            },
            cacheTime: cacheTime !== undefined ? cacheTime : 300000,
          }
        );
      },
      transactionLogs: (transactionQueryDto: InvestmentsWengeQueryDto) => {
        return useInfiniteQuery(
          'transactionLogs',
          async ({ pageParam = 0 }) => {
            const skip = (
              pageParam *
              (isNaN(parseInt(transactionQueryDto?.take as string, 10))
                ? 0
                : parseInt(transactionQueryDto?.take as string, 10))
            ).toString();
            const { select, ...rest } = transactionQueryDto;
            const paramInclude =
              select !== 'all'
                ? select
                : 'deposit,withdraw,invest,distribute,merchant_withdraw,merchant_deposit';
            const transactionData = await this.transactionLogs({
              filter: `category||$in||${paramInclude}`,
              skip,
              ...rest,
            });
            const transactionDataArray = transactionData?.data
              ? Object.values(transactionData.data)
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
            cacheTime: 0,
            staleTime: 0,
          }
        );
      },
      investmentRegister: () => {
        const mutation = useMutation(
          (investmentRegisterDto: InvestmentRegisterDto[]) =>
            this.investmentRegister(investmentRegisterDto)
        );
        return mutation;
      },
      appliedInvestments: ({
        investmentsQuery = {},
        cacheTime = 300000,
      }: {
        investmentsQuery?: InvestmentsWengeQueryDto;
        cacheTime?: number;
      }) => {
        return useInfiniteQuery(
          'appliedInvestments',
          async ({ pageParam = 0 }) => {
            const skip = (
              pageParam *
              (isNaN(parseInt(investmentsQuery?.take as string, 10))
                ? 0
                : parseInt(investmentsQuery?.take as string, 10))
            ).toString();
            const appliedInvestmentData = await this.investmentList({
              ...investmentsQuery,
              join: 'loan',
              skip,
            });
            return appliedInvestmentData?.data || [];
          },
          {
            getNextPageParam: (lastPage, pages) => {
              if (lastPage.length === 0) {
                return null;
              }
              return pages?.length;
            },
            cacheTime: cacheTime !== undefined ? cacheTime : 300000,
          }
        );
      },
      investmentLimit: (enabled?: boolean) => {
        return useQuery({
          cacheTime: 0,
          enabled: enabled !== undefined ? enabled : true,
          queryKey: 'invesmentLimit',
          queryFn: async () => {
            const kftcInvestInquiry: any = await this.get(
              '/kftc/invest-inquiry'
            );
            const accountData: any = await this.get('/users/account');

            const kftcInvestmentLimit =
              kftcInvestInquiry?.data?.code === 'A8151'
                ? -1
                : (kftcInvestInquiry?.data?.data?.limit || 0) -
                  (kftcInvestInquiry?.data?.data?.balance || 0);

            const availableAmountToWithdrawInAccount =
              accountData?.data?.data?.available_withdraw_amount || 0;

            const investmentAmountLimit = Math.min(
              availableAmountToWithdrawInAccount,
              kftcInvestmentLimit < 0
                ? availableAmountToWithdrawInAccount
                : kftcInvestmentLimit
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
