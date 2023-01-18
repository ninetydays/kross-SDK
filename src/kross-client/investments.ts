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
  InvestmentRegisterResponse,
} from '../types/kross-client/investments';
export class Investments extends KrossClientBase {
  investmentList: FunctionRegistered<InvestmentListResponse>;
  notes: FunctionRegistered<NotesResponse>;
  cmsTradebooks: FunctionRegistered<CmsTradebookResponse>;

  constructor(options: KrossClientOptions) {
    super(options);
    this.cmsTradebooks = Investments.registerFunction<CmsTradebookResponse>({
      url: '/cms-tradebooks',
      method: 'get',
    });

    this.notes = Investments.registerFunction<NotesResponse>({
      url: '/notes',
      method: 'get',
    });

    this.investmentList = Investments.registerFunction<InvestmentListResponse>({
      url: '/investments',
      method: 'get',
    });
  }

  investmentRegister({ amount, loan_id, user_id }: InvestmentRegisterDto) {
    return this.instance.post<InvestmentRegisterResponse>('/investments', {
      amount,
      loan_id,
      user_id,
    });
  }

  investmentCancel({ investment_id }: InvestmentCancelDto) {
    return this.instance.patch<InvestmentCancelResponse>(`/investments/${investment_id}/cancel`, {
      investment_id,
    });
  }

  useInvestmentHooks() {
    return {
      investmentCancel: () => {
        const mutation = useMutation(
          (investmentCancelDto: InvestmentCancelDto) =>
            this.investmentCancel(investmentCancelDto)
        );
        return mutation;
      },
      investmentList: () => {
        return useQuery({
          queryKey: 'investmentList',
          queryFn: async () => await this.investmentList(),
        });
      },
      cmsTradebooks: () => {
        return useQuery({
          queryKey: 'cmsTradebooks',
          queryFn: async () => await this.cmsTradebooks(),
        });
      },
      notes: () => {
        return useQuery({
          queryKey: 'notes',
          queryFn: async () => await this.notes(),
        });
      },
      investmentRegister: () => {
        const mutation = useMutation(
          (investmentRegisterDto: InvestmentRegisterDto) =>
            this.investmentRegister(investmentRegisterDto)
        );
        return mutation;
      },
    };
  }
}
