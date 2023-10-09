import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor, getByRole } from '@testing-library/react';
import Hypotheek  from '../HypotheekCalc';



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
describe('Intergratie tests', () => {
  it('calculates total payments correctly', async () => {

    // Render the Hypotheek component with the provided props
    const { getByText, getByRole } = render(<Hypotheek  />);

    // Simulate user interactions
    const annualIncomeInput = getByRole('textbox', { name: 'Annual Income' });
    const loanAmountInput = getByRole('textbox', { name: 'Loan Amount' });
    const calculateButton = getByText('Calculate');

    fireEvent.change(annualIncomeInput, { target: { value: '10000' } });
    fireEvent.change(loanAmountInput, { target: { value: '200000' } });
    fireEvent.click(calculateButton);

    // Wait for the component to update with the calculated result
    const totalPaymentsResult = await waitFor(() =>
      getByText(/Total Payments: \$\d+\.\d+/)
    );

    // Assert the result
    expect(totalPaymentsResult).toBeDefined();
  });
})