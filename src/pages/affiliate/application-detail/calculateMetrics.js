// TODO separate each metric calculations in different functions
// !If these functions are needed in other components, move to utils directory
export function calculateMetrics({
  selectedApplication,
  householdMembers,
  savings,
  incomes,
  debts,
  habitat,
  totalMembers,
}) {
  if (
    !selectedApplication ||
    householdMembers.length <= 0 ||
    savings.length <= 0
  ) {
    return {
      totalMonthlyIncomes: 0,
      totalSavings: 0,
      totalMonthlyDebts: 0,
      debtToIncomeRatio: 0,
      ami: 0,
      amiRange: 'Yes',
    };
  }

  const savingsPlaceholder = savings
    .reduce((total, saving) => total + saving.estimatedAmount, 0)
    .toFixed(2);

  const monthlyIncomePlaceholder = incomes
    .reduce((total, income) => total + income.estimatedMonthlyIncome, 0)
    .toFixed(2);

  const monthlyDebtPlaceholder = debts
    .reduce((total, debt) => total + debt.monthlyRecurrence, 0)
    .toFixed(2);

  const debtToIncomeRatioPlaceholder = `${(
    (monthlyDebtPlaceholder / monthlyIncomePlaceholder) *
    100
  ).toFixed(2)}%`;

  const habitatAmi = habitat?.AMI || [];
  const rangePlaceholder = habitatAmi[totalMembers - 1];
  const range = rangePlaceholder;
  const amiPlaceholder = range;

  const [minAmi, maxAmi] = range?.split('-').map(Number) ?? [0, 0];

  let amiRangePlaceholder = 'Yes';
  if (
    !Number.isNaN(monthlyIncomePlaceholder) &&
    monthlyIncomePlaceholder >= minAmi &&
    monthlyIncomePlaceholder <= maxAmi
  ) {
    amiRangePlaceholder = 'Yes';
  } else {
    amiRangePlaceholder = 'No';
  }

  return {
    totalMonthlyIncomes: monthlyIncomePlaceholder,
    totalSavings: savingsPlaceholder,
    totalMonthlyDebts: monthlyDebtPlaceholder,
    debtToIncomeRatio: debtToIncomeRatioPlaceholder,
    ami: amiPlaceholder,
    amiRange: amiRangePlaceholder,
  };
}
