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
} from '../types';
import { parseJwt } from '../utils/encryptor';

export class Account extends KrossClientBase {
  withdrawCancel: FunctionRegistered<
    AccountWithdrawCancelDto,
    AccountWithdrawCancelResponse
  >;

  constructor(options: KrossClientOptions) {
    super(options);

    this.withdrawCancel = Account.registerFunction<
      AccountWithdrawCancelDto,
      AccountWithdrawCancelResponse
    >({
      url: '/accounts/withdraw/cancel',
      urlParam: 'idempotency_key',
      method: 'post',
    });
  }

  check(accountCheckDto: AccountCheckDto) {
    return this.instance.post<AccountCheckResponse>('/accounts/check', {
      accountCheckDto,
    });
  }
  withdrawVerify(accountWithdrawVerifyDto: AccountWithdrawVerifyDto) {
    return this.instance.post<AccountWithdrawVerifyResponse>(
      '/accounts/withdraw/verify',
      accountWithdrawVerifyDto
    );
  }
  async withdrawInit(amount: number) {
    const authToken = '';
    const userData = await parseJwt(authToken as string);
    const accountWithdrawInitDto = {
      amount,
      member_no: userData.member_no,
    };
    return this.instance.post<AccountWithdrawInitResponse>(
      '/accounts/withdraw/init',
      accountWithdrawInitDto as AccountWithdrawInitDto
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
      withdrawInit: () => {
        const mutation = useMutation((amount: number) =>
          this.withdrawInit(amount)
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
