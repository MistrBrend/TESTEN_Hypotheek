import { describe, it, expect } from 'vitest';
import { Hypotheek } from '../HypotheekCalc';

const annualIncome = 10000;
const selectedFixedRatePeriod = '30 years';
const loanAmount = 200000; // Sample loan amount for testing
const hasPartner = true; // Sample partner status for testing
const partnerIncome = 8000; // Sample partner income for testing
const postalCode = '12345'; // Sample postal code for testing
const restrictedPostalCodes = [9679, 9681, 9682];

const MinimumRequirements = {
  MaxLoanIncomeMultiplier: 4.25,

  InterestRates: {
    '1 year': 0.02,
    '5 years': 0.03,
    '10 years': 0.035,
    '20 years': 0.045,
    '30 years': 0.05,
  }
}

// Function to calculate max loan
function calculateMaxLoan(annualIncome, partnerIncome, hasPartner) {
  const totalIncome = annualIncome + (hasPartner ? partnerIncome : 0);
  return totalIncome * MinimumRequirements.MaxLoanIncomeMultiplier;
}

// Function to calculate interest rate
function calculateInterestRate(selectedFixedRatePeriod) {
  return MinimumRequirements.InterestRates[selectedFixedRatePeriod];
}

// Function to calculate total payments
function calculateTotalPayments(
  loanAmount,
  annualInterestRate,
  loanTermMonths
) {
  const monthlyInterestRate = annualInterestRate / 12;
  const numberOfPayments = loanTermMonths;

  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  const totalPayments = monthlyPayment * numberOfPayments;
  return totalPayments;
}



//   const loan = parseFloat(loanAmount);


//   // Calculate total payments
//   const total = calculateTotalPayments(
//     ((loan * interestRate) / 12) * 12 * parseInt(selectedFixedRatePeriod)
//   );

//   setTotalPayments(total);
// };


describe('Hypotheek function', () => {
  describe('postal code', () => {
    it('is postal restricted?', () => {
      expect(restrictedPostalCodes).not.toContain(Number(postalCode));
    });
  });
  describe('max loan', () => {
    it('Calculate Max Loan', () => {
      const expectedMaxLoan =
        (annualIncome + (hasPartner ? partnerIncome : 0)) *
        MinimumRequirements.MaxLoanIncomeMultiplier;

      const calculatedMaxLoan = calculateMaxLoan(
        annualIncome,
        partnerIncome,
        hasPartner
      );

      expect(calculatedMaxLoan).toBe(expectedMaxLoan);
    });
  });
  describe('calculate Interest Rate', () => {
    it('calculates the interest rate correctly for a given fixed rate period', () => {
      const expectedInterestRate =
        MinimumRequirements.InterestRates[selectedFixedRatePeriod];

      const calculatedInterestRate = calculateInterestRate(
        selectedFixedRatePeriod
      );

      expect(calculatedInterestRate).toBe(expectedInterestRate);
    });
  });
  describe('Partner', () => {
    it('Does he have an partner?', () => {
        expect(hasPartner).toBe(true);
    });
  });
  describe('Total', () => {
    it('Total payments calculation', () => {
      const interestRate = MinimumRequirements.InterestRates[selectedFixedRatePeriod];
      const monthlyInterestRate = interestRate / 12;
      const numberOfPayments = parseInt(selectedFixedRatePeriod) * 12;
      const monthlyPayment =
        (loanAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      const expectedTotalPayments = monthlyPayment * numberOfPayments;

      const calculatedTotalPayments = calculateTotalPayments(
        loanAmount,
        interestRate,
        numberOfPayments
      );

      expect(calculatedTotalPayments).toBe(expectedTotalPayments);
    });
  });
});
