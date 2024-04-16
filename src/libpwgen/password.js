import { randomInt } from 'crypto';
import { wordList } from './wordlist.js';

function generateEligibleWords(words, minLength, maxLength, numberOfWords, count) {
  // create lines from the input string
  var lines = wordList;

  // Create a channel to collect eligible words
  var eligibleWords = [];

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var length = line.length;
    if (length > minLength && length <= maxLength) {
      eligibleWords.push(line);
    }
  }

  if (eligibleWords.length === 0) {
    throw new Error('no eligible words found');
  }

  // Generate a random index and select a word
  for (var i = 0; i < numberOfWords * count; i++) {
    var randomIndex = Math.floor(Math.random() * eligibleWords.length);
    words.push(eligibleWords[randomIndex]);
  }
}

function selectRandomWords(eligibleWords, numberOfWords, iterator) {
  if (eligibleWords.length === 0) {
    throw new Error('no eligible words found');
  }

  const words = [];
  for (let i = 0; i < numberOfWords; i++) {
    words.push(eligibleWords[iterator + i]);
  }

  return words;
}

function getRandomSymbol() {
  const symbols = ['!', '@', '#', '$', '%', '^', '&'];
  const randomIndex = randomInt(0, symbols.length);
  return symbols[randomIndex];
}

function constructPassword(words, delimiter, prepended, appended) {
  let password = '';

  if (words.length === 0) {
    return password;
  }

  for (let i = 0; i < words.length; i++) {
    password += words[i];
    if (i !== words.length - 1) {
      password += delimiter;
    }
  }

  if (!appended) {
    const randomNumber = randomInt(1, 11);
    const randomSymbol = getRandomSymbol();
    appended = `${delimiter}${randomNumber}${randomSymbol}`;
  }

  password = `${prepended}${password}${appended}`;

  return password;
}

export { constructPassword, selectRandomWords, generateEligibleWords };
