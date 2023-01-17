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
  investmentCancel: FunctionRegistered<
    InvestmentCancelDto,
    InvestmentCancelResponse
  >;
  investmentList: FunctionRegistered<InvestmentListResponse>;
  notes: FunctionRegistered<NotesResponse>;
  cmsTradebooks: FunctionRegistered<CmsTradebookResponse>;

  constructor(options: KrossClientOptions) {
    super(options);
    this.cmsTradebooks = Investments.registerFunction<CmsTradebookResponse>({
      url: 'cms-tradebooks',
      method: 'get',
    });

    this.notes = Investments.registerFunction<NotesResponse>({
      url: '/notes',
      method: 'get',
    });

    this.investmentCancel = Investments.registerFunction<
      InvestmentCancelDto,
      InvestmentCancelResponse
    >({
      url: `/investments/:investment_id/cancel`,
      urlParam: 'investment_id',
      method: 'patch',
    });
    this.investmentList = Investments.registerFunction<InvestmentListResponse>({
      url: '/investments',
      method: 'get',
    });
  }

  investmentRegister({ amount, loan_id, user_id }: InvestmentRegisterDto) {
    return this.instance.post<
      InvestmentRegisterDto,
      InvestmentRegisterResponse
    >('/investments', {
      amount,
      loan_id,
      user_id,
    });
  }

  useInvestmentHooks() {
    return {
      investmentCancel: () => {
        const mutation = useMutation(
          (investmentCancelDto: InvestmentCancelDto) =>
            this.investmentCancel.bind(this)(investmentCancelDto)
        );
        return mutation;
      },
      investmentList: () => {
        return useQuery({
          queryKey: 'investmentList',
          queryFn: async () => this.investmentList.bind(this),
        });
      },
      cmsTradebooks: () => {
        return useQuery({
          queryKey: 'cmsTradebooks',
          queryFn: async () => this.cmsTradebooks.bind(this),
        });
      },
      notes: () => {
        return useQuery({
          queryKey: 'notes',
          queryFn: async () => this.notes.bind(this),
        });
      },
      investmentRegister: () => {
        const mutation = useMutation(
          (investmentRegisterDto: InvestmentRegisterDto) =>
            this.investmentRegister.bind(this)(investmentRegisterDto)
        );
        return mutation;
      },
    };
  }
}
