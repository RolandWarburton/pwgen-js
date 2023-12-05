import {
  constructPassword,
  generateEligibleWords,
  selectRandomWords
} from './libpwgen/password.js';

function genpw() {
  const wordList = [];
  const minLength = 3;
  const maxLength = 5;
  const numberOfWords = 2;
  const count = 1;
  const delimiter = '-';
  const prepend = '';
  const append = '';

  generateEligibleWords(wordList, minLength, maxLength, numberOfWords, count);

  const words = selectRandomWords(wordList, numberOfWords, 0 * numberOfWords);

  const pw = constructPassword(words, delimiter, prepend, append);

  return pw;
}

export default genpw;
