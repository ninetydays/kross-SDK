import { InvestmentData } from '../types';
import { limitPerBorrower } from './limitPerBorrower';

export const getAmountSumByLoanId = (
  investments: InvestmentData[]
): { [productId: string]: number } => {
  const result: { [productId: string]: number } = {};
  for (const investment of investments) {
    if (!result[investment.productId]) {
      result[investment.productId] = 0;
    }
    result[investment.productId] += investment.amount;
  }
  return result;
};

export const calculateAvailableInvAmount = ({
  loanItem,
  availableAmount,
  investorCode = '',
  investedAmountToBorrower,
}: {
  loanItem: any;
  availableAmount: number;
  investorCode: string;
  investedAmountToBorrower: number;
}) => {
  const { fundAmount, investedAmount } = loanItem;

  const limitPerBorrowerAmount = limitPerBorrower(
    fundAmount,
    investorCode,
    investedAmountToBorrower
  );
  const loanRemainingAmount = fundAmount - investedAmount;

  const availableInvAmount = investorCode
    ? Math.min(
        availableAmount,
        limitPerBorrowerAmount > 0 ? limitPerBorrowerAmount : 0,
        loanRemainingAmount
      )
    : Math.min(availableAmount, loanRemainingAmount);
  return availableInvAmount;
};
