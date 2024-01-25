export const getTestTotalMonthlyIncomes = (incomeRecords) =>
  incomeRecords.reduce(
    (total, income) => total + income.props.monthlyIncome,
    0
  );

export const getTotalAssetsValue = (assetRecords) =>
  assetRecords.reduce((total, saving) => total + saving.props.currentValue, 0);

export const getTestTotalMonthlyDebts = (debtRecords) =>
  debtRecords.reduce((total, debt) => total + debt.props.monthlyPayment, 0);

export const getTestTotalDebts = (debtRecords) =>
  debtRecords.reduce((total, debt) => total + debt.props.unpaidBalance, 0);

export const getTotalMonthlyIncomes = (incomeRecords) =>
  incomeRecords.reduce(
    (total, income) => total + income.estimatedMonthlyIncome,
    0
  );

export const getTotalSavings = (savingRecords) =>
  savingRecords.reduce((total, saving) => total + saving.estimatedAmount, 0);

export const getTotalMonthlyDebts = (debtRecords) =>
  debtRecords.reduce((total, debt) => total + debt.monthlyRecurrence, 0);

export const getDebtToIncomeRatio = (totalMonthlyDebts, totalMonthlyIncomes) =>
  totalMonthlyDebts / totalMonthlyIncomes;

export const getAmi = (habitatAmiList, householdMembersLength) => {
  // habitatAmiList consists in a list of ranges, mapped by index to the household
  // members amount. So if applicant has one household member the ami to use is in the
  // index 1 of the habitatAmiList, if it has three household members, the index is 3,
  // and so forth.
  // If the amount of household members exceeds the amount of ami items, use
  // the last ami item
  const index =
    householdMembersLength > habitatAmiList.length
      ? habitatAmiList.length - 1
      : householdMembersLength;

  return habitatAmiList[index];
};

export const getIsWithinAmiRange = (ami, totalMonthlyIncomes) => {
  const [minAmi, maxAmi] = ami?.split('-').map(Number) ?? [0, 0];

  return (
    !Number.isNaN(totalMonthlyIncomes) &&
    totalMonthlyIncomes >= minAmi &&
    totalMonthlyIncomes <= maxAmi
  );
};
