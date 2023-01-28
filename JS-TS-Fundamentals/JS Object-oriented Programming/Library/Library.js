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
  //
  //
  //
  // Nie podobają mi się nazwy tych klas. Z jednej strony są za długie, a z drugiej strony nie wiem czy skrócenie tego do "countStartingDate" lub czegoś podobnego byłoby poprawne z perspektywy clean code
  //
  //
  //
  //
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
    let flag = true;
    for (let i = 0; i < this.listOfTakenBooks.length; i++) {
      if (this.listOfTakenBooks[i].book === book) {
        const priceToPay = countPenatly();
        this.overdueCharge = this.overdueCharge + priceToPay;
        this.listOfTakenBooks.splice(i, 1);
        flag = false;
        break;
      }
    }
    if (flag) {
      throw new Error(`Cannot find ${book.name}.`);
    }
  }
}

class Library {
  // Ma miec: listę książek, listę książek dostępnych (które nie zostały wypożyczone),
  // lista wypożyczeń, lista użytkowników
  // Ma umożliwiać:
  // - dodawanie książek do listy
  // - usuwanie książek z listy
  // - wypożyczanie książki dla usera X
  // - oddanie wypożyczania książki
  constructor() {
    this.listsOfBooks = [];
    this.listOfAvalibleBooks = [];
    this.listOfTheUsers = [];
    this.listOfTheBookings = [];
  }

  newUser(firstName, secondName) {
    const newUser = new User(firstName, secondName);
    listOfTheUsers.push(newUser);
  }

  newBooking(user) {
    const newBooking = new Booking(user);
    listOfTheBookings.push(newBooking);
  }

  newBook(title, author, description) {
    const newBook = new Book(title, author, description);
    listOfAvalibleBooks.push(newBook);
    listOfBooks.push(newBook);
  }
  //
  //
  //
  // W sumie w TSie używa się popularnie dekoratorów? Czy raczej nisza?
  //
  //
  //
  //
  //
  removeBook(uuid) {
    for (let i = 0; i < listsOfAvalibleBooks; i++) {
      if (listsOfAvalibleBooks[i].uuid == uuid) {
        listsOfAvalibleBooks.splice(i, 1);
      } else {
        throw new Error('book cannot be found. Maybe it has been taken?');
      }
    }
    for (let i = 0; i < listsOfBooks; i++) {
      if (listsOfBooks[i].uuid == uuid) {
        listsOfBooks.splice(i, 1);
      }
    }
  }

  printBooksInLibary() {
    let list = [];
    //
    //
    //
    //
    //
    //
    //
    // Chyba troche za dużo polegam na for podczas iterowania. Jak możnaby pozamieniać fory?
    //
    //
    //
    //
    //
    //
    for (let i = 0; i < listOfBooks.length; i++) {
      const singleEntry = `Title: ${listOfBooks[i].title} Author: ${listOfBooks[i].author}, UUID: ${listOfBooks[i].uuid}`;
      list.push(singleEntry);
    }
    return list;
  }

  takeBook(booking, bookUuid) {
    const avalibleBookNumber = listOfAvalibleBooks.find(
      (el) => el.uuid == bookUuid
    );
    if (!avalibleBookNumber) {
      throw new Error('no such book found mate');
    }
    const avalibleBook = listOfAvalibleBooks[avalibleBookNumber];
    booking.takeBook(avalibleBook);
    listOfAvalibleBooks.splice(avalibleBookNumber, 1);
  }

  returnBook(booking, bookUuid) {
    const bookNumber = listOfBooks.find((el) => el.uuid == bookUuid);
    if (!bookNumber) {
      throw new Error('no such book found mate');
    }
    listOfAvalibleBooks.push(listOfBooks[bookNumber]);
    booking.returnBook(listOfBooks[bookNumber]);
  }
}
