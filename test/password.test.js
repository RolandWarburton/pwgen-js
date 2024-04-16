import { generateEligibleWords, constructPassword } from '../src/libpwgen/password.js';
import assert from 'assert';

describe('generate eligible words', async () => {
  it('should throw an error if no eligible words are found', () => {
    assert.throws(
      () => {
        generateEligibleWords([], 20, 30, 3, 1);
      },
      { message: 'no eligible words found' }
    );
  });

  it('should return words of a specified length', () => {
    const words = [];
    generateEligibleWords(words, 4, 8, 3, 1);
    assert.strictEqual(words.length, 3);
    words.forEach((word) => {
      assert.ok(word.length > 3 && word.length <= 8);
    });
  });

  it('should return the specified number of words', () => {
    const words1 = [];
    generateEligibleWords(words1, 4, 8, 1, 1);
    assert.strictEqual(words1.length, 1);

    const words2 = [];
    generateEligibleWords(words2, 4, 8, 2, 1);
    assert.strictEqual(words2.length, 2);

    const words3 = [];
    generateEligibleWords(words3, 4, 8, 5, 1);
    assert.strictEqual(words3.length, 5);
  });

  it('should throw an error if no eligible words are found', () => {
    const words = [];

    assert.throws(
      () => {
        generateEligibleWords(words, 99, 100, 3, 1);
      },
      { message: 'no eligible words found' }
    );
  });
  it('should create return 3 words to the words array', () => {
    const words = [];
    generateEligibleWords(words, 4, 8, 3, 1);

    assert.strictEqual(words.length, 3);
  });
});

describe('password assembly', () => {
  it('should construct a password from the provided words', async () => {
    const words = ['apple', 'banana', 'cherry'];
    const delimiter = '-';
    const prepended = 'prefix-';
    const appended = '-suffix';

    const password = await constructPassword(words, delimiter, prepended, appended);

    const expectedPassword = 'prefix-apple-banana-cherry-suffix';
    assert.strictEqual(password, expectedPassword);
  });

  it('should construct a password when no prefix is provided', async () => {
    const words = ['apple', 'banana', 'cherry'];
    const delimiter = '-';
    const appended = '-suffix';

    const password = await constructPassword(words, delimiter, '', appended);

    const expectedPassword = 'apple-banana-cherry-suffix';
    assert.strictEqual(password, expectedPassword);
  });

  it('should construct a password when no suffix is provided', async () => {
    const words = ['apple', 'cherry'];
    const delimiter = '-';
    const prepended = 'prefix-';
    // const appended = '-suffix';

    const password = await constructPassword(words, delimiter, prepended, '');

    const regex = /^prefix-apple-cherry-[1-9][0-9]*[!@#$%^&*]/;
    assert(regex.test(password), 'Password format is incorrect');
  });

  it('should append a random number and symbol if not provided', async () => {
    const words = ['apple', 'banana', 'cherry'];
    const delimiter = '-';
    const prepended = 'prefix';

    const password = await constructPassword(words, delimiter, prepended);

    // Check if password starts with 'prefix' and ends with a number and symbol separated by the delimiter
    const regex = new RegExp(`^${prepended}.+${delimiter}[1-9][0-9]*[!@#$%^&*]`);
    assert(regex.test(password), 'Password format is incorrect');
  });

  it('should return an empty string when words array is empty', async () => {
    const words = [];
    const delimiter = '-';
    const prepended = 'prefix';
    const appended = 'suffix';

    const password = await constructPassword(words, delimiter, prepended, appended);

    assert.strictEqual(password, '');
  });

  it('should construct a password from a single word', async () => {
    const words = ['apple'];
    const delimiter = '-';
    const prepended = 'prefix-';
    const appended = '-suffix';

    const password = await constructPassword(words, delimiter, prepended, appended);

    const expectedPassword = 'prefix-apple-suffix';
    assert.strictEqual(password, expectedPassword);
  });
});
