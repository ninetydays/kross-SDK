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
      url: '/accounts/withdraw/verify',
      urlParam: 'idempotency_key',
      method: 'post',
    });
  }

  check({ bankId, accountNumber, name }: AccountCheckDto) {
    return this.instance.post<AccountCheckResponse>('/accounts/check', {
      bankId,
      accountNumber,
      name,
    });
  }
  withdrawVerify({ idempotency_key, verify_code }: AccountWithdrawVerifyDto) {
    return this.instance.post<AccountWithdrawVerifyResponse>(
      '/accounts/withdraw/verify',
      {
        idempotency_key,
        verify_code,
      }
    );
  }
  withdrawInit({ member_no, amount }: AccountWithdrawInitDto) {
    return this.instance.post<AccountWithdrawInitResponse>(
      '/accounts/withdraw/init',
      {
        member_no,
        amount,
      }
    );
  }

  useAccountHooks() {
    return {
      check: () => {
        const mutation = useMutation((accountCheckDto: AccountCheckDto) =>
          this.check(accountCheckDto).then((resp) => resp.data)
        );
        return mutation;
      },
      withdrawInit: () => {
        const mutation = useMutation(
          (accountWithdrawInitDto: AccountWithdrawInitDto) =>
            this.withdrawInit(accountWithdrawInitDto).then((resp) => resp.data)
        );
        return mutation;
      },
      withdrawCancel: () => {
        const mutation = useMutation(
          (accountWithdrawCancelDto: AccountWithdrawCancelDto) =>
            this.withdrawCancel(accountWithdrawCancelDto).then(
              (resp) => resp.data
            )
        );
        return mutation;
      },
      withdrawVerify: () => {
        const mutation = useMutation(
          (accountWithdrawVerifyDto: AccountWithdrawVerifyDto) =>
            this.withdrawVerify(accountWithdrawVerifyDto).then(
              (resp) => resp.data
            )
        );
        return mutation;
      },
    };
  }
}
