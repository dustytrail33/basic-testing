// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();

    doStuffByTimeout(cb, 500);

    expect(spy).toHaveBeenCalledWith(cb, 500);

    spy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 200);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(199);
    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');
    const cb = jest.fn();

    doStuffByInterval(cb, 200);

    expect(spy).toHaveBeenCalledWith(cb, 200);

    spy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 100);

    jest.advanceTimersByTime(350);

    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const { existsSync } = jest.requireMock('fs') as { existsSync: jest.Mock };
  const { readFile } = jest.requireMock('fs/promises') as {
    readFile: jest.Mock;
  };
  const { join } = jest.requireMock('path') as { join: jest.Mock };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    join.mockReturnValue('/fake/fullPath');

    await readFileAsynchronously('test.txt');

    expect(join).toHaveBeenCalledWith(__dirname, 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    join.mockReturnValue('/fake/fullPath');
    existsSync.mockReturnValue(false);

    const result = await readFileAsynchronously('test.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    join.mockReturnValue('/fake/fullPath');
    existsSync.mockReturnValue(true);
    readFile.mockResolvedValue(Buffer.from('test'));

    const result = await readFileAsynchronously('test.txt');
    expect(result).toBe('test');
  });
});
