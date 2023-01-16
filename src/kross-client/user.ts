import { KrossClientBase } from './base';
import { useQuery } from 'react-query';
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
 } from '../types/kross-client/user';
export class User extends KrossClientBase {
  kftcBalance: FunctionRegistered<kftcBalanceResponse>  
  getVirtualAccCertificate: FunctionRegistered<AccountCertificateResponse>
  checkVirtualAccount: FunctionRegistered<VirtualAccountCheckResponse>
  unRegisterMemeber: FunctionRegistered<WelcomeUnregisterResponse>
  releaseDepositControl: FunctionRegistered<ReleaseDepositResponse>
  accountData: FunctionRegistered<AccountResponse>
  userData: FunctionRegistered<UserResponse>
  userAccountLogs: FunctionRegistered<UserAccountLogsResponse>
  userNoteLogs: FunctionRegistered<UserNoteLogsResponse>

  constructor(options: KrossClientOptions) {
    super(options);
    this.userNoteLogs = User.registerFunction<UserNoteLogsResponse>({
      url: '/user-note-logs',
      method: 'get',
    })

    this.userAccountLogs = User.registerFunction<UserAccountLogsResponse>({
      url: '/user-account-logs',
      method: 'get',
    })

    this.kftcBalance = User.registerFunction<kftcBalanceResponse>({
      url: '/users/borrower-amount',
      method: 'get',
    })

    this.getVirtualAccCertificate = User.registerFunction<AccountCertificateResponse>({
      url: '/users/account-certificate',
      method: 'get',
    })

    this.checkVirtualAccount = User.registerFunction<VirtualAccountCheckResponse>({
      url: '/users/virtual-account',
      method: 'post',
    })

    this.unRegisterMemeber = User.registerFunction<WelcomeUnregisterResponse>({
      url: '/users/welcome-unregister',
      method: 'patch',
    })

    this.releaseDepositControl = User.registerFunction<ReleaseDepositResponse>({
      url: '/users/release-deposit',
      method: 'patch',
    })

    this.accountData = User.registerFunction<AccountResponse>({
      url: '/users/account',
      method: 'get',
    })

    this.userData = User.registerFunction<UserResponse>({
      url: '/users',
      method: 'get',
    })
  }

  useUserHooks() {
    return {
      userNoteLogs: () => {
        return useQuery({
          queryKey: 'userNoteLogs',
          queryFn: async () => this.userNoteLogs.bind(this),
        });
      },
      userAccountLogs: () => {
        return useQuery({
          queryKey: 'userAccountLogs',
          queryFn: async () => this.userAccountLogs.bind(this),
        });
      },
      kftcBalance: () => {
        return useQuery({
          queryKey: 'kftcBalance',
          queryFn: async () => this.kftcBalance.bind(this),
        });
      },
      getVirtualAccCertificate: () => {
        return useQuery({
          queryKey: 'getVirtualAccCertificate',
          queryFn: async () => this.getVirtualAccCertificate.bind(this),
        });
      },
      checkVirtualAccount: () => {
        return useQuery({
          queryKey: 'checkVirtualAccount',
          queryFn: async () => this.checkVirtualAccount.bind(this),
        });
      },
      unRegisterMemeber: () => {
        return useQuery({
          queryKey: 'unRegisterMemeber',
          queryFn: async () => this.unRegisterMemeber.bind(this),
        });
      },
      releaseDepositControl: () => {
        return useQuery({
          queryKey: 'releaseDepositControl',
          queryFn: async () => this.releaseDepositControl.bind(this),
        });
      },
      accountData: () => {
        return useQuery({
          queryKey: 'accountData',
          queryFn: async () => this.accountData.bind(this),
        });
      },
      userData: () => {
        return useQuery({
          queryKey: 'userData',
          queryFn: async () => this.userData.bind(this),
        });
      },
    };
  };
}
