import { wordList } from './wordlist.js';

// import crypto if running in node environment
async function randomIntNode(min, max) {
  const crypto = await import('crypto');

  const buffer = crypto.randomBytes(4);
  return Math.floor(buffer.readUInt32BE(0) % (max - min + 1)) + min;
}

// use the browser crypto if running in browser environment
function randomIntBrowser(min, max) {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return (array[0] % (max - min + 1)) + min;
}

// wraps random int based on environment
function getRandomValue() {
  let randomInt;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    randomInt = randomIntBrowser;
  } else {
    randomInt = randomIntNode;
  }
  return randomInt;
}

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

async function getRandomSymbol() {
  const symbols = ['!', '@', '#', '$', '%', '^', '&'];
  const randomIndexFunc = getRandomValue();
  const randomIndex = await randomIndexFunc(0, symbols.length - 1);
  return symbols[randomIndex];
}

async function constructPassword(words, delimiter, prepended, appended) {
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
    const randomNumberFunc = getRandomValue();
    const randomNumber = await randomNumberFunc(1, 11);
    const randomSymbol = await getRandomSymbol();
    appended = `${delimiter}${randomNumber}${randomSymbol}`;
  }

  password = `${prepended}${password}${appended}`;

  return password;
}

export { constructPassword, selectRandomWords, generateEligibleWords };
