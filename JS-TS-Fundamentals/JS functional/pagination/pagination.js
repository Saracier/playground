// Stwórz funkcję paginateArray, która przyjmuje jako 1 argument tablicę, a jako 2 argument obiekt settings z następującymi kluczami :
// „actualPageIndex” - numer strony
// „entriesOnPage” – ilośc obiektów na pojedynczej stronie
//  Funkcja zwraca entriesOnSelectedPage, który jest arrayem podzielonym według ustawień z settings
// settings =
// {
//     actualPageIndex
//     entriesOnPage
// }

function paginateArray(dataEntries, settings) {
  if (
    !Array.isArray(dataEntries) ||
    typeof settings.actualPageIndex !== 'number' ||
    settings.actualPageIndex < 0 ||
    typeof settings.entriesOnPage !== 'number' ||
    settings.entriesOnPage < 1
  ) {
    return 'Whoops. You gave wrong input arguments';
  }
  const { entriesOnPage, actualPageIndex } = settings;
  let entriesOnSelectedPage = [];

  if (entriesOnPage > dataEntries.length) {
    // Zostawić to sprawdzenie na potrzeby poprawienia performance? Czy to jest zbyt duża redundancja?
    console.log('Array is shorter than requested entries on page');
    return dataEntries;
  } else {
    start = entriesOnPage * actualPageIndex;
    console.log(`start number is ${start}`);
    if (start > dataEntries.length - 1) {
      return `Whoops. This page doesn't exit in this array. It exeeds limit of array`;
    }
  }

  for (let i = start; i < start + entriesOnPage; i++) {
    if (dataEntries[i]) {
      // To sprawdzenie sprawia, że w array nie mogę przyjmować wartości null i undefined, ale z drugiej strony jak na ostatniej stronie arraya zostanie mi jedna wartość, to nie uzupełniam sobie undefindami. Zostawić? Czy wywalić tego if'a?
      entriesOnSelectedPage.push(dataEntries[i]);
    }
  }
  console.log(`Final returned value is ${entriesOnSelectedPage}`);
  return entriesOnSelectedPage;
}

// Sprawdzenie działania programu:
console.log(
  paginateArray([1, 2, 3, 4, 5, 6], { actualPageIndex: 2, entriesOnPage: 3 })
);
