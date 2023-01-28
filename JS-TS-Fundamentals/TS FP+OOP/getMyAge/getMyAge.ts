// Utwórz funkcję, która jako argument przyjmuje Twój rok urodzenia. Funkcja powinna zwrócić Twój aktualny wiek niezależnie od typu inputa, który otrzyma

function getMyAge(input) {
  if (
    typeof input !== 'string' &&
    typeof input !== 'number' &&
    !(input instanceof Date)
  ) {
    console.log('wrong input');
    return;
  }
  let inputDate;

  if (typeof input === 'string' || typeof input === 'number') {
    inputDate = new Date(input, 1, 1).getFullYear();
  } else {
    inputDate = input.getFullYear();
  }
  const currentDate = new Date().getFullYear();
  const currentAge = currentDate - inputDate;
  return currentAge;
}

// Sprawdzenie działania programu:
console.log(` Result 1 is: ${getMyAge(new Date(1990, 1, 1))}`);
console.log(` Result 2 is: ${getMyAge('1990')}`);
console.log(` Result 3 is: ${getMyAge(1990)}`);
