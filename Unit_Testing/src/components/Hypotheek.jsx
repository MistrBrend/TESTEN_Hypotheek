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
    const [annualIncome, setAnnualIncome] = useState(60000);
    const [selectedFixedRatePeriod, setSelectedFixedRatePeriod] = useState("30 years");
    const [loanAmount, setLoanAmount] = useState('');
    const [hasPartner, setHasPartner] = useState(false);
    const [partnerIncome, setPartnerIncome] = useState('');
    const [totalPayments, setTotalPayments] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();

        // Calculate max loan amount
        const maxLoan = (annualIncome + (hasPartner ? parseFloat(partnerIncome) : 0)) * MinimumRequirements.MaxLoanIncomeMultiplier;

        // Get the selected interest rate
        const interestRate = MinimumRequirements.InterestRates[selectedFixedRatePeriod];

        // Parse the loan amount as a number
        const loan = parseFloat(loanAmount);

        if (isNaN(loan)) {
            // Handle invalid input
            alert('Please enter a valid loan amount.');
            return;
        }

        // Calculate total payments
        const total = (loan * interestRate) / 12 * 12 * parseInt(selectedFixedRatePeriod);

        setTotalPayments(total);
    };

    return (
        <div className='mortage-container'>
            <h1>Mortgage Calculator</h1>
            <form onSubmit={handleCalculate}>
                <label>
                    Annual Income:
                    <input
                        type="number"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Fixed Rate Period:
                    <select
                        value={selectedFixedRatePeriod}
                        onChange={(e) => setSelectedFixedRatePeriod(e.target.value)}
                    >
                        {Object.keys(MinimumRequirements.InterestRates).map((period) => (
                            <option key={period} value={period}>
                                {period}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Loan Amount:
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Do you have a partner?
                    <input
                        type="checkbox"
                        checked={hasPartner}
                        onChange={() => setHasPartner(!hasPartner)}
                    />
                </label>
                {hasPartner && (
                    <label>
                        Partner's Income:
                        <input
                            type="number"
                            value={partnerIncome}
                            onChange={(e) => setPartnerIncome(e.target.value)}
                        />
                    </label>
                )}
                <br />
                <button type="submit">Calculate</button>
            </form>
            {totalPayments !== null && (
                <div>
                    <h2>Results:</h2>
                    <p>Total Payments over Loan Term: {totalPayments}</p>
                </div>
            )}
        </div>
    );
}

export default Hypotheek;
