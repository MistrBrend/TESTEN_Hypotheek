export class LoanCalculator {
    public annualIncome: number = 10000;
    public selectedFixedRatePeriod: string = '30 years'; 
    public loanAmount: number = 200000; 
    public hasPartner: boolean = true; 
    public partnerIncome: number = 8000; 

    public LoanCalculator() {
        this.annualIncome;
        this.selectedFixedRatePeriod;
        this.loanAmount;
        this.hasPartner;
        this.partnerIncome;
    }

    calculateMaxLoan(): number {
        const totalIncome = this.annualIncome + (this.hasPartner ? this.partnerIncome : 0);
        return totalIncome * MinimumRequirements.MaxLoanIncomeMultiplier;
    }

    calculateInterestRate(): number {
        return MinimumRequirements.InterestRates[this.selectedFixedRatePeriod];
    }

    calculateTotalPayments(loanTermMonths: number): number {
        const annualInterestRate = this.calculateInterestRate();
        const monthlyInterestRate = annualInterestRate / 12;
        const numberOfPayments = loanTermMonths;

        const monthlyPayment =
            (this.loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        const totalPayments = monthlyPayment * numberOfPayments;
        return totalPayments;
    }
}

const MinimumRequirements = {
    MaxLoanIncomeMultiplier: 4.25,

    InterestRates: {
        'ONE_YEAR': 0.02,
        'FIVE_YEARS': 0.03,
        'TEN_YEARS': 0.035,
        'TWENTY_YEARS': 0.045,
        'THIRTY_YEARS': 0.05,
    },
};

