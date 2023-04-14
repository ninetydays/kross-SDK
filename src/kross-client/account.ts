import { KrossClientBase } from './base';
import { useMutation } from 'react-query';
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
  AccountRegisterDto,
  AccountRegisterResponse,
  AccountVerifyDto,
  AccountVerifyResponse,
} from '../types';

export class Account extends KrossClientBase {
  withdrawCancel: FunctionRegistered<
    AccountWithdrawCancelResponse,
    AccountWithdrawCancelDto
  >;

  constructor(options: KrossClientOptions) {
    super(options);

    this.withdrawCancel = Account.registerFunction<
      AccountWithdrawCancelResponse,
      AccountWithdrawCancelDto
    >({
      url: '/accounts/withdraw/cancel',
      urlParam: 'idempotency_key',
      method: 'patch',
    });
  }

  check(accountCheckDto: AccountCheckDto) {
    return this.instance.post<AccountCheckResponse>('/accounts/check', {
      ...accountCheckDto,
    });
  }

  register(accountRegisterDto: AccountRegisterDto) {
    return this.instance.post<AccountRegisterResponse>('/accounts/register', {
      ...accountRegisterDto,
    });
  }
  verify(accountVerifyDto: AccountVerifyDto) {
    return this.instance.post<AccountVerifyResponse>('/accounts/verify', {
      ...accountVerifyDto,
    });
  }
  withdrawVerify(accountWithdrawVerifyDto: AccountWithdrawVerifyDto) {
    return this.instance.post<AccountWithdrawVerifyResponse>(
      '/accounts/withdraw/verify',
      accountWithdrawVerifyDto
    );
  }
  async withdrawInit(accountWithdrawInitDto: AccountWithdrawInitDto) {
    return this.instance.post<AccountWithdrawInitResponse>(
      '/accounts/withdraw/init',
      accountWithdrawInitDto
    );
  }

  useAccountHooks() {
    return {
      check: () => {
        const mutation = useMutation((accountCheckDto: AccountCheckDto) =>
          this.check(accountCheckDto)
        );
        return mutation;
      },
      register: () => {
        const mutation = useMutation((accountRegisterDto: AccountRegisterDto) =>
          this.register(accountRegisterDto)
        );
        return mutation;
      },
      verify: () => {
        const mutation = useMutation((accountVerifyDto: AccountVerifyDto) =>
          this.verify(accountVerifyDto)
        );
        return mutation;
      },
      withdrawInit: () => {
        const mutation = useMutation(
          (accountWithdrawInitDto: AccountWithdrawInitDto) =>
            this.withdrawInit(accountWithdrawInitDto)
        );
        return mutation;
      },
      withdrawCancel: () => {
        const mutation = useMutation(
          (accountWithdrawCancelDto: AccountWithdrawCancelDto) =>
            this.withdrawCancel(accountWithdrawCancelDto)
        );
        return mutation;
      },
      withdrawVerify: () => {
        const mutation = useMutation(
          (accountWithdrawVerifyDto: AccountWithdrawVerifyDto) =>
            this.withdrawVerify(accountWithdrawVerifyDto)
        );
        return mutation;
      },
    };
  }
}
