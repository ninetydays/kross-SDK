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
    >({ url: '/accounts/withdraw/verify', urlParam: 'idempotency_key', method: 'post' });
  }

  check({ bankId, accountNumber, name }: AccountCheckDto) {
    return this.instance.post<AccountCheckDto, AccountCheckResponse>(
      '/accounts/check',
      {
        bankId,
        accountNumber,
        name,
      }
    );
  }
  withdrawVerify({ idempotency_key, verify_code }: AccountWithdrawVerifyDto) {
    return this.instance.post<
      AccountWithdrawVerifyDto,
      AccountWithdrawVerifyResponse
    >('/accounts/withdraw/verify', {
      idempotency_key,
      verify_code,
    });
  }
  withdrawInit({ member_no, amount }: AccountWithdrawInitDto) {
    return this.instance.post<
      AccountWithdrawInitDto,
      AccountWithdrawInitResponse
    >('/accounts/withdraw/init', {
      member_no,
      amount,
    });
  }

  useAccountHooks() {
    return {
      check: () => {
        const mutation = useMutation((accountCheckDto: AccountCheckDto) =>
        this.check.bind(this)(accountCheckDto)
      );
      return mutation;
      },
      withdrawInit: () => {
        const mutation = useMutation((accountWithdrawInitDto: AccountWithdrawInitDto) =>
        this.withdrawInit.bind(this)(accountWithdrawInitDto)
      );
      return mutation;
      },
      withdrawCancel: () => {
        const mutation = useMutation((accountWithdrawCancelDto: AccountWithdrawCancelDto) =>
        this.withdrawCancel.bind(this)(accountWithdrawCancelDto)
      );
      return mutation;
      },
      withdrawVerify: () => {
        const mutation = useMutation((accountWithdrawVerifyDto: AccountWithdrawVerifyDto) =>
        this.withdrawVerify.bind(this)(accountWithdrawVerifyDto)
      );
      return mutation;
      },
    };
  }
}
