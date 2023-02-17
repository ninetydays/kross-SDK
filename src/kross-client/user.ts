import { sumByKey } from './../utils/sumByKey';
import { KrossClientBase } from './base';
import { useQuery, useMutation } from 'react-query';
import {
  FunctionRegistered,
  GetAuthTokenResponse,
  KrossClientOptions,
  UserRegisterDto,
} from '../types';
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
  TotalAssetsType,
  UserWengeQueryDto,
} from '../types/kross-client/user';
import {
  subMonths,
  isBefore,
  isAfter,
  parse,
  differenceInCalendarDays,
} from 'date-fns';
import {growthCalculator} from '../utils/growthCalculator'

export class User extends KrossClientBase {
  kftcBalance: FunctionRegistered<kftcBalanceResponse>;
  getVirtualAccCertificate: FunctionRegistered<AccountCertificateResponse>;
  checkVirtualAccount: FunctionRegistered<VirtualAccountCheckResponse>;
  registerMember: FunctionRegistered<UserRegisterDto, GetAuthTokenResponse>;
  unRegisterMemeber: FunctionRegistered<WelcomeUnregisterResponse>;
  releaseDepositControl: FunctionRegistered<ReleaseDepositResponse>;
  accountData: FunctionRegistered<UserQueryDto, AccountResponse>;
  userData: FunctionRegistered<UserQueryDto, UserResponse>;
  userAccountLogs: FunctionRegistered<UserWengeQueryDto, UserAccountLogsResponse>;
  userNoteLogs: FunctionRegistered<UserWengeQueryDto, UserNoteLogsResponse>;

  constructor(options: KrossClientOptions) {
    super(options);
    this.userNoteLogs = User.registerFunction<
    UserWengeQueryDto,
      UserNoteLogsResponse
    >({
      url: '/user-note-logs',
      method: 'get',
    });

    this.userAccountLogs = User.registerFunction<
      UserWengeQueryDto,
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

    this.registerMember = User.registerFunction<
      UserRegisterDto,
      GetAuthTokenResponse
    >({
      url: '/users',
      method: 'post',
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
      userNoteLogs: (userWengeQueryDto: UserWengeQueryDto) => {
        return useQuery({
          queryKey: 'userNoteLogs',
          queryFn: async () => {
            return this.userNoteLogs(userWengeQueryDto).then((res) => {
              return res.data;
            });
          },
        });
      },
      userAccountLogs: (userWengeQueryDto: UserWengeQueryDto) => {
        return useQuery({
          queryKey: 'userAccountLogs',
          queryFn: async () => {
            return this.userAccountLogs(userWengeQueryDto).then((res) => {
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
      userData: (userQueryDto: UserQueryDto, enabled?: boolean) => {
        return useQuery({
          queryKey: 'userData',
          queryFn: async () => {
            return this.userData(userQueryDto).then((res) => {
              return res.data;
            });
          },
          enabled: enabled === undefined ? true : enabled,
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
                  select: 'id,amount,state',
                  filter: 'state||$eq||funding'
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
                  filter: 'state||$eq||investing',
                },
              }
            );

            const { data: repaymentsDoneData = [] }: any = await this.get(
              '/notes',
              {
                params: {
                  filter: 'state||$eq||done',
                  join: 'loan'
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
              (investingNotesSumary?.originPrincipal ||
                0 - investingNotesSumary?.principal ||
                0) +
              (delayNotesSummary?.originPrincipal ||
                0 - delayNotesSummary?.principal ||
                0);
            const cummulativeReturnOnInvestment =
              (doneNotesSummary?.interest || 0) -
              (doneNotesSummary?.taxAmount || 0) -
              (doneNotesSummary?.feeAmount || 0);

            // Investment Applied To content
            const investmentAppliedCount =
              investmentsAppliedToData?.length || 0;
            const investmentAppliedToAmount =
              investmentsAppliedToData?.length !== 0
                ? investmentsAppliedToData?.reduce(
                    (acc: number, cur: { amount: number }) => acc + cur.amount,
                    0
                  )
                : 0;

            // Repayment Scheduled content
            const repaymentScheduledCount =
              repaymentsScheduledData?.length || 0;
            const repaymentScheduledRate = repaymentsScheduledData
              ? (
                  repaymentsScheduledData?.reduce(
                    (acc: number, cur: { rate: number }) =>
                      acc + cur.rate * 100,
                    0
                  ) / (repaymentScheduledCount || 1)
                ).toFixed(2)
              : 0;
            const repaymentScheduledAmount = repaymentsScheduledData
              ? repaymentsScheduledData?.reduce(
                  (acc: number, cur: { returnedAmount: number }) =>
                    acc + cur.returnedAmount,
                  0
                )
              : 0;
            // Repayment Done content
            const repaymentDoneCount = repaymentsDoneData?.length || 0;
            const repaymentDoneAmount = repaymentsDoneData
              ? repaymentsDoneData?.reduce(
                  (acc: number, cur: { returnedAmount: number }) =>
                    acc + cur.returnedAmount,
                  0
                )
              : 0;

            // Repayment Done LastMonth content
            const currentDate = new Date();
            const lastMonth = subMonths(currentDate, 1);
            const repaymentDoneLastMonthData = repaymentsDoneData
              ? repaymentsDoneData?.filter(
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
              repaymentScheduledAmount,
              totalAssetAmount,
              cummulativeReturnOnInvestment,
              repaymentDoneLastMonthAmount,
              repaymentDoneLastMonthRate,
            };
          },
        });
      },
      totalAssets: () => {
        return useQuery('totalAssets', async () => {
          const accountLogs = await this.userAccountLogs({});
          const noteLogs = await this.userNoteLogs({});
          const accountLogsArray = Array.isArray(accountLogs?.data) ? accountLogs.data : [];
          const noteLogsArray = Array.isArray(noteLogs?.data) ? noteLogs.data : [];
          const totalAssets: TotalAssetsType = {};
          for (const accountLog of accountLogsArray) {
            totalAssets[accountLog.saveDate] = {
              totalAssets: parseInt(accountLog.amount, 10),
            };
          }
          for (const noteLog of noteLogsArray) {
            if (totalAssets[noteLog.saveDate]) {
              totalAssets[noteLog.saveDate].totalAssets +=
                parseInt(noteLog.remainPrincipal, 10);
            }
          }
          const totalAssetsArray = Object.entries(totalAssets).sort();
          
          const growthRate = growthCalculator(totalAssetsArray);
          return {
            data: totalAssetsArray,
            growthRatePercentage: growthRate,
          };
        });
      },

      returnOnInvestmentData: (startDate: unknown, endDate: unknown) => {
        return useQuery({
          queryKey: 'returnOnInvestment',
          queryFn: async () => {
            const { data: notesData = [] }: any = await this.get('/notes', {
              params: {
                query: {
                  state: ['done'],
                  returnAt: {
                    lte: endDate,
                    gte: startDate,
                  },
                },
                include: {
                  model: 'loans',
                  attributes: ['id', 'investor_fee_rate', 'name'],
                },
              },
            });

            const principal = sumByKey(notesData?.data, 'principal');
            const rate = sumByKey(notesData?.data, 'rate');
            const feeRate = sumByKey(notesData?.data, 'fee_rate');
            const interest = sumByKey(notesData?.data, 'interest');
            const taxAmount = sumByKey(notesData?.data, 'tax_amount');
            const feeAmount = sumByKey(notesData?.data, 'fee_amount');
            const cumulativeReturnAfterTax = interest - taxAmount - feeAmount;
            const cumulativeInterestRatio = (
              ((rate - feeRate) / notesData?.data?.length || 1) * 100
            ).toFixed(2);

            function getRealPeriod(item: any): number {
              const period = differenceInCalendarDays(
                new Date(item.doneAt || item.issueAt),
                new Date(item.startAt)
              );
              return period;
            }
            const notesReturnRatesAfterTax = notesData?.data?.map(
              (note: any) => {
                const returnRateAfterTax =
                  note?.doneAt && getRealPeriod(note) > 0
                    ? ((((note.interest -
                        (note.fee_amount || 0) -
                        note.tax_amount) /
                        getRealPeriod(note)) *
                        365) /
                        note.origin_principal) *
                      100
                    : 0;
                return returnRateAfterTax;
              }
            );
            const cumulativeInterestRatioAfterTax =
              notesReturnRatesAfterTax.reduce(
                (acc: number, cur: number) => acc + cur,
                0
              );

            return {
              cumulativeReturnAfterTax,
              cumulativeReturn: interest,
              cumulativeInterestRatio,
              cumulativeInterestRatioAfterTax:
                cumulativeInterestRatioAfterTax.toFixed(2),
              taxAmount,
              feeAmount,
              investmentsPricipal: principal,
              notesData: notesData?.data || [],
            };
          },
        });
      },

      userRegister: () => {
        const mutation = useMutation(
          (userRegisterDto: UserRegisterDto) =>
            this.registerMember(userRegisterDto),
          {
            onSuccess: (response) => {
              if (response?.data?.token) {
                this.authToken = response?.data?.token;
              }
            },
          }
        );
        return mutation;
      },
    };
  }
}
