// Stwórz strukturę danych związaną z biblioteką, pełen opis znajduję się w kodzie poniżej
//  Wypracuj obiekt charakteryzujący pojedyńczy kontakt
//  Wypracuj obiekt charakteryzujący grupę kontakt
//  Wypracuj obiekt charakteryzujący książkę adresową

class Contact {
  // Ma mieć: Imie, Nazwisko, adres-emial, datę modyfikacji i utworzenia, uuid
  // Ma umożliwiać: aktualizację datę modyfikacji, pozwalac na modyfikację imienia, nazwiska oraz adresu email
  constructor(name, surname, email) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.modificationDate = new Date();
    this.creationDate = new Date();
    this.uuid = Math.random();
  }

  changeName(inputedName) {
    this.name = inputedName;
    this.modificationDate = new Date();
  }

  changeSurname(inputedSurname) {
    this.surname = inputedSurname;
    this.modificationDate = new Date();
  }

  changeEmail(inputedEmail) {
    this.email = inputedEmail;
    this.modificationDate = new Date();
  }

  actualizeModificationDate() {
    this.modificationDate = new Date();
  }
}

class Group {
  // Ma mieć: listę kontaktów oraz nazwę grupy oraz uuid
  // Ma umożliwiać: zmianę nazwy grupy, można dodać lub usunac kontakt z grupy, można sprawdzić czy kontakt istnieje w grupie
  constructor(name) {
    this.name = name;
    this.contacts = [];
    this.uuid = Math.random();
  }

  addContact(newContact) {
    contacts.push(newContact);
  }

  removeContact(contactToRemove) {
    let indexInArray = contacts.indexOf(contactToRemove);
    if (indexInArray >= 0) {
      contacts.splice(indexInArray, 1);
    } else {
      console.log(`can't found such contact like ${contactToRemove}`);
    }
  }

  doesContactExists(contactToFind) {
    let indexInArray = contacts.indexOf(contactToFind);
    if (indexInArray >= 0) {
      return true;
    } else {
      return false;
    }
  }
}

class AddressBook {
  allContacts = [];
  allGroups = [];
  addNewContact(name, surname, email) {
    this.allContacts.push(new Contact(name, surname, email));
  }
  deleteContact(uuid) {
    let numberOfTheContact = this.allContacts.find((el) => el.uuid == uuid);
    if (numberOfTheContact) {
      allContacts.splice(numberOfTheContact, 1);
    }
  }
  findContact(input) {
    const regexedInput = new RegExp(input);
    for (let i = 0; i < allContacts.length; i++) {
      for (key in allContacts[i]) {
        if (allContacts[i].key.match(regexedInput)) {
          return allContacts[i].uuid;
        }
      }
    }
  }
  changeContactName(uuid, inputedName) {
    let numberOfTheContact = this.allContacts.find((el) => el.uuid == uuid);
    if (numberOfTheContact) {
      numberOfTheContact.changeName(inputedName);
    }
    // i tak samo robimy email, surname, actualizeModificationDate itp.
  }
  addNewGroup(name) {
    this.allGroups.push(new Group(name));
    // I tutaj już przerywam robienie, bo nawet nie wiem czy to co zrobiłem jest nawet w najmniejszym stopniu poprawne
  }

  // Ma mieć: listę wszystkich kontaktów, listę grup kontaktów
  // Ma umożliwiać: szukanie kontaktu po frazie, dodawanie/usuwanie/modyfikacje nowych kontaktów, dodawanie/usuwanie/modyfikacje nowych grup
}

// Dobra. Jak zrobić to zadanie i łopatologicznie o co chodzi we wzorcu buldier?
// https://github.com/Localhost-Group/JS-TS-Fundamentals/blob/main/2.%20JS%20Object-oriented%20Programming/zadania/EmailBuilder-medium.md
// https://refactoring.guru/pl/design-patterns/builder/typescript/example#example-0
