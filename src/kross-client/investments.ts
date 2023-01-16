import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { useQuery, useMutation } from 'react-query';
import {
  InvestmentCancelDto,
  InvestmentCancelResponse,
  InvestmentListResponse,
  InvestmentRegisterDto,
  NotesResponse,
  CmsTradebookResponse,
 } from '../types/kross-client/investments';
export class Investments extends KrossClientBase {
  investmentCancel: FunctionRegistered<InvestmentCancelDto, InvestmentCancelResponse>
  investmentList: FunctionRegistered<InvestmentListResponse>
  notes: FunctionRegistered<NotesResponse>
  cmsTradebooks: FunctionRegistered<CmsTradebookResponse>

  constructor(options: KrossClientOptions) {
    super(options);
    this.cmsTradebooks = Investments.registerFunction<CmsTradebookResponse>({
      url: 'cms-tradebooks',
      method: 'get',
    })

    this.notes = Investments.registerFunction<NotesResponse>({
      url: '/notes',
      method: 'get',
    })

    this.investmentCancel = Investments.registerFunction<InvestmentCancelDto, InvestmentCancelResponse>({
      url: `/investments/:investment_id/cancel`,
      urlParam: 'investment_id',
      method: 'patch',
    })
    this.investmentList = Investments.registerFunction<InvestmentListResponse>({
      url: '/investments',
      method: 'get'
    })
  }

  investmentRegister({ amount, loan_id, user_id }: InvestmentRegisterDto) {
    return this.instance.post<InvestmentRegisterDto>('/investments', {
      amount,
      loan_id,
      user_id,
    });
  }

  useInvestmentHooks() {
    return {
      investmentCancel: () => {
        const mutation = useMutation((investmentCancelDto: InvestmentCancelDto) =>
          this.investmentCancel.bind(this)(investmentCancelDto)
        );
        return mutation;
      },
      investmentList: () => {
        return useQuery('investmentList', () => this.investmentList)
      },
      cmsTradebooks: () => {
        return useQuery('cmsTradebooks', () => this.cmsTradebooks)
      },
      notes: () => {
        return useQuery('notes', () => this.notes)
      },
      investmentRegister: () => {
        const mutation = useMutation((investmentRegisterDto: InvestmentRegisterDto) =>
          this.investmentRegister.bind(this)(investmentRegisterDto)
        );
        return mutation;
      },
    };
  };
}
