export const limitPerBorrower = (
  fundAmount: number,
  investorCode: string,
  investedAmountToBorrower: number
) => {
  switch (investorCode) {
    case 'I110':
      return 5000000 - investedAmountToBorrower;
    case 'I120':
      return 20000000 - investedAmountToBorrower;
    case 'I130':
    case 'I310':
      return fundAmount * 0.4;
    default:
      return 0;
  }
};
