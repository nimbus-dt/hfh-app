/**
 *  Calculates age from dob
 * @param {string} dob date of birth as a ISO string
 * @returns {number} age
 */
export const calculateAge = (dob) => {
  const dobDate = new Date(dob);
  const currentDate = new Date();

  const yearsDiff = currentDate.getFullYear() - dobDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const dobMonth = dobDate.getMonth();

  if (
    currentMonth < dobMonth ||
    (currentMonth === dobMonth && currentDate.getDate() <= dobDate.getDate())
  ) {
    // If the current month and day is earlier than the DOB, subtract 1 from the age.
    return yearsDiff - 1;
  }

  return yearsDiff;
};

/**
 *  Returns weather a person is an adult (>18 yo) or not
 * @param {string} dob date of birth as a ISO string
 * @returns {boolean}
 */
export const isAdult = (dob) => {
  const age = calculateAge(dob);

  return age >= 18;
};
