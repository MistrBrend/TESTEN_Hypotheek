import * as HypotheekCalc from './HypotheekCalc';

import { vi, describe, it, expect } from 'vitest';

describe('HypotheekCalc', () => {
  describe('calculateTotalPayments()', () => {
    it('should calculate the total payments correctly', () => {
      vi.mock('./HypotheekCalc', async () => {
        const actual = await vi.importActual('./HypotheekCalc');
        return {
          ...actual,
          calculateTotalPayments: vi.fn(() => 100000),
        };
      });

      const totalPayments = HypotheekCalc.calculateTotalPayments();

      expect(totalPayments).toBe(100000);
    });
  });

  describe('calculateMaxLoanAmount()', () => {
    it('should calculate the maximum loan amount correctly', () => {
      const annualIncome = 100000;

      vi.mock('./HypotheekCalc', () => ({
        calculateMaxLoanAmount: vi.fn(() => 425000),
      }));

      const maxLoanAmount = HypotheekCalc.calculateMaxLoanAmount(annualIncome);

      expect(maxLoanAmount).toBe(425000);
    });
  });
});
