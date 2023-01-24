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

// poniżej niezbyt ogarniam jak to połączyć
class Booking {
  // Booking dostaje użytkownika w constructorze
  // Ma mieć: datę wypożyczenia, datę zwrotu (+7d od wypożyczenia), listę wypożyczonych książek, kara
  // Ma umożliwiać:
  // - usuwanie i dodawanie książki do listy wypożyczonych książek
  // - zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie -
  // każdy dzień zwłoki to naliczenie jakiejś kary.
}

class Library {
  // Ma miec: listę książek, listę książek dostępnych (które nie zostały wypożyczone),
  // lista wypożyczeń, lista użytkowników
  // Ma umożliwiać:
  // - dodawanie książek do listy
  // - usuwanie książek z listy
  // - wypożyczanie książki dla usera X
  // - oddanie wypożyczania książki
}
