import { KrossClientBase } from './base';
import { useMutation, useQuery } from 'react-query';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { 
  kftcBalanceResponse, 
  AccountCertificateResponse,
  VirtualAccountCheckResponse,
  WelcomeUnregisterResponse,
  ReleaseDepositResponse,
  AccountResponse,
  UserResponse,
 } from '../types/kross-client/user';
export class User extends KrossClientBase {
  kftcBalance: FunctionRegistered<kftcBalanceResponse>  
  getVirtualAccCertificate: FunctionRegistered<AccountCertificateResponse>
  checkVirtualAccount: FunctionRegistered<VirtualAccountCheckResponse>
  unRegisterMemeber: FunctionRegistered<WelcomeUnregisterResponse>
  releaseDepositControl: FunctionRegistered<ReleaseDepositResponse>
  accountData: FunctionRegistered<AccountResponse>
  userData: FunctionRegistered<UserResponse>

  constructor(options: KrossClientOptions) {
    super(options);
    
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
      accountData: () => {
        return useQuery({
          queryKey: 'accountData',
          queryFn: async () => this.accountData.bind(this),
        });
      },
    };
  };
}
