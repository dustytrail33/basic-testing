// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({
  create: jest.fn(),
}));
jest.mock('lodash', () => ({
  throttle: jest.fn((fn: unknown) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const responseData = { data: 'Test' };
  const mockGetFunc = jest.fn();
  const mockAxiosCreate = (axios.create as jest.Mock).mockReturnValue({
    get: mockGetFunc,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockAxiosCreate.mockReturnValue({ get: mockGetFunc });
  });

  test('should create instance with provided base url', async () => {
    mockGetFunc.mockResolvedValue({ data: {} });
    await throttledGetDataFromApi('test');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockGetFunc.mockResolvedValue(responseData);
    await throttledGetDataFromApi('test');
    expect(mockGetFunc).toHaveBeenCalledWith('test');
  });

  test('should return response data', async () => {
    mockGetFunc.mockResolvedValue(responseData);

    const result = await throttledGetDataFromApi('test');
    expect(result).toEqual('Test');
  });
});
