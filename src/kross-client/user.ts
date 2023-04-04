import {
  PasswordCheckDto,
  PasswordCheckResponse,
} from './../types/kross-client/user';
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
  UserUpdateDto,
  UserUpdateResponse,
} from '../types/kross-client/user';
import { growthCalculator } from '../utils/growthCalculator';

export class User extends KrossClientBase {
  kftcBalance: FunctionRegistered<kftcBalanceResponse>;
  getVirtualAccCertificate: FunctionRegistered<AccountCertificateResponse>;
  checkVirtualAccount: FunctionRegistered<VirtualAccountCheckResponse>;
  registerMember: FunctionRegistered<UserRegisterDto, GetAuthTokenResponse>;
  unRegisterMemeber: FunctionRegistered<WelcomeUnregisterResponse>;
  releaseDepositControl: FunctionRegistered<ReleaseDepositResponse>;
  accountData: FunctionRegistered<UserQueryDto, AccountResponse>;
  userData: FunctionRegistered<UserQueryDto, UserResponse>;
  userDataUpdate: FunctionRegistered<UserUpdateDto, UserUpdateResponse>;
  passwordCheck: FunctionRegistered<PasswordCheckDto, PasswordCheckResponse>;

  userAccountLogs: FunctionRegistered<
    UserWengeQueryDto,
    UserAccountLogsResponse
  >;
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

    this.userDataUpdate = User.registerFunction<
      UserUpdateDto,
      UserUpdateResponse
    >({
      url: '/users',
      method: 'put',
    });

    this.passwordCheck = User.registerFunction<
      PasswordCheckDto,
      PasswordCheckResponse
    >({
      url: '/users/password-check',
      method: 'post',
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
      accountData: (userQueryDto: UserQueryDto, enabled?: boolean) => {
        return useQuery({
          cacheTime: 0,
          queryKey: 'accountData',
          queryFn: async () => {
            return this.accountData(userQueryDto).then((res) => {
              return res.data;
            });
          },
          enabled: enabled === undefined ? true : enabled,
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
          cacheTime: 0,
          queryKey: 'myPageData',
          queryFn: async () => {
            const accountDataPromise = this.accountData({});
            const investmentsAppliedToDataPromise = this.get('/investments', {
              params: {
                select: 'id,amount,state',
                filter: 'state||$eq||funding',
              },
            });
            const notesSummaryDataPromise = this.get('/notes/summary');
            const repaymentsScheduledDataPromise = this.get('/notes', {
              params: {
                filter: 'state||$eq||investing',
              },
            });

            const [
              accountDataRes,
              investmentsAppliedToDataRes,
              notesSummaryDataRes,
              repaymentsScheduledDataRes,
            ] = await Promise.all([
              accountDataPromise,
              investmentsAppliedToDataPromise,
              notesSummaryDataPromise,
              repaymentsScheduledDataPromise,
            ]);
            const { data: accountData = [] }: any = accountDataRes;
            const { data: investmentsAppliedToData = [] }: any =
              investmentsAppliedToDataRes;
            const { data: notesSummaryData = [] }: any = notesSummaryDataRes;
            const { data: repaymentsScheduledData = [] }: any =
              repaymentsScheduledDataRes;

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
              (investingNotesSumary?.originPrincipal || 0) -
              (investingNotesSumary?.principal || 0) +
              (delayNotesSummary?.originPrincipal || 0) -
              (delayNotesSummary?.principal || 0);
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
            const repaymentScheduledCount = investingNotesSumary?.count || 0;
            const repaymentScheduledRate = repaymentsScheduledData
              ? (
                  repaymentsScheduledData?.reduce(
                    (acc: number, cur: { rate: number }) =>
                      acc + cur.rate * 100,
                    0
                  ) / (repaymentScheduledCount || 1)
                ).toFixed(2)
              : 0;
            const repaymentScheduledAmount =
              (investingNotesSumary?.originPrincipal || 0) -
              (investingNotesSumary?.principal || 0) +
              (investingNotesSumary?.investingNotesSumary || 0);
            // Repayment Done content
            const repaymentDoneCount = doneNotesSummary?.count || 0;
            const repaymentDoneAmount =
              (doneNotesSummary?.originPrincipal || 0) +
              (doneNotesSummary?.interest || 0);

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
            };
          },
        });
      },
      totalAssets: () => {
        return useQuery('totalAssets', async () => {
          const accountLogs = await this.userAccountLogs({});
          const noteLogs = await this.userNoteLogs({});
          const accountLogsArray: { [key: string]: any }[] = (
            accountLogs?.data ? Object.values(accountLogs.data) : []
          ) as { [key: string]: any }[];
          const noteLogsArray: { [key: string]: any }[] = (
            noteLogs?.data ? Object.values(noteLogs.data) : []
          ) as { [key: string]: any }[];
          const totalAssets: TotalAssetsType = {};
          for (const accountLog of accountLogsArray) {
            totalAssets[accountLog.saveDate] = {
              totalAssets: parseInt(accountLog.amount, 10),
            };
          }
          for (const noteLog of noteLogsArray) {
            if (totalAssets[noteLog.saveDate]) {
              totalAssets[noteLog.saveDate].totalAssets += parseInt(
                noteLog.remainPrincipal,
                10
              );
            }
          }
          const totalAssetsArray = Object.entries(totalAssets).sort();

          const growthRate = growthCalculator(totalAssetsArray);
          return {
            data: totalAssets,
            growthRatePercentage: growthRate,
          };
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
      userUpdate: () => {
        const mutation = useMutation((userUpdateDto: UserUpdateDto) =>
          this.userDataUpdate(userUpdateDto)
        );
        return mutation;
      },

      checkPassword: () => {
        const mutation = useMutation((passwordCheckDto: PasswordCheckDto) =>
          this.passwordCheck(passwordCheckDto)
        );
        return mutation;
      },
    };
  }
}
