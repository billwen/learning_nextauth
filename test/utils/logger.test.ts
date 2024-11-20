import log from '../../src/utils/logger';

describe('Logger test', () => {
  it('should log', () => {
    expect(log.error).toBe(true);
  });
});
