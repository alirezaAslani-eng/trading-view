const WEIGHTS_START = 10;

function isValidNationalCodeFormat(nationalCode: string): boolean {
  if (!nationalCode || nationalCode.length !== 10) return false;

  const digits = nationalCode.split("").map(Number);

  // 9 first digits only
  const bodyDigits = digits.slice(0, 9);

  const checkDigit = digits[9];

  // weighted sum
  const weightedSum = bodyDigits.reduce((sum, digit, index) => {
    return sum + digit * (WEIGHTS_START - index);
  }, 0);

  const remainder = weightedSum % 11;

  // validation rules
  if (remainder < 2) return remainder === checkDigit;

  return 11 - remainder === checkDigit;
}

export default isValidNationalCodeFormat;
