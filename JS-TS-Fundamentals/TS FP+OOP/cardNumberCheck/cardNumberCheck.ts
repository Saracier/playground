// Głównym celem zadania jest sprawdzenie czy numer karty jest poprawny, oraz podanie kto wydał kartę:
// American Express (Amex)
// Visa
// MasterCard
// Discover
//  Za pomocą podanych powyżej materiałów napisz funkcję która jako argument przyjmuje numer karty, a zwraca wartość boolean oraz producenta karty (o ile numer jest poprawny)

type cardNumber = {
  isValid: boolean;
  network?: string;
};

function getNetwork(input: string) {
  if (input.slice(0, 2) === '34' || input.slice(0, 2) === '37') {
    return 'American Express';
  }
  if (input.slice(0, 1) === '4') {
    return 'Visa';
  }
  if (
    (2221 <= +input.slice(0, 4) && +input.slice(0, 4) <= 2720) ||
    (51 <= +input.slice(0, 2) && +input.slice(0, 2) <= 55)
  ) {
    return 'MasterCard';
  }
  if (
    input.slice(0, 4) === '6011' ||
    (644 <= +input.slice(0, 3) && +input.slice(0, 3) <= 649) ||
    input.slice(0, 2) === '65' ||
    (622126 <= +input.slice(0, 6) && +input.slice(0, 6) <= 622925)
  ) {
    return 'DiscoverCard';
  }
  return 'Unknown';
}

function isCardNumberValid(input: string): boolean {
  let controlNumber = 0;
  let isInputEven = input.length % 2 !== 0;

  for (let i = 0; i < input.length; i++) {
    let digit = parseInt(input.slice(i, i + 1));
    if ((isInputEven && i % 2) || (!isInputEven && !(i % 2))) {
      digit *= 2;
      if (digit >= 10) {
        digit =
          parseInt(digit.toString().slice(0, 1)) +
          parseInt(digit.toString().slice(1, 2));
      }
    }
    controlNumber += digit;
  }
  let isValid: boolean;
  if (!(controlNumber % 10)) {
    isValid = true;
  } else {
    isValid = false;
  }

  return isValid;
}

function cardNumberCheck(input: string): cardNumber {
  if (typeof input !== 'string' || !+input) {
    return { isValid: false, network: 'Unknown' };
  }

  return { isValid: isCardNumberValid(input), network: getNetwork(input) };
}

console.log(`American Express:`, cardNumberCheck('378282246310005'));
console.log(`American Express:`, cardNumberCheck('371449635398431'));
console.log(`Discover:`, cardNumberCheck('6011111111111117'));
console.log(`Discover:`, cardNumberCheck('6011000990139424'));
console.log(`Mastercard:`, cardNumberCheck('2221000000000009'));
console.log(`Mastercard:`, cardNumberCheck('2223000048400011'));
console.log(`Mastercard:`, cardNumberCheck('2223016768739313'));
console.log(`Mastercard:`, cardNumberCheck('5555555555554444'));
console.log(`Mastercard:`, cardNumberCheck('5105105105105100'));
console.log(`Visa:`, cardNumberCheck('4111111111111111'));
console.log(`Visa:`, cardNumberCheck('4012888888881881'));
console.log(`Visa:`, cardNumberCheck('4222222222222'));
console.log(`SomeRandomNumbers:`, cardNumberCheck('1111111111111111'));
