// Uncomment the code below and write your tests
import lodash from 'lodash';

import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  let bankAccount = getBankAccount(100);

  beforeEach(() => {
    bankAccount = getBankAccount(100);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(200)).toThrow(InsufficientFundsError);
    expect(() => bankAccount.withdraw(200)).toThrow(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const newBankAccount = getBankAccount(100);
    expect(() => bankAccount.transfer(200, newBankAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(200, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(50).getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    expect(bankAccount.withdraw(50).getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const newBankAccount = getBankAccount(100);
    bankAccount.transfer(50, newBankAccount);
    expect(bankAccount.getBalance()).toBe(50);
    expect(newBankAccount.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const spy = jest
      .spyOn(lodash, 'random')
      .mockImplementationOnce(() => 100)
      .mockImplementationOnce(() => 1);

    const result = await bankAccount.fetchBalance();
    expect(result).toBe(100);

    spy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const spy = jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockReturnValueOnce(Promise.resolve(100));
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(100);

    spy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const spy = jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockReturnValueOnce(Promise.resolve(null));

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    spy.mockRestore();
  });
});
