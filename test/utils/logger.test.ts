import log from '../../src/utils/logger';

jest.mock('nanoid', () => {
  return {
    nanoid: () => Math.random().toString(),
  };
});

const originalError = console.error;
const originalWarn = console.warn;

beforeEach(() => {
  console.error = console.log;
  console.warn = console.log;
});

afterEach(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

describe('Logger test', () => {
  it('should log', () => {
    log.error(__filename, 'Error message');
    log.info(__filename, 'Info message');
    log.warn(__filename, 'Warn message');
  });
});
