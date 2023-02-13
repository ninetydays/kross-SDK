export const distributedLoanInvestments = (
  loans: Array<{ id: number; availableInvestment: number }>,
  investmentAmount: number
) => {
  let remainingInvestment: number = investmentAmount;
  const investments: Array<{ loanId: number; investment: number }> = [];

  for (let i = 0; i < loans.length; i++) {
    const loan = loans[i];
    const investment = Math.min(
      loan.availableInvestment,
      Math.floor(remainingInvestment / (loans.length - i))
    );
    investments.push({ loanId: loan.id, investment });
    remainingInvestment -= investment;
  }

  const investmentTotals: { [key: number]: number } = {};

  for (const investment of investments) {
    if (!investmentTotals[investment.loanId]) {
      investmentTotals[investment.loanId] = 0;
    }
    investmentTotals[investment.loanId] += investment.investment;
  }

  return investmentTotals;
};
