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
export class User extends KrossClientBase {
  kftcBalance: FunctionRegistered<kftcBalanceResponse>;
  getVirtualAccCertificate: FunctionRegistered<AccountCertificateResponse>;
  checkVirtualAccount: FunctionRegistered<VirtualAccountCheckResponse>;
  unRegisterMemeber: FunctionRegistered<WelcomeUnregisterResponse>;
  releaseDepositControl: FunctionRegistered<ReleaseDepositResponse>;
  accountData: FunctionRegistered<
    UserQueryDto,
    AccountResponse
  >;
  userData: FunctionRegistered<
    UserQueryDto,
    UserResponse
  >;
  userAccountLogs: FunctionRegistered<
    UserQueryDto,
    UserAccountLogsResponse
  >;
  userNoteLogs: FunctionRegistered<
    UserQueryDto,
    UserNoteLogsResponse
  >;

  constructor(options: KrossClientOptions) {
    super(options);
    this.userNoteLogs = User.registerFunction<UserQueryDto ,UserNoteLogsResponse>({
      url: '/user-note-logs',
      method: 'get',
    });

    this.userAccountLogs = User.registerFunction<UserQueryDto ,UserAccountLogsResponse>({
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
          queryFn: async () => await this.userNoteLogs(userQueryDto),
        });
      },
      userAccountLogs: (userQueryDto: UserQueryDto) => {
        return useQuery({
          queryKey: 'userAccountLogs',
          queryFn: async () => await this.userAccountLogs(userQueryDto),
        });
      },
      kftcBalance: () => {
        return useQuery({
          queryKey: 'kftcBalance',
          queryFn: async () => await this.kftcBalance(),
        });
      },
      getVirtualAccCertificate: () => {
        return useQuery({
          queryKey: 'getVirtualAccCertificate',
          queryFn: async () => await this.getVirtualAccCertificate(),
        });
      },
      checkVirtualAccount: () => {
        return useQuery({
          queryKey: 'checkVirtualAccount',
          queryFn: async () => await this.checkVirtualAccount(),
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
          queryFn: async () => await this.accountData(userQueryDto),
        });
      },
      userData: (userQueryDto: UserQueryDto) => {
        return useQuery({
          queryKey: 'userData',
          queryFn: async () => await this.userData(userQueryDto),
        });
      },
    };
  }
}
