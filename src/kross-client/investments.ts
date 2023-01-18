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
  InvestmentQueryDto
} from '../types/kross-client/investments';
export class Investments extends KrossClientBase {
  investmentList: FunctionRegistered<
    InvestmentQueryDto,
    InvestmentListResponse
  >;
  notes: FunctionRegistered<
    InvestmentQueryDto,  
    NotesResponse
  >;
  cmsTradebooks: FunctionRegistered<
    InvestmentQueryDto,
    CmsTradebookResponse
  >;

  constructor(options: KrossClientOptions) {
    super(options);
    this.cmsTradebooks = Investments.registerFunction<InvestmentQueryDto ,CmsTradebookResponse>({
      url: '/cms-tradebooks',
      method: 'get',
    });

    this.notes = Investments.registerFunction<InvestmentQueryDto ,NotesResponse>({
      url: '/notes',
      method: 'get',
    });

    this.investmentList = Investments.registerFunction<InvestmentQueryDto ,InvestmentListResponse>({
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
      investmentList: (investmentQueryDto: InvestmentQueryDto) => {
        return useQuery({
          queryKey: 'investmentList',
          queryFn: async () => await this.investmentList(investmentQueryDto),
        });
      },
      cmsTradebooks: (investmentQueryDto: InvestmentQueryDto) => {
        return useQuery({
          queryKey: 'cmsTradebooks',
          queryFn: async () => await this.cmsTradebooks(investmentQueryDto),
        });
      },
      notes: (investmentQueryDto: InvestmentQueryDto) => {
        return useQuery({
          queryKey: 'notes',
          queryFn: async () => await this.notes(investmentQueryDto),
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
