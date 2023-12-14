const {
  APPLICATION_RECORD_TYPES_MAP,
  ApplicationRecordTypes,
} = require('utils/constants');

export const RECORD_AMOUNT_VALIDATION_ALERT = {
  key: 'records-amount-validation-alert',
  variation: 'error',
  message: 'You must enter at least one record',
};

export const [
  INCOMES_OWNERS_VALIDATION_ALERT,
  SAVINGS_OWNERS_VALIDATION_ALERT,
  DEBTS_OWNERS_VALIDATION_ALERT,
] = Object.entries(APPLICATION_RECORD_TYPES_MAP).map(([key, value]) => {
  const article = key === ApplicationRecordTypes.INCOME ? 'an' : 'a';
  return {
    key: `${value}-records-owner-validation-alert`,
    variation: 'error',
    message: `All household members older than 18 that are employed must have ${article} ${value.toLowerCase()} record`,
  };
});

export const GENERAL_OWNERS_VALIDATION_ALERT = {
  key: `general-records-owner-validation-alert`,
  variation: 'error',
  message: `All household members older than 18 that are employed must have a record`,
};
