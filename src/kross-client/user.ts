import {
  IndustryCodesResponse,
  NoticeUsDto,
  NoticeUsResponse,
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
  UserNotesQueryDto,
  UserNotesResponse,
} from './../types/kross-client/user';
import { KrossClientBase } from './base';
import { useQuery, useMutation, useInfiniteQuery } from 'react-query';
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
  getSoldOffNotesResponse,
  SoldOffNotesQueryDto,
  getDepositReportResponse,
  DepositReportQueryDto,
} from '../types/kross-client/user';
import { updateCorporationDto } from '../types/kross-client/corporations';

export class User extends KrossClientBase {
  industryCodes: FunctionRegistered<IndustryCodesResponse, UserWengeQueryDto>;
  noticeUs: FunctionRegistered<NoticeUsResponse, NoticeUsDto>;
  userNotes: FunctionRegistered<UserNotesResponse, UserNotesQueryDto>;
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
  getSoldOffNotes: FunctionRegistered<
    getSoldOffNotesResponse,
    SoldOffNotesQueryDto
  >;
  getDepositReport: FunctionRegistered<
    getDepositReportResponse,
    DepositReportQueryDto
  >;
  constructor(options: KrossClientOptions) {
    super(options);
    this.industryCodes = User.registerFunction<
      IndustryCodesResponse,
      UserWengeQueryDto
    >({
      url: '/industry-codes',
      method: 'get',
    });
    this.userNotes = User.registerFunction<
      UserNotesResponse,
      UserNotesQueryDto
    >({
      url: '/users/notes',
      method: 'get',
    });
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
      url: '/users/portfolio',
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
    this.getSoldOffNotes = User.registerFunction<
      getSoldOffNotesResponse,
      SoldOffNotesQueryDto
    >({
      url: 'users/soldoff-notes',
      method: 'get',
    });
    this.getDepositReport = User.registerFunction<
      getDepositReportResponse,
      DepositReportQueryDto
    >({
      url: 'users/deposit-report',
      method: 'get',
    });

    this.noticeUs = User.registerFunction<NoticeUsResponse, NoticeUsDto>({
      url: '/notice-us',
      method: 'post',
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
      getIndustryCodes: (userWengeQueryDto?: UserWengeQueryDto) => {
        return useQuery({
          queryKey: 'getIndustryCodes',
          queryFn: async () => {
            return this.industryCodes(userWengeQueryDto).then(res => {
              return res.data;
            });
          },
        });
      },
      userNotes: (
        userNotesQueryDto?: UserNotesQueryDto,
        cacheTime?: number,
        enabled?: boolean
      ) => {
        return useInfiniteQuery(
          ['userNotes', { ...userNotesQueryDto }],
          async ({ pageParam = 0 }) => {
            const skip = (
              pageParam *
              (isNaN(parseInt(userNotesQueryDto?.take as string, 10))
                ? 0
                : parseInt(userNotesQueryDto?.take as string, 10))
            ).toString();
            const notesData = await this.userNotes({
              ...userNotesQueryDto,
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
        cacheTime = 0,
      }: {
        userQuery?: UserWengeQueryDto;
        enabled?: boolean;
        cacheTime?: number;
      }) => {
        return useQuery({
          queryKey: 'userData',
          queryFn: async () => {
            return this.userData(userQuery).then(res => {
              return res.data;
            });
          },
          enabled: enabled === undefined ? true : enabled,
          cacheTime: cacheTime,
        });
      },
      investPageSummary: ({
        enabled,
      }: {
        enabled?: boolean;
        cacheTime?: number;
      }) => {
        return useQuery(
          ['investPageSummary'],
          async () => {
            const accountDataPromise = this.accountData();
            const investmentsAppliedToDataPromise = this.get('/investments', {
              params: {
                select: 'id,amount,state',
                filter: 'state||$eq||funding',
              },
            });
            const notesSummaryDataInvestingPromise = this.get(
              '/notes/summary',
              { params: { state: 'investing' } }
            );
            const notesSummaryDataDelayPromise = this.get('/notes/summary', {
              params: {
                state: 'delay',
              },
            });

            const [
              accountDataRes,
              investmentsAppliedToDataRes,
              investingNotesSumary,
              delayNotesSummary,
            ] = await Promise.all([
              accountDataPromise,
              investmentsAppliedToDataPromise,
              notesSummaryDataInvestingPromise,
              notesSummaryDataDelayPromise,
            ]);
            const { data: investingData = [] }: any = investingNotesSumary;
            const { data: delayData = [] }: any = delayNotesSummary;
            const { data: accountData = [] }: any = accountDataRes;
            const { data: investmentsAppliedToData = [] }: any =
              investmentsAppliedToDataRes;
            const amountInAccount: number = accountData?.data?.amount || 0;
            const pendingInvestment: number =
              accountData?.data?.pending_investment || 0;
            const availableWithdrawAmount: number =
              accountData?.data?.available_withdraw_amount || 0;

            const totalAssetAmount: number =
              amountInAccount +
              (investingData?.originPrincipal || 0) -
              (investingData?.principal || 0) +
              (delayData?.originPrincipal || 0) -
              (delayData?.principal || 0);

            // Investment Applied To content
            const investmentAppliedCount: number =
              investmentsAppliedToData?.length || 0;
            const investmentAppliedToAmount: number = (
              investmentsAppliedToData || []
            ).reduce(
              (acc: number, cur: { amount?: number }) =>
                acc + (cur?.amount || 0),
              0
            );

            return {
              totalAssetAmount,
              amountInAccount,
              pendingInvestment,
              availableWithdrawAmount,
              investmentAppliedCount,
              investmentAppliedToAmount,
            };
          },
          {
            enabled: enabled === undefined ? true : enabled,
          }
        );
      },

      noteSummary: ({ enabled }: { enabled?: boolean }) => {
        return useQuery(
          ['noteSummary'],
          async () => {
            /* will be used by only web
             default caching time 5mins. Data barely change */

            const notesSummaryDataDonePromise = this.get('/notes/summary', {
              params: {
                state: 'done',
              },
            });
            const notesSummaryDataInvestingPromise = this.get(
              '/notes/summary',
              {
                params: {
                  state: 'investing',
                },
              }
            );
            const notesSummaryDataDelayPromise = this.get('/notes/summary', {
              params: {
                state: 'delay',
              },
            });
            const notesSummaryDataLatePromise = this.get('/notes/summary', {
              params: {
                state: 'late',
              },
            });

            const soldOffNotesPromise = this.get(
              '/users/soldoff-notes/summary'
            );

            const [
              doneNotesSummary,
              investingNotesSumary,
              delayNotesSummary,
              lateNotesSummary,
              soldOffNotesRes,
            ] = await Promise.all([
              notesSummaryDataDonePromise,
              notesSummaryDataInvestingPromise,
              notesSummaryDataDelayPromise,
              notesSummaryDataLatePromise,
              soldOffNotesPromise,
            ]);

            const { data: doneData = [] }: any = doneNotesSummary;
            const { data: investingData = [] }: any = investingNotesSumary;
            const { data: lateData = [] }: any = lateNotesSummary;
            const { data: delayData = [] }: any = delayNotesSummary;
            const { data: soldOffNoteData = {} }: any = soldOffNotesRes;
            const repaymentLateCount: number = lateData?.count || 0;
            const repaymentLateAmount: number = lateData?.buriedPrincipal || 0;

            const repaymentDelayAmount: number =
              delayData?.buriedPrincipal || 0;
            const repaymentDelayCount: number = delayData?.count || 0;
            // Repayment Scheduled content
            const repaymentScheduledCount: number = investingData?.count || 0;
            const delayRemainPrincipal: number =
              (delayData?.originPrincipal || 0) - (delayData?.principal || 0);
            const repaymentScheduledAmount: number =
              (investingData?.originPrincipal || 0) -
              (investingData?.principal || 0);

            // Repayment Done content
            const repaymentDoneCount: number = doneData?.count || 0;
            const repaymentDoneAmount: number =
              (doneData?.originPrincipal || 0) + (doneData?.interest || 0);

            const cumulativeInvestmentPrincipal: number =
              (doneData?.principal || 0) +
              (investingData?.originPrincipal || 0) +
              delayRemainPrincipal;

            const soldOffNoteCount: number = soldOffNoteData?.count;
            const soldOffNoteAmount: number = soldOffNoteData?.buriedPrincipal;

            const totalAmount =
              repaymentDoneAmount +
              (investingData?.principal || 0) +
              (delayData?.principal || 0) +
              (lateData?.principal + 0);
            const totalCount =
              repaymentDoneCount +
              repaymentScheduledCount +
              repaymentDelayCount +
              repaymentLateCount;

            return {
              repaymentDoneCount,
              repaymentDoneAmount,

              repaymentScheduledCount,
              repaymentScheduledAmount,

              repaymentDelayAmount,
              repaymentDelayCount,

              repaymentLateAmount,
              repaymentLateCount,

              soldOffNoteCount,
              soldOffNoteAmount,

              cumulativeInvestmentPrincipal,

              totalCount,
              totalAmount,
            };
          },
          {
            enabled: enabled === undefined ? true : enabled,
          }
        );
      },
      myPageData: ({ enabled }: { enabled?: boolean }) => {
        return useQuery(
          ['myPageData'],
          async () => {
            /* used only for app
            default caching 5mins */

            const accountDataPromise = this.accountData();
            const investmentsAppliedToDataPromise = this.get('/investments', {
              params: {
                select: 'id,amount,state',
                filter: 'state||$eq||funding',
              },
            });
            const notesSummaryDataDonePromise = this.get('/notes/summary', {
              params: {
                state: 'done',
              },
            });
            const notesSummaryDataInvestingPromise = this.get(
              '/notes/summary',
              {
                params: {
                  state: 'investing',
                },
              }
            );
            const notesSummaryDataDelayPromise = this.get('/notes/summary', {
              params: {
                state: 'delay',
              },
            });
            const repaymentsScheduledDataPromise = this.get('/notes', {
              params: {
                filter: 'state||$eq||investing',
              },
            });

            const [
              accountDataRes,
              investmentsAppliedToDataRes,
              doneNotesSummary,
              investingNotesSumary,
              delayNotesSummary,
              repaymentsScheduledDataRes,
            ] = await Promise.all([
              accountDataPromise,
              investmentsAppliedToDataPromise,
              notesSummaryDataDonePromise,
              notesSummaryDataInvestingPromise,
              notesSummaryDataDelayPromise,
              repaymentsScheduledDataPromise,
            ]);

            const { data: doneData = [] }: any = doneNotesSummary;
            const { data: investingData = [] }: any = investingNotesSumary;
            const { data: delayData = [] }: any = delayNotesSummary;
            const { data: accountData = [] }: any = accountDataRes;
            const { data: investmentsAppliedToData = [] }: any =
              investmentsAppliedToDataRes;
            const { data: repaymentsScheduledData = [] }: any =
              repaymentsScheduledDataRes;
            const amountInAccount: number = accountData?.data?.amount || 0;

            const totalAssetAmount: number =
              amountInAccount +
              (investingData?.originPrincipal || 0) -
              (investingData?.principal || 0) +
              (delayData?.originPrincipal || 0) -
              (delayData?.principal || 0);

            const cummulativeReturnOnInvestment: number =
              (doneData?.interest || 0) -
              (doneData?.taxAmount || 0) -
              (doneData?.feeAmount || 0);

            // Investment Applied To content
            const investmentAppliedCount: number =
              investmentsAppliedToData?.length || 0;
            const investmentAppliedToAmount: number = (
              investmentsAppliedToData || []
            ).reduce(
              (acc: number, cur: { amount?: number }) =>
                acc + (cur?.amount || 0),
              0
            );
            // Repayment Scheduled content
            const repaymentScheduledCount: number = investingData?.count || 0;
            const repaymentScheduledRate: string = repaymentsScheduledData
              ? (
                  repaymentsScheduledData?.reduce(
                    (acc: number, cur: { rate: number; feeRate: number }) =>
                      acc + (cur.rate - cur.feeRate) * 100,
                    0
                  ) / (repaymentScheduledCount || 1)
                ).toFixed(2)
              : '0';
            const repaymentScheduledAmount: number =
              (investingData?.originPrincipal || 0) -
              (investingData?.principal || 0);

            // Repayment Done content
            const repaymentDoneCount: number = doneData?.count || 0;
            const repaymentDoneAmount: number =
              (doneData?.originPrincipal || 0) + (doneData?.interest || 0);
            return {
              totalAssetAmount,
              amountInAccount,
              investmentAppliedCount,
              investmentAppliedToAmount,
              repaymentScheduledRate,
              repaymentScheduledAmount,

              repaymentDoneCount,
              repaymentDoneAmount,
              cummulativeReturnOnInvestment,
            };
          },
          {
            enabled: enabled === undefined ? true : enabled,
          }
        );
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
      portfolio: ({
        enabled,
      }: { enabled?: boolean; cacheTime?: number } = {}) => {
        return useQuery({
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
      getSoldOffNotes: (SoldOffNotesQueryDto?: SoldOffNotesQueryDto) => {
        return useQuery({
          queryKey: 'getSoldOffNotes',
          queryFn: async () => {
            return this.getSoldOffNotes(SoldOffNotesQueryDto).then(res => {
              return res.data;
            });
          },
        });
      },
      getDepositReport: (DepositReportQueryDto?: DepositReportQueryDto) => {
        return useQuery({
          queryKey: 'getDepositReport',
          queryFn: async () => {
            return this.getDepositReport(DepositReportQueryDto).then(res => {
              return res.data;
            });
          },
        });
      },
      noticeUs: () => {
        const mutation = useMutation((noticeUsDto: NoticeUsDto) =>
          this.noticeUs(noticeUsDto)
        );
        return mutation;
      },
    };
  }
}
