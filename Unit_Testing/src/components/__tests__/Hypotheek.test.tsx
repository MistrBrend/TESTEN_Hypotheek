import React from 'react';
import { describe, it, expect } from 'vitest';
import { LoanCalculator } from '../../LoanCalculator';

const annualIncome = 10000;
const selectedFixedRatePeriod = '30 years';
const loanAmount = 200000; 
const hasPartner = true; 
const partnerIncome = 8000; 
const postalCode = '12345'; 
const restrictedPostalCodes = [9679, 9681, 9682];

const MinimumRequirements = {
  MaxLoanIncomeMultiplier: 4.25,

  InterestRates: {
    ONE_YEAR: 0.02,
    FIVE_YEARS: 0.03,
    TEN_YEARS: 0.035,
    TWENTY_YEARS: 0.045,
    THIRTY_YEARS: 0.05,
  },
};

function calculateMaxLoan(annualIncome, partnerIncome, hasPartner) {
  const totalIncome = annualIncome + (hasPartner ? partnerIncome : 0);
  return totalIncome * MinimumRequirements.MaxLoanIncomeMultiplier;
}

function calculateInterestRate(selectedFixedRatePeriod) {
  return MinimumRequirements.InterestRates[selectedFixedRatePeriod];
}

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

describe('Unit tests', () => {
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
describe('Intergratie tests', () => {
  const calculator = new LoanCalculator();
  const maxLoan = calculator.calculateMaxLoan();
  const totalPayments = calculator.calculateTotalPayments(360);


  describe('test class values', () => {
    // expected variables for the LoanCalculator class
    const annualIncome = 10000;
    const selectedFixedRatePeriod = '30 years';
    const loanAmount = 200000;
    const hasPartner = true;
    const partnerIncome = 8000;

    it('annualIncome', async () => {
      expect(calculator.annualIncome).toBe(annualIncome);
    });
    it('selectedFixedRatePeriod', async () => {
      expect(calculator.selectedFixedRatePeriod).toBe(selectedFixedRatePeriod);
    });
    it('loanAmount', async () => {
      expect(calculator.loanAmount).toBe(loanAmount);
    });
    it('hasPartner', async () => {
      expect(calculator.hasPartner).toBe(hasPartner);
    });
    it('partnerIncome', async () => {
      expect(calculator.partnerIncome).toBe(partnerIncome);
    });
  });


  it('LoanCalculator should calculate max loan correctly', async () => {
    const expectedMaxLoan = (annualIncome + partnerIncome) * MinimumRequirements.MaxLoanIncomeMultiplier;
    expect(maxLoan).toBe(expectedMaxLoan);
  });
  it('LoanCalculator should calculate total payments correctly', async () => {
    const annualInterestRate = MinimumRequirements.InterestRates[selectedFixedRatePeriod];
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = 360;
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    const expectedTotalPayments = monthlyPayment * numberOfPayments;
    expect(totalPayments).toBe(expectedTotalPayments);
  });

});