// Stwórz strukturę danych związaną z biblioteką, pełen opis znajduję się w kodzie poniżej
// Wypracuj obiekt charakteryzujący użytkownika
// Wypracuj obiekt charakteryzujący książkę
// Wypracuj obiekt charakteryzujący wypożyczenie
// Wypracuj obiekt charakteryzujący bibliotekę
// Dodaj możliwość posiadania więcej niż jednej książki w bibliotece - będzie trzeba zmienić logikę dodawania i usuwania książki z biblioteki (np. jeżeli książka jest już w bibliotece to dodajemy do niej kolejną sztukę).

import { v4 as uuidv4 } from 'uuid';

interface UserInterface {
  firstName: string;
  secondName: string;
  readonly uuid: string;
}

interface BookInterface {
  title: string;
  author: string;
  description: string;
  readonly uuid: string;
  picture: string;
}

interface BookDetailsInterface {
  book: Book;
  dateOfTakingBook: Date;
  dateOfReturnignBook: Date;
}

interface LibraryInterface {
  listOfBooks: Book[];
  listOfAvalibleBooks: Book[];
  listOfTheUsers: User[];
  listOfTheBookings: Booking[];
}

const PRICE_OF_OVERDUE_FOR_SINGLE_DAY = 5;

class User implements UserInterface {
  // Ma miec: Imie, Nazwisko, uuid

  firstName: string;
  secondName: string;
  readonly uuid: string;

  constructor(firstName: string, secondName: string) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.uuid = uuidv4();
  }
}

class Book implements BookInterface {
  // Ma miec: Tytuł, Autora, uuid, losowe zdjęcie oraz krótki opis

  title: string;
  author: string;
  description: string;
  uuid: string;
  picture: string;

  constructor(title: string, author: string, description: string) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.uuid = uuidv4();
    this.picture = `https://placebear.com/640/${Math.floor(
      Math.random() * 640
    )}`;
  }
}

class Booking {
  // Booking dostaje użytkownika w constructorze
  // Ma mieć: datę wypożyczenia, datę zwrotu (+7d od wypożyczenia), listę wypożyczonych książek, kara
  // Ma umożliwiać:
  // - usuwanie i dodawanie książki do listy wypożyczonych książek
  // - zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie -
  // każdy dzień zwłoki to naliczenie jakiejś kary.

  user: User;
  listOfTakenBooks: BookDetailsInterface[] = [];
  overdueCharge = 0;

  constructor(user: User) {
    this.user = user;
  }
  countDateOfTakingBook() {
    return new Date();
  }
  countDateOfReturnignBook() {
    const currDate = this.countDateOfTakingBook();
    return new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      currDate.getDate() + 7
    );
  }
  countPenatly(currentDate: Date, plannedDateOfReturn: Date) {
    if (plannedDateOfReturn < currentDate) {
      return 0;
    }
    const timeOfOverdue = currentDate.getTime() - plannedDateOfReturn.getTime();
    const priceToPay = Math.floor(
      (timeOfOverdue / 86400000) * PRICE_OF_OVERDUE_FOR_SINGLE_DAY
    );
    return priceToPay;
  }

  takeBook(book: Book) {
    const bookDetails: BookDetailsInterface = {
      book: book,
      dateOfTakingBook: this.countDateOfTakingBook(),
      dateOfReturnignBook: this.countDateOfReturnignBook(),
    };
    this.listOfTakenBooks.push(bookDetails);
  }

  returnBook(book: Book) {
    let flag = true;
    for (let i = 0; i < this.listOfTakenBooks.length; i++) {
      if (this.listOfTakenBooks[i].book === book) {
        const priceToPay = this.countPenatly(
          new Date(),
          this.listOfTakenBooks[i].dateOfReturnignBook
        );
        this.overdueCharge = this.overdueCharge + priceToPay;
        this.listOfTakenBooks.splice(i, 1);
        flag = false;
        break;
      }
    }
    if (flag) {
      throw new Error(`Cannot find ${book.title}.`);
    }
  }
}

class Library implements LibraryInterface {
  // Ma miec: listę książek, listę książek dostępnych (które nie zostały wypożyczone),
  // lista wypożyczeń, lista użytkowników
  // Ma umożliwiać:
  // - dodawanie książek do listy
  // - usuwanie książek z listy
  // - wypożyczanie książki dla usera X
  // - oddanie wypożyczania książki

  listOfBooks: Book[];
  listOfAvalibleBooks: Book[];
  listOfTheUsers: User[];
  listOfTheBookings: Booking[];

  constructor() {}

  newUser(firstName: string, secondName: string) {
    const newUser = new User(firstName, secondName);
    this.listOfTheUsers.push(newUser);
  }

  newBooking(user: User) {
    const newBooking = new Booking(user);
    this.listOfTheBookings.push(newBooking);
  }

  newBook(title: string, author: string, description: string) {
    const newBook = new Book(title, author, description);
    this.listOfAvalibleBooks.push(newBook);
    this.listOfBooks.push(newBook);
  }
  removeBook(uuid: string) {
    for (let i = 0; i < this.listOfAvalibleBooks.length; i++) {
      if (this.listOfAvalibleBooks[i].uuid === uuid) {
        this.listOfAvalibleBooks.splice(i, 1);
      } else {
        throw new Error('book cannot be found. Maybe it has been taken?');
      }
    }
    for (let i = 0; i < this.listOfBooks.length; i++) {
      if (this.listOfBooks[i].uuid === uuid) {
        this.listOfBooks.splice(i, 1);
      }
    }
  }

  printBooksInLibary() {
    let list: string[] = [];
    for (let i = 0; i < this.listOfBooks.length; i++) {
      const singleEntry = `Title: ${this.listOfBooks[i].title} Author: ${this.listOfBooks[i].author}, UUID: ${this.listOfBooks[i].uuid}`;
      list.push(singleEntry);
    }
    return list;
  }

  takeBook(booking: Booking, bookUuid: string) {
    const avalibleBook = this.listOfAvalibleBooks.find(
      (el) => el.uuid == bookUuid
    );
    if (!avalibleBook) {
      throw new Error('no such book found mate');
    }
    const avalibleBookIndex = this.listOfAvalibleBooks.indexOf(avalibleBook);
    booking.takeBook(avalibleBook);
    this.listOfAvalibleBooks.splice(avalibleBookIndex, 1);
  }

  returnBook(booking: Booking, bookUuid: string) {
    const bookToReturn = this.listOfBooks.find((el) => el.uuid == bookUuid);
    if (!bookToReturn) {
      throw new Error('no such book found mate');
    }
    const bookToReturnIndex = this.listOfBooks.indexOf(bookToReturn);
    this.listOfAvalibleBooks.push(this.listOfBooks[bookToReturnIndex]);
    booking.returnBook(this.listOfBooks[bookToReturnIndex]);
  }
}
