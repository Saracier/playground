// Stworz funkcję która przyjmuje w argumencie datę urodzenia (w dowolnym formacie) i na jej podstawie generuje poprawny numer PESEL
// Funkcja ma zwracać gotowy numer, który nalezy przetestowac pod względem poprawności
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function peselGenerator(input) {
  if (input.getFullYear() < 1800 || input.getFullYear() > 2299) {
    console.error('invalid input date');
    return;
  }
  var firstAndSecondDigits = input.getFullYear().toString().slice(-2);
  var thirdAndFourthDigits = input.getMonth() + 1;
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
  var fifthAndSixthDigit = input.getDate().toString();
  if (fifthAndSixthDigit.length < 2) {
    fifthAndSixthDigit = 0 + fifthAndSixthDigit;
  }
  var seventhToTenthDigit = Math.round(
    getRandomArbitrary(9999, 1000)
  ).toString();
  var weightOfNumbers = '1379137913';
  var firstTenthDigits =
    firstAndSecondDigits +
    thirdAndFourthDigits +
    fifthAndSixthDigit +
    seventhToTenthDigit;
  var finalWeight = 0;
  for (var i = 0; i < 10; i++) {
    var x = parseInt(weightOfNumbers.slice(i, i + 1));
    var y = parseInt(firstTenthDigits.slice(i, i + 1));
    finalWeight = finalWeight + x * y;
  }
  var eleventhDigit = (10 - (finalWeight % 10)) % 10;
  return firstTenthDigits.toString() + eleventhDigit.toString();
}
