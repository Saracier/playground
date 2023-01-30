// Stwórz funkcję paginateArray, która przyjmuje jako 1 argument tablicę, a jako 2 argument obiekt settings z następującymi kluczami :
// „actualPageIndex” - numer strony
// „entriesOnPage” – ilośc obiektów na pojedynczej stronie
//  Funkcja zwraca entriesOnSelectedPage, który jest arrayem podzielonym według ustawień z settings
// settings =
// {
//     actualPageIndex
//     entriesOnPage
// }

function paginateArray(
  dataEntries: number[],
  settings: { actualPageIndex: number; entriesOnPage: number }
) {
  const { entriesOnPage, actualPageIndex } = settings;
  if (
    !Array.isArray(dataEntries) ||
    typeof actualPageIndex !== 'number' ||
    actualPageIndex < 0 ||
    typeof entriesOnPage !== 'number' ||
    entriesOnPage < 1
  ) {
    return 'Whoops. You gave wrong input arguments';
  }

  if (entriesOnPage > dataEntries.length) {
    console.log('Array is shorter than requested entries on page');
    return dataEntries;
  }

  const start = entriesOnPage * actualPageIndex;
  console.log(`start number is ${start}`);
  if (start > dataEntries.length - 1) {
    return `Whoops. This page doesn't exit in this array. It exeeds limit of array`;
  }

  let entriesOnSelectedPage: number[] = [];
  for (let i = start; i < start + entriesOnPage; i++) {
    if (dataEntries[i]) {
      entriesOnSelectedPage.push(dataEntries[i]);
    }
  }
  console.log(`Final returned value is ${entriesOnSelectedPage}`);
  return entriesOnSelectedPage;
}

// Sprawdzenie działania programu:
console.log(
  paginateArray([1, 2, 3, 4, 5], { actualPageIndex: 1, entriesOnPage: 2 })
);
