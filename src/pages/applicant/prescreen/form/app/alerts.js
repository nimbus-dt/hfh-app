const { APPLICATION_RECORD_TYPES_MAP } = require('utils/constants');

export const RECORD_AMOUNT_VALIDATION_ALERT = {
  key: 'records-amount-validation-alert',
  variation: 'error',
  message: 'You must enter at least one record',
};

export const [
  INCOMES_OWNERS_VALIDATION_ALERT,
  SAVINGS_OWNERS_VALIDATION_ALERT,
  DEBTS_OWNERS_VALIDATION_ALERT,
] = Object.entries(APPLICATION_RECORD_TYPES_MAP).map(([key, value]) => ({
  key: `${value}-records-owner-validation-alert`,
  variation: 'error',
  message: `Records for owners missing in ${value} records`,
}));
