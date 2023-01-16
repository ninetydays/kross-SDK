import { KrossClientBase } from './base';
import { useQuery } from 'react-query'
import {
  FunctionRegistered,
  KrossClientOptions,
  AccountCheckDto,
  AccountCheckResponse,
  AccountWithdrawInitDto,
  AccountWithdrawInitResponse,
  AccountWithdrawVerifyDto,
  AccountWithdrawVerifyResponse,
  AccountWithdrawCancelDto,
  AccountWithdrawCancelResponse,
} from '../types';

export class Account extends KrossClientBase {
  check: FunctionRegistered<AccountCheckDto, AccountCheckResponse>;
  withdrawInit: FunctionRegistered<
    AccountWithdrawInitDto,
    AccountWithdrawInitResponse
  >;
  withdrawVerify: FunctionRegistered<
    AccountWithdrawVerifyDto,
    AccountWithdrawVerifyResponse
  >;
  withdrawCancel: FunctionRegistered<
    AccountWithdrawCancelDto,
    AccountWithdrawCancelResponse
  >;

  constructor(options: KrossClientOptions) {
    super(options);

    this.check = Account.registerFunction<
      AccountCheckDto,
      AccountCheckResponse
    >({
      url: '/accounts/check',
      method: 'post',
    });

    this.withdrawInit = Account.registerFunction<
      AccountWithdrawInitDto,
      AccountWithdrawInitResponse
    >({
      url: '/withdraw/init',
      method: 'post',
    });

    this.withdrawVerify = Account.registerFunction<
      AccountWithdrawVerifyDto,
      AccountWithdrawVerifyResponse
    >({ url: '/withdraw/verify', method: 'post' });

    this.withdrawCancel = Account.registerFunction<
      AccountWithdrawCancelDto,
      AccountWithdrawCancelResponse
    >({ url: '/withdraw/verify', method: 'post' });
  }

  useAccountHooks() {
    return {
      check: () => {
        return useQuery({
          queryKey: 'check',
          queryFn: async() => this.check.bind(this)
        });
      },
      withdrawInit: () => {
        return useQuery({
          queryKey: 'withdrawInit',
          queryFn: async() => this.withdrawInit.bind(this)
        });
      },
      withdrawCancel: () => {
        return useQuery({
          queryKey: 'withdrawCancel',
          queryFn: async() => this.withdrawCancel.bind(this)
        });
      },
      withdrawVerify: () => {
        return useQuery({
          queryKey: 'withdrawVerify',
          queryFn: async() => this.withdrawVerify.bind(this)
        });
      }

    };
  };
}
