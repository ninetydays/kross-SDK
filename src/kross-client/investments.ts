import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import {
  InvestmentListResponse,
  InvestmentRegisterDto,
  InvestmentRegisterResponse
 } from '../types/kross-client/investments';
export class Investments extends KrossClientBase {
  investmentList: FunctionRegistered<InvestmentListResponse>
  investmentRegister: FunctionRegistered<InvestmentRegisterDto, InvestmentRegisterResponse>

  constructor(options: KrossClientOptions) {
    super(options);

    this.investmentRegister = Investments.registerFunction<InvestmentRegisterDto, InvestmentRegisterResponse>({
      url: '/investments',
      method: 'post'
    })

    this.investmentList = Investments.registerFunction<InvestmentListResponse>({
      url: '/investments',
      method: 'get'
    })
  }
}
