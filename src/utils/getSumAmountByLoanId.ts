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
  invLimit,
  investedAmountToBorrower,
}: {
  loanItem: any;
  availableAmount: number;
  invLimit: any;
  investedAmountToBorrower: number;
}) => {
  const { fundAmount, investedAmount } = loanItem;

  const limitPerBorrowerAmount = limitPerBorrower(
    fundAmount,
    invLimit.investor_code,
    investedAmountToBorrower
  );
  const loanRemainingAmount = fundAmount - investedAmount;

  const availableInvAmount = invLimit?.investor_code
    ? Math.min(availableAmount, limitPerBorrowerAmount, loanRemainingAmount)
    : Math.min(availableAmount, loanRemainingAmount);
  return availableInvAmount;
};
