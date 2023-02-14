export const distributedLoanInvestmentsEvenly = (
  loans: Array<{ id: number; amountCanBeInvestedInLoanItem: number }>,
  investmentAmount: number
) => {
  let remainingInvestment: number = investmentAmount;
  const investments: Array<{
    loanId: number;
    investment: number;
    amountCanBeInvestedInLoanItem: number;
  }> = [];

  for (let i = 0; i < loans.length; i++) {
    const loan = loans[i];
    const investment = Math.min(
      loan.amountCanBeInvestedInLoanItem,
      Math.floor(remainingInvestment / (loans.length - i))
    );
    investments.push({
      loanId: loan.id,
      investment,
      amountCanBeInvestedInLoanItem: loan.amountCanBeInvestedInLoanItem,
    });
    remainingInvestment -= investment;
  }

  const investmentTotals: {
    [key: number]: {
      investmentingAmount: number;
      amountCanBeInvestedInLoanItem: number;
    };
  } = {};

  for (const investment of investments) {
    if (!investmentTotals[investment.loanId]) {
      investmentTotals[investment.loanId] = {
        investmentingAmount: 0,
        amountCanBeInvestedInLoanItem: investment.amountCanBeInvestedInLoanItem,
      };
    }
    investmentTotals[investment.loanId] = {
      investmentingAmount:
        investmentTotals[investment.loanId].investmentingAmount +
        investment.investment,
      amountCanBeInvestedInLoanItem: investment.amountCanBeInvestedInLoanItem,
    };
  }

  return investmentTotals;
};

export const distributedLoanInvestments = (
  loans: Array<{ id: number; amountCanBeInvestedInLoanItem: number }>,
  investmentAmount: number
) => {
  const investments: Array<{
    loanId: number;
    investment: number;
    amountCanBeInvestedInLoanItem: number;
  }> = [];

  for (let i = 0; i < loans.length; i++) {
    const loan = loans[i];

    investments.push({
      loanId: loan.id,
      investment: investmentAmount,
      amountCanBeInvestedInLoanItem: loan.amountCanBeInvestedInLoanItem,
    });
  }

  const investmentTotals: {
    [key: number]: {
      investmentingAmount: number;
      amountCanBeInvestedInLoanItem: number;
    };
  } = {};

  for (const investment of investments) {
    if (!investmentTotals[investment.loanId]) {
      investmentTotals[investment.loanId] = {
        investmentingAmount: 0,
        amountCanBeInvestedInLoanItem: investment.amountCanBeInvestedInLoanItem,
      };
    }
    investmentTotals[investment.loanId] = {
      investmentingAmount:
        investmentTotals[investment.loanId].investmentingAmount +
        investment.investment,
      amountCanBeInvestedInLoanItem: investment.amountCanBeInvestedInLoanItem,
    };
  }

  return investmentTotals;
};
