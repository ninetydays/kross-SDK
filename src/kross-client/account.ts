import { KrossClientBase } from './base'
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
} from '../types'

export class Account extends KrossClientBase {
  check: FunctionRegistered<AccountCheckDto, AccountCheckResponse>
  withdrawInit: FunctionRegistered<
    AccountWithdrawInitDto,
    AccountWithdrawInitResponse
  >
  withdrawVerify: FunctionRegistered<
    AccountWithdrawVerifyDto,
    AccountWithdrawVerifyResponse
  >
  withdrawCancel: FunctionRegistered<
    AccountWithdrawCancelDto,
    AccountWithdrawCancelResponse
  >

  constructor(options: KrossClientOptions) {
    super(options)

    this.check = Account.registerFunction<
      AccountCheckDto,
      AccountCheckResponse
    >({
      url: '/accounts/check',
      method: 'post',
    })

    this.withdrawInit = Account.registerFunction<
      AccountWithdrawInitDto,
      AccountWithdrawInitResponse
    >({
      url: '/withdraw/init',
      method: 'post',
    })

    this.withdrawVerify = Account.registerFunction<
      AccountWithdrawVerifyDto,
      AccountWithdrawVerifyResponse
    >({ url: '/withdraw/verify', method: 'post' })

    this.withdrawCancel = Account.registerFunction<
      AccountWithdrawCancelDto,
      AccountWithdrawCancelResponse
    >({ url: '/withdraw/verify', method: 'post' })
  }
}
