import React, { useState } from 'react';
import BackgroundImage from '../assets/vitalii-mazur-Sz-jGntyJMw-unsplash.jpg'


const MinimumRequirements = {
    MaxLoanIncomeMultiplier: 4.25,

    InterestRates: {
        "1 year": 0.02,
        "5 years": 0.03,
        "10 years": 0.035,
        "20 years": 0.045,
        "30 years": 0.05,
    },
};

function Hypotheek() {
    const [annualIncome, setAnnualIncome] = useState();
    const [selectedFixedRatePeriod, setSelectedFixedRatePeriod] = useState("30 years");
    const [loanAmount, setLoanAmount] = useState('');
    const [hasPartner, setHasPartner] = useState(false);
    const [partnerIncome, setPartnerIncome] = useState('');
    const [totalPayments, setTotalPayments] = useState(null);
    const [postalCode, setPostalCode] = useState();

    const handleCalculate = (e) => {
        e.preventDefault();

        const maxLoan = (parseFloat(annualIncome) + (hasPartner ? parseFloat(partnerIncome) : 0)) * MinimumRequirements.MaxLoanIncomeMultiplier;
        const interestRate = MinimumRequirements.InterestRates[selectedFixedRatePeriod];
        const loan = parseFloat(loanAmount);
        const restrictedPostalCodes = [9679, 9681, 9682];
        const enteredPostalCode = parseInt(postalCode);

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
        const total =
            ((loan * interestRate) / 12) * 12 * parseInt(selectedFixedRatePeriod);

        setTotalPayments(total);
    };

    return (
      <>
        <div className='mortage-con'>
          <h1>Mortgage Calculator</h1>
          <form onSubmit={handleCalculate}>
            <div className='input-con'>
              <label>Annual Income</label>
              <input
                type='number'
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
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
                  value={partnerIncome}
                  onChange={(e) => setPartnerIncome(e.target.value)}
                />
              </div>
            )}
            <div className='input-con'>
              <label>Fixed Rate Period</label>
              <select
                value={selectedFixedRatePeriod}
                onChange={(e) => setSelectedFixedRatePeriod(e.target.value)}
              >
                {Object.keys(MinimumRequirements.InterestRates).map(
                  (period) => (
                    <option
                      key={period}
                      value={period}
                    >
                      {period}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className='input-con'>
              <label>Loan Amount</label>
              <input
                type='number'
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
            <div className='input-con'>
              <label>Postal code</label>
              <input
                type='number'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
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
