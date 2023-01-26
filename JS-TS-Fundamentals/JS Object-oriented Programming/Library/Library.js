// Stwórz strukturę danych związaną z biblioteką, pełen opis znajduję się w kodzie poniżej
// Wypracuj obiekt charakteryzujący użytkownika
// Wypracuj obiekt charakteryzujący książkę
// Wypracuj obiekt charakteryzujący wypożyczenie
// Wypracuj obiekt charakteryzujący bibliotekę

// Dodaj możliwość posiadania więcej niż jednej książki w bibliotece - będzie trzeba zmienić logikę dodawania i usuwania książki z biblioteki (np. jeżeli książka jest już w bibliotece to dodajemy do niej kolejną sztukę).

class User {
  // Ma miec: Imie, Nazwisko, uuid
  constructor(firstName, secondName) {
    (this.firstName = firstName),
      (this.secondName = secondName),
      (this.uuid = Math.random());
  }
}

class Book {
  // Ma miec: Tytuł, Autora, uuid, losowe zdjęcie oraz krótki opis
  constructor(title, author, description) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.uuid = Math.random();
    this.picture = `https://placebear.com/640/${parseInt(Math.random() * 640)}`;
  }
}

class Booking {
  // Booking dostaje użytkownika w constructorze
  // Ma mieć: datę wypożyczenia, datę zwrotu (+7d od wypożyczenia), listę wypożyczonych książek, kara
  // Ma umożliwiać:
  // - usuwanie i dodawanie książki do listy wypożyczonych książek
  // - zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie -
  // każdy dzień zwłoki to naliczenie jakiejś kary.
  constructor(user) {
    this.user = user;
  }
  countDateOfTakingBook() {
    return new Date();
  }
  countDateOfReturnignBook() {
    return new Date(
      dateOfTakingBook.getFullYear(),
      dateOfTakingBook.getMonth(),
      dateOfTakingBook.getDate() + 7
    );
  }
  countPenatly(currentDate, plannedDateOfReturn) {
    if (plannedDateOfReturn < currentDate) {
      return;
    }
    const timeOfOverdue = currentDate - plannedDateOfReturn;
    const priceForOveruindSingleDay = 5;
    const priceToPay = Math.floor(
      (timeOfOverdue / 86400000) * priceForOveruindSingleDay
    );
    return priceToPay;
  }
  listOfTakenBooks = [];
  overdueCharge = 0;

  takeBook(book) {
    const bookDetails = {
      book: book,
      dateOfTakingBook: this.countDateOfTakingBook(),
      DateOfReturnignBook: this.countDateOfReturnignBook(),
    };
    listOfTakenBooks.push(bookDetails);
  }

  returnBook(book) {
    for (let i = 0; i < this.listOfTakenBooks.length; i++) {
      if (this.listOfTakenBooks[i].book === book) {
        const priceToPay = countPenatly();
        this.overdueCharge = this.overdueCharge + priceToPay;
        this.listOfTakenBooks.splice(i, 1);
        break;
      }
    }
  }
}

class Library {
  bookings = [Booking];
  constructor() {
    this.listsOfTheBooks = [];
    this.listOfTheUsers = [];
  }

  newUser() {
    let newUser = new Booking();
    listOfTheUsers.push(newUser);
  }

  bookStatus() {
    bookings[4].changeBookStatus('Harry Potter', 213123);
  }
  // Ma miec: listę książek, listę książek dostępnych (które nie zostały wypożyczone),
  // lista wypożyczeń, lista użytkowników
  // Ma umożliwiać:
  // - dodawanie książek do listy
  // - usuwanie książek z listy
  // - wypożyczanie książki dla usera X
  // - oddanie wypożyczania książki
}
