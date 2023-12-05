import {
  constructPassword,
  generateEligibleWords,
  selectRandomWords
} from './libpwgen/password.js';

function genpw({
  minLength = 3,
  maxLength = 5,
  numberOfWords = 2,
  count = 1,
  delimiter = '-',
  prepend = '',
  append = ''
} = {}) {
  const wordList = [];

  generateEligibleWords(wordList, minLength, maxLength, numberOfWords, count);

  const words = selectRandomWords(wordList, numberOfWords, 0 * numberOfWords);

  const pw = constructPassword(words, delimiter, prepend, append);

  return pw;
}

export { genpw };
