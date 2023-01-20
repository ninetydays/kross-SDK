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
  InvestmentQueryDto,
  TransactionHistoryDto,
} from '../types/kross-client/investments';

export class Investments extends KrossClientBase {
  investmentList: FunctionRegistered<
    InvestmentQueryDto,
    InvestmentListResponse
  >;
  notes: FunctionRegistered<InvestmentQueryDto, NotesResponse>;
  cmsTradebook: FunctionRegistered<InvestmentQueryDto, CmsTradebookResponse>;

  constructor(options: KrossClientOptions) {
    super(options);
    this.storage.getItem('authToken').then((value: string | null) => {
      this.authToken = value as string;
    });
    this.cmsTradebook = Investments.registerFunction<
      InvestmentQueryDto,
      CmsTradebookResponse
    >({
      url: '/cms-tradebooks',
      method: 'get',
    });

    this.notes = Investments.registerFunction<
      InvestmentQueryDto,
      NotesResponse
    >({
      url: '/notes',
      method: 'get',
    });

    this.investmentList = Investments.registerFunction<
      InvestmentQueryDto,
      InvestmentListResponse
    >({
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
    return this.instance.patch<InvestmentCancelResponse>(
      `/investments/${investment_id}/cancel`,
      {
        investment_id,
      }
    );
  }

  async transactionHistory({ fromDate, toDate }: TransactionHistoryDto) {
    const resp = await this.cmsTradebook({
      query: {
        // member_no, we do not need member_no since it prints user related data
        category: {
          in: [
            'deposit',
            'withdraw',
            'invest',
            'distribute',
            'merchant_withdraw',
            'merchant_deposit',
          ],
        },
        created_at: {
          gte: fromDate,
          lte: toDate,
        },
      },
      sort_by: 'created_at.desc',
    });
    return resp;
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
      cmsTradebook: (investmentQueryDto: InvestmentQueryDto) => {
        return useQuery({
          queryKey: 'cmsTradebooks',
          queryFn: async () => await this.cmsTradebook(investmentQueryDto),
        });
      },
      notes: (investmentQueryDto: InvestmentQueryDto) => {
        return useQuery({
          queryKey: 'notes',
          queryFn: async () => await this.notes(investmentQueryDto),
        });
      },
      transactionHistory: (transactionHistoryDto: TransactionHistoryDto) => {
        return useQuery({
          queryKey: 'transactionHistory',
          queryFn: async () =>
            await this.transactionHistory(transactionHistoryDto),
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
