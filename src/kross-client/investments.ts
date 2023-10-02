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
  TransactionResponse,
  tradeNotesDto,
  NotesByOwnersNameResponse,
  tradeNotesResponse,
  SoldOffNotesResponse,
  NoteTransferResponse,
} from '../types/kross-client/investments';
export class Investments extends KrossClientBase {
  investmentList: FunctionRegistered<
    InvestmentListResponse,
    InvestmentsWengeQueryDto
  >;
  notes: FunctionRegistered<NotesResponse, InvestmentsWengeQueryDto>;
  notesByOwnersName: FunctionRegistered<
    NotesByOwnersNameResponse,
    InvestmentsWengeQueryDto
  >;
  transactionLogs: FunctionRegistered<
    TransactionResponse,
    InvestmentsWengeQueryDto
  >;
  soldOffNoteList: FunctionRegistered<
    SoldOffNotesResponse,
    InvestmentsWengeQueryDto
  >;
  noteTransferLogs: FunctionRegistered<
    NoteTransferResponse,
    InvestmentsWengeQueryDto
  >;

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

    this.notesByOwnersName = Investments.registerFunction<
      NotesByOwnersNameResponse,
      InvestmentsWengeQueryDto
    >({
      url: '/notes/includes/owner-name',
      method: 'get',
    });

    this.investmentList = Investments.registerFunction<
      InvestmentListResponse,
      InvestmentsWengeQueryDto
    >({
      url: '/investments',
      method: 'get',
    });
    this.soldOffNoteList = Investments.registerFunction<
      SoldOffNotesResponse,
      InvestmentsWengeQueryDto
    >({
      url: '/users/soldoff-notes',
      method: 'get',
    });
    this.noteTransferLogs = Investments.registerFunction<
      NoteTransferResponse,
      InvestmentsWengeQueryDto
    >({
      url: '/note-transfer-logs',
      method: 'get',
    });
  }
  tradeNotes(notes: tradeNotesDto) {
    return this.instance.post<tradeNotesResponse>('/notes/trade', notes);
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
            return this.investmentList(investmentsWengeQueryDto).then(res => {
              return res.data;
            });
          },
        });
      },
      noteTransferLogs: (
        investmentsWengeQueryDto?: InvestmentsWengeQueryDto
      ) => {
        return useQuery({
          queryKey: 'noteTransferLogs',
          queryFn: async () => {
            return this.noteTransferLogs(investmentsWengeQueryDto).then(res => {
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
        cacheTime?: number,
        enabled?: boolean
      ) => {
        return useInfiniteQuery(
          ['notes', { ...investmentsWengeQueryDto }],
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
            enabled: enabled !== undefined ? enabled : true,
          }
        );
      },

      notesByOwnersName: (
        investmentsWengeQueryDto?: InvestmentsWengeQueryDto,
        cacheTime?: number,
        enabled?: boolean
      ) => {
        return useInfiniteQuery(
          ['notesByOwnersName', { ...investmentsWengeQueryDto }],
          async ({ pageParam = 0 }) => {
            const skip = (
              pageParam *
              (isNaN(parseInt(investmentsWengeQueryDto?.take as string, 10))
                ? 0
                : parseInt(investmentsWengeQueryDto?.take as string, 10))
            ).toString();
            const notesByOwnersNameData = await this.notesByOwnersName({
              ...investmentsWengeQueryDto,
              skip,
            });

            const myHeaders = new Headers(notesByOwnersNameData?.headers);
            const notesCount = myHeaders.get('x-total-count');
            const result = {
              notesByOwnersNameData: notesByOwnersNameData?.data,
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
            enabled: enabled !== undefined ? enabled : true,
          }
        );
      },

      transactionLogs: ({
        transactionQueryDto = {},
        cacheTime = 300000,
      }: {
        transactionQueryDto?: InvestmentsWengeQueryDto;
        cacheTime?: number;
      }) => {
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
            const myHeaders = new Headers(transactionData?.headers);
            const transactionsCount = myHeaders.get('x-total-count');

            const result = {
              transactions: transactionData?.data,
              notesCount: transactionsCount,
            };
            const transactionsArray = Object.values(result || []);
            return transactionsArray;
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
        enabled = true,
      }: {
        investmentsQuery?: InvestmentsWengeQueryDto;
        cacheTime?: number;
        enabled?: boolean;
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
            const data = {
              data: appliedInvestmentData?.data || [],
              count: new Headers(appliedInvestmentData?.headers).get(
                'x-total-count'
              ),
            };
            const response = Object.values(data || []);
            return response;
          },
          {
            getNextPageParam: (lastPage, pages) => {
              if (lastPage.length === 0) {
                return null;
              }
              return pages?.length;
            },
            cacheTime: cacheTime !== undefined ? cacheTime : 300000,
            enabled: enabled !== undefined ? enabled : true,
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
              kftcInvestInquiry?.data?.data?.code === 'A8151'
                ? -1
                : (kftcInvestInquiry?.data?.data?.limit || 0) -
                  (kftcInvestInquiry?.data?.data?.balance || 0);

            const kftcTotalLimit = kftcInvestInquiry?.data?.data?.limit || 0;

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
              kftcInvestmentLimit,
              kftcTotalLimit,
            };
          },
        });
      },
      tradeNotes: () => {
        const mutation = useMutation((notesDto: tradeNotesDto) =>
          this.tradeNotes(notesDto)
        );
        return mutation;
      },
      soldOffNotes: ({
        investmentsQuery = {},
        cacheTime = 300000,
        enabled = true,
      }: {
        investmentsQuery?: InvestmentsWengeQueryDto;
        cacheTime?: number;
        enabled?: boolean;
      }) => {
        return useInfiniteQuery(
          'soldOffNotes',
          async ({ pageParam = 0 }) => {
            const skip = (
              pageParam *
              (isNaN(parseInt(investmentsQuery?.take as string, 10))
                ? 0
                : parseInt(investmentsQuery?.take as string, 10))
            ).toString();
            const soldOffNote = await this.soldOffNoteList({
              ...investmentsQuery,
              skip,
            });
            const data = {
              data: soldOffNote?.data || [],
              count: new Headers(soldOffNote?.headers).get('x-total-count'),
            };
            const response = Object.values(data || []);
            return response;
          },
          {
            getNextPageParam: (lastPage, pages) => {
              if (lastPage.length === 0) {
                return null;
              }
              return pages?.length;
            },
            cacheTime: cacheTime !== undefined ? cacheTime : 300000,
            enabled: enabled !== undefined ? enabled : true,
          }
        );
      },
    };
  }
}
