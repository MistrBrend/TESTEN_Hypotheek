import React, { useState, ChangeEvent, FormEvent } from 'react';

interface MinimumRequirements {
  MaxLoanIncomeMultiplier: number;
  InterestRates: Record<string, number>;
}

const MinimumRequirements: MinimumRequirements = {
  MaxLoanIncomeMultiplier: 4.25,
  InterestRates: {
    "1 year": 0.02,
    "5 years": 0.03,
    "10 years": 0.035,
    "20 years": 0.045,
    "30 years": 0.05,
  },
};

const Hypotheek = () => {
  const [annualIncome, setAnnualIncome] = useState<number | undefined>(undefined);
  const [selectedFixedRatePeriod, setSelectedFixedRatePeriod] = useState<string>('30 years');
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [hasPartner, setHasPartner] = useState<boolean>(false);
  const [partnerIncome, setPartnerIncome] = useState<number | undefined>(undefined);
  const [totalPayments, setTotalPayments] = useState<string | null>(null); // Changed the type here
  const [postalCode, setPostalCode] = useState<string | undefined>(undefined);

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();

    const annualIncomeValue = annualIncome || 0; // Use 0 as the default if annualIncome is undefined
    const partnerIncomeValue = hasPartner ? (partnerIncome || 0) : 0; // Use 0 as the default if partnerIncome is undefined
    const maxLoan =
      (annualIncomeValue + partnerIncomeValue) * MinimumRequirements.MaxLoanIncomeMultiplier;
    const interestRate = MinimumRequirements.InterestRates[selectedFixedRatePeriod];
    const loan = parseFloat(loanAmount);
    const restrictedPostalCodes = [9679, 9681, 9682];
    const enteredPostalCode = parseInt(postalCode || '', 10); // Added base 10 for parseInt

    if (restrictedPostalCodes.includes(enteredPostalCode)) {
      alert('Mortgage not available for your postal code.');
      return;
    }

    if (isNaN(loan)) {
      // Handle invalid input
      alert('Please enter a valid loan amount.');
      return;
    }

    // Calculate total payments
    const numPayments = parseInt(selectedFixedRatePeriod, 10); // Added base 10 for parseInt
    const monthlyInterestRate = interestRate / 12;
    const monthlyPayment = (loan * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numPayments));
    const calculatedTotalPayments = (monthlyPayment * numPayments).toFixed(2);

    setTotalPayments(calculatedTotalPayments);
  };

  return (
    <>
      <div className='mortgage-con'>
        <h1>Mortgage Calculator</h1>
        <form onSubmit={handleCalculate}>
          <div className='input-con'>
            <label>Annual Income</label>
            <input
              type='number'
              value={annualIncome || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAnnualIncome(parseFloat(e.target.value))}
            />
          </div>
          <div className='input-con optional'>
            <label>Do you have a partner?</label>
            <input
              type='checkbox'
              checked={hasPartner}
              onChange={() => setHasPartner(!hasPartner)}
              className='custom-checkbox'
            />
          </div>
          {hasPartner && (
            <div className='input-con appear-on-checked'>
              <label>Partner's Income</label>
              <input
                type='number'
                value={partnerIncome || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPartnerIncome(parseFloat(e.target.value))}
              />
            </div>
          )}
          <div className='input-con'>
            <label>Fixed Rate Period</label>
            <select
              value={selectedFixedRatePeriod}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedFixedRatePeriod(e.target.value)}
            >
              {Object.keys(MinimumRequirements.InterestRates).map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>
          <div className='input-con'>
            <label>Loan Amount</label>
            <input
              type='number'
              value={loanAmount}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLoanAmount(e.target.value)}
            />
          </div>
          <div className='input-con'>
            <label>Postal code</label>
            <input
              type='number'
              value={postalCode || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPostalCode(e.target.value)}
            />
          </div>
          <button type='submit'>Calculate</button>
        </form>
      </div>
      {totalPayments !== null && (
        <div className='result-con'>
          <div>
            <h2>Results</h2>
            <p>
              Annual Income: <strong>{annualIncome}</strong>
            </p>
            {hasPartner && (
              <p>
                Partner's Income: <strong>{partnerIncome}</strong>
              </p>
            )}
            <p>
              Fixed Rate Period: <strong>{selectedFixedRatePeriod}</strong>
            </p>
            <p>
              Loan Amount: <strong>{loanAmount}</strong>
            </p>
            <p>
              Total Payments over Loan Term: <strong>{totalPayments}</strong>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Hypotheek;
