import { ApplicationRecordTypes } from './constants';

export const validateRecords = (records, ownersIDs) =>
  ownersIDs.size === new Set(records.map((record) => record.ownerID)).size;

/**
 * Validates the application records considering that it should be at least one
 * record of every class per owner.
 * @param {*} params
 * @param {IncomeRecord[]} params.incomeRecords
 * @param {SavingRecord[]} params.savingRecords
 * @param {DebtRecord[]} params.debtRecords
 * @param {Owner[]} params.owners
 * @returns {object} object containing wether or not all the records types are valid
 * and a list of the invalid record types if any
 */
export const validateAllApplicationRecords = ({
  incomeRecords,
  savingRecords,
  debtRecords,
  ownersIDs,
}) => {
  // const ownersIDs = new Set(owners.map((owner) => owner.id));

  const invalidRecordTypes = [];

  if (!validateRecords(savingRecords, ownersIDs)) {
    invalidRecordTypes.push(ApplicationRecordTypes.SAVING);
  }

  if (!validateRecords(debtRecords, ownersIDs)) {
    invalidRecordTypes.push(ApplicationRecordTypes.DEBT);
  }

  if (!validateRecords(incomeRecords, ownersIDs)) {
    invalidRecordTypes.push(ApplicationRecordTypes.INCOME);
  }

  return {
    areAllValid: invalidRecordTypes.length <= 0,
    invalidRecordTypes,
  };
};
