// Stworz funkcję która przyjmuje w argumencie datę urodzenia (w dowolnym formacie) i na jej podstawie generuje poprawny numer PESEL
// Funkcja ma zwracać gotowy numer, który nalezy przetestowac pod względem poprawności

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function peselGenerator(input: Date) {
  if (input.getFullYear() < 1800 || input.getFullYear() > 2299) {
    console.error('invalid input date');
    return;
  }

  const firstAndSecondDigits: string = input.getFullYear().toString().slice(-2);
  let thirdAndFourthDigits: number | string = input.getMonth() + 1;
  if (input.getFullYear() <= 1899) {
    thirdAndFourthDigits += 80;
  } else if (input.getFullYear() <= 1999) {
  } else if (input.getFullYear() <= 2099) {
    thirdAndFourthDigits += 20;
  } else if (input.getFullYear() <= 2199) {
    thirdAndFourthDigits += 40;
  } else {
    thirdAndFourthDigits += 60;
  }

  thirdAndFourthDigits = thirdAndFourthDigits.toString();
  if (thirdAndFourthDigits.length < 2) {
    thirdAndFourthDigits = 0 + thirdAndFourthDigits;
  }

  let fifthAndSixthDigit: string = input.getDate().toString();
  if (fifthAndSixthDigit.length < 2) {
    fifthAndSixthDigit = 0 + fifthAndSixthDigit;
  }

  const seventhToTenthDigit = Math.round(
    getRandomArbitrary(9999, 1000)
  ).toString();

  const weightOfNumbers = '1379137913';
  const firstTenthDigits =
    firstAndSecondDigits +
    thirdAndFourthDigits +
    fifthAndSixthDigit +
    seventhToTenthDigit;
  let finalWeight: number = 0;
  for (let i = 0; i < 10; i++) {
    const x = parseInt(weightOfNumbers.slice(i, i + 1));
    const y = parseInt(firstTenthDigits.slice(i, i + 1));
    finalWeight = finalWeight + x * y;
  }

  const eleventhDigit = (10 - (finalWeight % 10)) % 10;

  return firstTenthDigits.toString() + eleventhDigit.toString();
}

console.log(peselGenerator(new Date(2002, 6, 14)));
