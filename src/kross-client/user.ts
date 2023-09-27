import {
  PasswordCheckDto,
  PasswordCheckResponse,
  PasswordResetDto,
  PasswordResetNewDto,
  PasswordResetNewResponse,
  PasswordResetResponse,
  PasswordUpdateDto,
  PasswordUpdateResponse,
  PortfolioResponse,
  SignedUrlResponse,
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
  UserWengeQueryDto,
  UserUpdateDto,
  UserUpdateResponse,
  UserFilesResponse,
  getCorporationResponse,
  updateCorporationResponse,
} from '../types/kross-client/user';
import { updateCorporationDto } from '../types/kross-client/corporations';

export class User extends KrossClientBase {
  kftcBalance: FunctionRegistered<kftcBalanceResponse>;
  getVirtualAccCertificate: FunctionRegistered<AccountCertificateResponse>;
  checkVirtualAccount: FunctionRegistered<VirtualAccountCheckResponse>;
  registerMember: FunctionRegistered<GetAuthTokenResponse, UserRegisterDto>;
  unRegisterMemeber: FunctionRegistered<WelcomeUnregisterResponse>;
  releaseDepositControl: FunctionRegistered<ReleaseDepositResponse>;
  accountData: FunctionRegistered<AccountResponse, UserQueryDto>;
  userData: FunctionRegistered<UserResponse, UserWengeQueryDto>;
  userDataUpdate: FunctionRegistered<UserUpdateResponse, UserUpdateDto>;
  passwordCheck: FunctionRegistered<PasswordCheckResponse, PasswordCheckDto>;
  userFilesList: FunctionRegistered<any>;
  passwordUpdate: FunctionRegistered<PasswordUpdateResponse, PasswordUpdateDto>;
  passwordResetUpdate: FunctionRegistered<
    PasswordResetNewResponse,
    PasswordResetNewDto
  >;
  passwordResetEmail: FunctionRegistered<
    PasswordResetResponse,
    PasswordResetDto
  >;
  userAccountLogs: FunctionRegistered<
    UserAccountLogsResponse,
    UserWengeQueryDto
  >;
  userNoteLogs: FunctionRegistered<UserNoteLogsResponse, UserWengeQueryDto>;
  portfolio: FunctionRegistered<PortfolioResponse>;
  getCorporations: FunctionRegistered<getCorporationResponse>;
  constructor(options: KrossClientOptions) {
    super(options);
    this.userNoteLogs = User.registerFunction<
      UserNoteLogsResponse,
      UserWengeQueryDto
    >({
      url: '/user-note-logs',
      method: 'get',
    });

    this.userAccountLogs = User.registerFunction<
      UserAccountLogsResponse,
      UserWengeQueryDto
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
      GetAuthTokenResponse,
      UserRegisterDto
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

    this.accountData = User.registerFunction<AccountResponse, UserQueryDto>({
      url: '/users/account',
      method: 'get',
    });

    this.userData = User.registerFunction<UserResponse, UserWengeQueryDto>({
      url: '/users',
      method: 'get',
    });

    this.userDataUpdate = User.registerFunction<
      UserUpdateResponse,
      UserUpdateDto
    >({
      url: '/users',
      method: 'put',
    });

    this.passwordCheck = User.registerFunction<
      PasswordCheckResponse,
      PasswordCheckDto
    >({
      url: '/users/password-check',
      method: 'post',
    });

    this.portfolio = User.registerFunction<PortfolioResponse>({
      url: '/sienna/portfolio',
      method: 'get',
    });

    this.userFilesList = User.registerFunction<UserFilesResponse>({
      url: '/users/files-list',
      method: 'get',
    });

    this.getCorporations = User.registerFunction<getCorporationResponse>({
      url: '/corporations',
      method: 'get',
    });

    this.passwordResetEmail = User.registerFunction<
      PasswordResetResponse,
      PasswordResetDto
    >({
      url: 'users/reset-password/email',
      method: 'post',
    });

    this.passwordResetUpdate = User.registerFunction<
      PasswordResetNewResponse,
      PasswordResetNewDto
    >({
      url: 'users/reset-password/update',
      method: 'put',
    });
    this.passwordUpdate = User.registerFunction<
      PasswordUpdateResponse,
      PasswordUpdateDto
    >({
      url: 'users/password',
      method: 'patch',
    });
  }

  signedURL(fileName: string) {
    return this.instance.get<SignedUrlResponse>(
      `/users/signed-url/${fileName}`
    );
  }
  updateCorporation(corpObject: updateCorporationDto) {
    const { state } = corpObject;
    return this.instance.patch<updateCorporationResponse>(
      `/corporations/${corpObject.corpId}`,
      { state }
    );
  }

  useUserHooks() {
    return {
      userNoteLogs: (userWengeQueryDto?: UserWengeQueryDto) => {
        return useQuery({
          queryKey: 'userNoteLogs',
          queryFn: async () => {
            return this.userNoteLogs(userWengeQueryDto).then(res => {
              return res.data;
            });
          },
        });
      },
      userAccountLogs: (userWengeQueryDto?: UserWengeQueryDto) => {
        return useQuery({
          queryKey: 'userAccountLogs',
          queryFn: async () => {
            return this.userAccountLogs(userWengeQueryDto).then(res => {
              return res.data;
            });
          },
        });
      },
      kftcBalance: () => {
        return useQuery({
          queryKey: 'kftcBalance',
          queryFn: async () => {
            return this.kftcBalance().then(res => {
              return res.data;
            });
          },
        });
      },
      getVirtualAccCertificate: () => {
        return useQuery({
          queryKey: 'getVirtualAccCertificate',
          queryFn: async () => {
            return this.getVirtualAccCertificate().then(res => {
              return res.data;
            });
          },
        });
      },
      checkVirtualAccount: () => {
        return useQuery({
          queryKey: 'checkVirtualAccount',
          queryFn: async () => {
            return this.checkVirtualAccount().then(res => {
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
      accountData: ({
        accountQuery = {},
        enabled,
      }: {
        accountQuery?: UserQueryDto;
        enabled?: boolean;
      }) => {
        return useQuery({
          cacheTime: 0,
          queryKey: 'accountData',
          queryFn: async () => {
            return this.accountData(accountQuery).then(res => {
              return res.data;
            });
          },
          enabled: enabled === undefined ? true : enabled,
        });
      },
      userData: ({
        userQuery = {},
        enabled,
      }: {
        userQuery?: UserWengeQueryDto;
        enabled?: boolean;
      }) => {
        return useQuery({
          cacheTime: 0,
          queryKey: 'userData',
          queryFn: async () => {
            return this.userData(userQuery).then(res => {
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
            const accountDataPromise = this.accountData();
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
            const delayNotesSummary =
              notesSummaryData?.find((notesObject: any) => {
                return notesObject.state === 'delay';
              }) || {};

            const lateNotesSummary =
              notesSummaryData?.find((notesObject: any) => {
                return notesObject.state === 'late';
              }) || {};

            const investingNotesSumary =
              notesSummaryData?.find((notesObject: any) => {
                return notesObject.state === 'investing';
              }) || {};

            const doneNotesSummary =
              notesSummaryData?.find((notesObject: any) => {
                return notesObject.state === 'done';
              }) || {};

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

            // delay, late repayments
            const repaymentLateCount = lateNotesSummary?.count || 0;
            const repaymentLateAmount = lateNotesSummary?.buriedPrincipal || 0;

            const repaymentDelayAmount =
              delayNotesSummary?.buriedPrincipal || 0;
            const repaymentDelayCount = delayNotesSummary?.count || 0;

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
                    (acc: number, cur: { rate: number; feeRate: number }) =>
                      acc + (cur.rate - cur.feeRate) * 100,
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
              totalAssetAmount,
              amountInAccount,

              repaymentDelayAmount,
              repaymentDelayCount,

              repaymentLateAmount,
              repaymentLateCount,

              investmentAppliedCount,
              investmentAppliedToAmount,

              repaymentScheduledCount,
              repaymentScheduledRate,
              repaymentScheduledAmount,

              repaymentDoneCount,
              repaymentDoneAmount,
              cummulativeReturnOnInvestment,
            };
          },
        });
      },
      userRegister: () => {
        const mutation = useMutation(
          (userRegisterDto: UserRegisterDto) =>
            this.registerMember(userRegisterDto),
          {
            onSuccess: response => {
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
      resetPasswordEmail: () => {
        const mutation = useMutation((passwordResetDto: PasswordResetDto) =>
          this.passwordResetEmail(passwordResetDto)
        );
        return mutation;
      },
      resetPasswordUpdate: () => {
        const mutation = useMutation(
          (passwordResetNewDto: PasswordResetNewDto) =>
            this.passwordResetUpdate(passwordResetNewDto)
        );
        return mutation;
      },
      updatePassword: () => {
        const mutation = useMutation((passwordUpdateDto: PasswordUpdateDto) =>
          this.passwordUpdate(passwordUpdateDto)
        );
        return mutation;
      },
      portfolio: ({ enabled }: { enabled?: boolean } = {}) => {
        return useQuery({
          cacheTime: 0,
          queryKey: 'portfolio',
          queryFn: async () => {
            return this.portfolio().then(res => {
              return res.data;
            });
          },
          enabled: enabled ?? true,
        });
      },

      userFilesList: () => {
        return useQuery({
          cacheTime: 0,
          queryKey: 'userFilesList',
          queryFn: async () => {
            return this.userFilesList().then(res => {
              return res.data;
            });
          },
        });
      },
      getCorporations: () => {
        return useQuery({
          cacheTime: 0,
          queryKey: 'getCorporation',
          queryFn: async () => {
            return this.getCorporations().then(res => {
              return res.data;
            });
          },
        });
      },

      getSignedURL: () => {
        const mutation = useMutation((fileName: string) =>
          this.signedURL(fileName)
        );
        return mutation;
      },

      updateCorporation: () => {
        const mutation = useMutation(
          (updateCorporation: updateCorporationDto) =>
            this.updateCorporation(updateCorporation)
        );
        return mutation;
      },
    };
  }
}
