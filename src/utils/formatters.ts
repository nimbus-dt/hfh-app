/* eslint-disable @typescript-eslint/no-explicit-any */

import { Habitat, TestApplication, TestCycle } from 'models';

/**
 * Returns a string with all the clases joined by empty space
 * @param {...string} classes
 * @returns {string}
 */
export const concatClassNames = (...classes: any) =>
  classes.filter(Boolean).join(' ');

/**
 * Returns a string with the application submitted status value as a human
 * readable string
 * @param {object} value
 * @returns {string}
 */
export const formatYesNoBoolean = (value: any) => (value ? 'Yes' : 'No');

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
/**
 * Returns a currency string
 * @param {number} value i.e.: 240.4967298
 * @returns {string} i.e.: $240.49
 */
export const formatNumberAsCurrency = (num: any) => USDollar.format(num);

const Percentage = new Intl.NumberFormat('default', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
/**
 * Returns a percentage string
 * @param {number} ratio i.e.: 0.4958
 * @returns {string} i.e.: 49.58 %
 */
export const formatNumberAsPercentage = (num: any) => Percentage.format(num);

/**
 * Returns a phone number string with format (XXX) XXX-XXXX
 * @param {string} unformattedNumber i.e.: 8005550100, 800 555 0100, (800) 5550100
 * @returns {string} i.e.: (800) 555‑0100
 */
export const formatPhoneNumber = (unformattedNumber: any) => {
  const formattedNumber = unformattedNumber
    .replace(/[^\d\b]/g, '')
    .substring(0, 10)
    .replace(/^(\d{1})/, '($1')
    .replace(/^(\(\d{3})(\d{1})/, '$1)$2')
    .replace(/^(\(\d{3}\))(\d{1})/, '$1 $2')
    .replace(/^(\(\d{3}\))\s(\d{3})(\d{1})/, '$1 $2-$3');

  return formattedNumber;
};

export const formatHabitatCycleApplicationData = ({
  habitat,
  cycle,
  application,
  error,
}: {
  habitat?: Habitat;
  cycle?: TestCycle;
  application?: TestApplication;
  error?: unknown;
}) => {
  let errorMessage: string | undefined;

  if (error) {
    errorMessage = error instanceof Error ? error.message : String(error);
  }

  return {
    habitat_city: habitat?.city || 'unknown',
    habitat_created_at: habitat?.createdAt || 'unknown',
    habitat_id: habitat?.id || 'unknown',
    habitat_long_name: habitat?.longName || 'unknown',
    habitat_name: habitat?.name || 'unknown',
    habitat_state: habitat?.state || 'unknown',
    habitat_updated_at: habitat?.updatedAt || 'unknown',
    habitat_url_name: habitat?.urlName || 'unknown',
    cycle_created_at: cycle?.createdAt || 'unknown',
    cycle_end_date: cycle?.endDate || 'unknown',
    cycle_id: cycle?.id || 'unknown',
    cycle_is_open: cycle?.isOpen || 'unknown',
    cycle_root_form_ID: cycle?.rootformID || 'unknown',
    cycle_start_date: cycle?.startDate || 'unknown',
    cycle_updated_at: cycle?.updatedAt,
    application_created_at: application?.createdAt || 'unknown',
    application_id: application?.id || 'unknown',
    application_owner_id: application?.ownerID || 'unknown',
    application_review_status: application?.reviewStatus || 'unknown',
    application_submission_status: application?.submissionStatus || 'unknown',
    application_submitted_date: application?.submittedDate || 'unknown',
    application_cycle_id: application?.testcycleID || 'unknown',
    application_type: application?.type || 'unknown',
    application_updated_at: application?.updatedAt || 'unknown',
    error_mesage: errorMessage,
  };
};
