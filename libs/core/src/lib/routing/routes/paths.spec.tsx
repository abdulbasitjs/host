import { PATHS } from './paths';

describe('Paths', () => {
  it('should have the correct paths for BO', () => {
    expect(PATHS.BO.ROOT).toBe('');
    expect(PATHS.BO.KYC_LVL2).toBe('/kyc-lvl2');
    expect(PATHS.BO.KYC_LVL3).toBe('/kyc-lvl3');
  });

  it('should have the correct paths for BRM', () => {
    expect(PATHS.BRM.ROOT).toBe('');
    expect(PATHS.BRM.KYC_LVL2).toBe('/kyc-lvl2');
    expect(PATHS.BRM.KYC_LVL3).toBe('/kyc-lvl3');
  });
});