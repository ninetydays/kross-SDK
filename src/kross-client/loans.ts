import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import {
  LoansResponse,
  PaymentScheduleDto,
  PaymentScheduleResponse,
 } from '../types/kross-client/loans';
export class Loans extends KrossClientBase {
  loansData: FunctionRegistered<LoansResponse>
  paymentSchedule: FunctionRegistered<PaymentScheduleDto, PaymentScheduleResponse>
  constructor(options: KrossClientOptions) {
    super(options);

    this.loansData = Loans.registerFunction<LoansResponse>({
      url: '/loans',
      method: 'get'
    })

    this.paymentSchedule = Loans.registerFunction<PaymentScheduleDto, PaymentScheduleResponse>({
      url: `/loans/payment-schedule`,
      method: 'get',
    })
  }
}
