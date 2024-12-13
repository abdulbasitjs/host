import { config } from './config';

describe('Config', () => {
  it('should have production set to false', () => {
    expect(config.production).toBe(false);
  });
});
