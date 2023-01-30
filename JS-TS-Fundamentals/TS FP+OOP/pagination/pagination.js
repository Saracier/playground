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
    var entriesOnPage = settings.entriesOnPage, actualPageIndex = settings.actualPageIndex;
    if (!Array.isArray(dataEntries) ||
        typeof actualPageIndex !== 'number' ||
        actualPageIndex < 0 ||
        typeof entriesOnPage !== 'number' ||
        entriesOnPage < 1) {
        return 'Whoops. You gave wrong input arguments';
    }
    if (entriesOnPage > dataEntries.length) {
        console.log('Array is shorter than requested entries on page');
        return dataEntries;
    }
    var start = entriesOnPage * actualPageIndex;
    console.log("start number is ".concat(start));
    if (start > dataEntries.length - 1) {
        return "Whoops. This page doesn't exit in this array. It exeeds limit of array";
    }
    var entriesOnSelectedPage = [];
    for (var i = start; i < start + entriesOnPage; i++) {
        if (dataEntries[i]) {
            entriesOnSelectedPage.push(dataEntries[i]);
        }
    }
    console.log("Final returned value is ".concat(entriesOnSelectedPage));
    return entriesOnSelectedPage;
}
// Sprawdzenie działania programu:
console.log(paginateArray([1, 2, 3, 4, 5], { actualPageIndex: 1, entriesOnPage: 2 }));
