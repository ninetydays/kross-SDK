import { KrossClientBase } from './base';
import { useQuery, useMutation } from 'react-query';
import { FunctionRegistered, KrossClientOptions } from '../types';
import {
  kftcBalanceResponse,
  AccountCertificateResponse,
  VirtualAccountCheckResponse,
  WelcomeUnregisterResponse,
  ReleaseDepositResponse,
  AccountResponse,
  UserResponse,
  UserAccountLogsResponse,
  UserNoteLogsResponse,
  UserQueryDto,
} from '../types/kross-client/user';
import { subMonths, isBefore, isAfter, parse } from 'date-fns';

export class User extends KrossClientBase {
  kftcBalance: FunctionRegistered<kftcBalanceResponse>;
  getVirtualAccCertificate: FunctionRegistered<AccountCertificateResponse>;
  checkVirtualAccount: FunctionRegistered<VirtualAccountCheckResponse>;
  unRegisterMemeber: FunctionRegistered<WelcomeUnregisterResponse>;
  releaseDepositControl: FunctionRegistered<ReleaseDepositResponse>;
  accountData: FunctionRegistered<UserQueryDto, AccountResponse>;
  userData: FunctionRegistered<UserQueryDto, UserResponse>;
  userAccountLogs: FunctionRegistered<UserQueryDto, UserAccountLogsResponse>;
  userNoteLogs: FunctionRegistered<UserQueryDto, UserNoteLogsResponse>;

  constructor(options: KrossClientOptions) {
    super(options);
    this.userNoteLogs = User.registerFunction<
      UserQueryDto,
      UserNoteLogsResponse
    >({
      url: '/user-note-logs',
      method: 'get',
    });

    this.userAccountLogs = User.registerFunction<
      UserQueryDto,
      UserAccountLogsResponse
    >({
      url: '/user-account-logs',
      method: 'get',
    });

    this.kftcBalance = User.registerFunction<kftcBalanceResponse>({
      url: '/users/borrower-amount',
      method: 'get',
    });

    this.getVirtualAccCertificate =
      User.registerFunction<AccountCertificateResponse>({
        url: '/users/account-certificate',
        method: 'get',
      });

    this.checkVirtualAccount =
      User.registerFunction<VirtualAccountCheckResponse>({
        url: '/users/virtual-account',
        method: 'get',
      });

    this.unRegisterMemeber = User.registerFunction<WelcomeUnregisterResponse>({
      url: '/users/welcome-unregister',
      method: 'patch',
    });

    this.releaseDepositControl = User.registerFunction<ReleaseDepositResponse>({
      url: '/users/release-deposit',
      method: 'patch',
    });

    this.accountData = User.registerFunction<UserQueryDto, AccountResponse>({
      url: '/users/account',
      method: 'get',
    });

    this.userData = User.registerFunction<UserQueryDto, UserResponse>({
      url: '/users',
      method: 'get',
    });
  }

  useUserHooks() {
    return {
      userNoteLogs: (userQueryDto: UserQueryDto) => {
        return useQuery({
          queryKey: 'userNoteLogs',
          queryFn: async () => {
            return this.userNoteLogs(userQueryDto).then((res) => {
              return res.data;
            });
          },
        });
      },
      userAccountLogs: (userQueryDto: UserQueryDto) => {
        return useQuery({
          queryKey: 'userAccountLogs',
          queryFn: async () => {
            return this.userAccountLogs(userQueryDto).then((res) => {
              return res.data;
            });
          },
        });
      },
      kftcBalance: () => {
        return useQuery({
          queryKey: 'kftcBalance',
          queryFn: async () => {
            return this.kftcBalance().then((res) => {
              return res.data;
            });
          },
        });
      },
      getVirtualAccCertificate: () => {
        return useQuery({
          queryKey: 'getVirtualAccCertificate',
          queryFn: async () => {
            return this.getVirtualAccCertificate().then((res) => {
              return res.data;
            });
          },
        });
      },
      checkVirtualAccount: () => {
        return useQuery({
          queryKey: 'checkVirtualAccount',
          queryFn: async () => {
            return this.checkVirtualAccount().then((res) => {
              return res.data;
            });
          },
        });
      },
      unRegisterMemeber: () => {
        const mutation = useMutation(() => this.unRegisterMemeber());
        return mutation;
      },
      releaseDepositControl: () => {
        const mutation = useMutation(() => this.releaseDepositControl());
        return mutation;
      },
      accountData: (userQueryDto: UserQueryDto) => {
        return useQuery({
          queryKey: 'accountData',
          queryFn: async () => {
            return this.accountData(userQueryDto).then((res) => {
              return res.data;
            });
          },
        });
      },
      userData: (userQueryDto: UserQueryDto) => {
        return useQuery({
          queryKey: 'userData',
          queryFn: async () => {
            return this.userData(userQueryDto).then((res) => {
              return res.data;
            });
          },
        });
      },

      myPageData: () => {
        return useQuery({
          queryKey: 'myPageData',
          queryFn: async () => {
            const { data: accountData = [] }: any = await this.accountData({});
            const { data: investmentsAppliedToData = [] }: any = await this.get(
              '/investments',
              {
                params: {
                  order: 'id.asc',
                  select: 'id,amount',
                  filter: 'state||$in||funding,funded,pending',
                },
              }
            );

            const { data: notesSummaryData = [] }: any = await this.get(
              '/notes/summary'
            );

            const { data: repaymentsScheduledData = [] }: any = await this.get(
              '/notes',
              {
                params: {
                  where: {
                    state: 'investing',
                  },
                },
              }
            );

            const { data: repaymentsDoneData = [] }: any = await this.get(
              '/notes',
              {
                params: {
                  where: {
                    state: 'done',
                  },
                  include: {
                    model: 'loans',
                    attributes: ['id'],
                  },
                },
              }
            );

            const amountInAccount = accountData?.data?.amount || 0;

            // Assets and cummulative return content

            const delayNotesSummary = notesSummaryData?.find(
              (notesObject: any) => {
                return notesObject.state === 'delay';
              }
            );

            const investingNotesSumary = notesSummaryData?.find(
              (notesObject: any) => {
                return notesObject.state === 'investing';
              }
            );

            const doneNotesSummary = notesSummaryData?.find(
              (notesObject: any) => {
                return notesObject.state === 'done';
              }
            );

            const totalAssetAmount =
              amountInAccount +
              (investingNotesSumary?.origin_principal ||
                0 - investingNotesSumary?.principal ||
                0) +
              (delayNotesSummary?.origin_principal ||
                0 - delayNotesSummary?.principal ||
                0);
            const cummulativeReturnOnInvestment =
              (doneNotesSummary.interest || 0) -
              (doneNotesSummary.tax_amount || 0) -
              (doneNotesSummary.fee_amount || 0);

            // Investment Applied To content
            const investmentAppliedCount =
              investmentsAppliedToData?.data?.length || 0;
            const investmentAppliedToAmount = investmentsAppliedToData?.data
              ? investmentsAppliedToData?.data?.reduce(
                  (acc: number, cur: { amount: number }) => acc + cur.amount,
                  0
                )
              : 0;

            // Repayment Scheduled content
            const repaymentScheduledCount =
              repaymentsScheduledData?.data?.length || 0;
            const repaymentScheduledRate = repaymentsScheduledData?.data
              ? (
                  repaymentsScheduledData?.data?.reduce(
                    (acc: number, cur: { rate: number }) =>
                      acc + cur.rate * 100,
                    0
                  ) / repaymentScheduledCount
                ).toFixed(2)
              : 0;

            // Repayment Done content
            const repaymentDoneCount = repaymentsDoneData?.data?.length || 0;
            const repaymentDoneAmount = repaymentsDoneData?.data
              ? repaymentsDoneData?.data?.reduce(
                  (acc: number, cur: { returned_amount: number }) =>
                    acc + cur.returned_amount,
                  0
                )
              : 0;

            // Repayment Done LastMonth content
            const currentDate = new Date();
            const lastMonth = subMonths(currentDate, 1);
            const repaymentDoneLastMonthData = repaymentsDoneData?.data
              ? repaymentsDoneData?.data?.filter(
                  (note: { doneAt: any }) =>
                    !isBefore(
                      parse(
                        note.doneAt,
                        "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
                        new Date()
                      ),
                      lastMonth
                    ) &&
                    !isAfter(
                      parse(
                        note.doneAt,
                        "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
                        new Date()
                      ),
                      currentDate
                    )
                )
              : [];

            const repaymentDoneLastMonthAmount =
              repaymentDoneLastMonthData.length !== 0
                ? repaymentDoneLastMonthData.reduce(
                    (acc: number, cur: { interest: number }) =>
                      acc + cur.interest,
                    0
                  )
                : 0;
            const repaymentDoneLastMonthRate =
              repaymentDoneLastMonthData.length !== 0
                ? (
                    repaymentDoneLastMonthData.reduce(
                      (acc: number, cur: { rate: number }) =>
                        acc + cur.rate * 100,
                      0
                    ) / repaymentDoneLastMonthData.length
                  ).toFixed(2)
                : 0;

            return {
              amountInAccount,
              investmentAppliedCount,
              investmentAppliedToAmount,
              repaymentScheduledCount,
              repaymentScheduledRate,
              repaymentDoneCount,
              repaymentDoneAmount,
              totalAssetAmount,
              cummulativeReturnOnInvestment,
              repaymentDoneLastMonthAmount,
              repaymentDoneLastMonthRate,
            };
          },
        });
      },
    };
  }
}
