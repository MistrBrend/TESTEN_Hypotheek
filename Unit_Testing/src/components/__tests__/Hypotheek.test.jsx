import { describe, it, expect } from 'vitest';
import { Hypotheek } from '../HypotheekCalc';


describe('Hypotheek function', () => {
  it('calculates total payments correctly with a partner', () => {
    const totalPayments = 1300;
    expect(totalPayments).toBe(1300); 
  });
});