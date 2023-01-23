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

  updateProperty(prop, newProperty) {
    this[prop] = newProperty;
    this.modificationDate = new Date();
  }

  changeContactParameters(parameter, newValue) {
    if (
      parameter !== 'name' ||
      parameter !== 'surname' ||
      parameter !== 'email'
    ) {
      return;
    }
    this.parameter = newValue;
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

  changeGroupName(name) {
    this.name = name;
  }

  addContact(newContact) {
    contacts.push(newContact);
  }

  removeContact(uuid) {
    let indexOfContact = contacts.find((el) => el.uuid == uuid);
    if (indexOfContact) {
      contacts.splice(indexOfContact, 1);
    } else {
      console.log(`can't found such contact with UUID ${uuid}`);
    }
  }

  doesContactExist(uuid) {
    let indexOfContact = contacts.find((el) => el.uuid == uuid);
    if (indexOfContact) {
      return true;
    } else {
      return false;
    }
  }
}

class AddressBook {
  // Ma mieć: listę wszystkich kontaktów, listę grup kontaktów
  // Ma umożliwiać: szukanie kontaktu po frazie, dodawanie/usuwanie/modyfikacje nowych kontaktów, dodawanie/usuwanie/modyfikacje nowych grup
  allContacts = [];
  allGroups = [];

  addNewContact(name, surname, email) {
    this.allContacts.push(new Contact(name, surname, email));
  }

  deleteContact(uuid) {
    let contactId = this.allContacts.find((el) => el.uuid == uuid);
    if (contactId) {
      this.allContacts.splice(contactId, 1);
      // przy okazji usuwanie kontaktu z grup
      for (let i = 0; i < this.allContacts.length; i++) {
        for (let x = 0; x < this.allContacts[i].contacts.length; x++) {
          if ((this.allContacts[i].contacts.uuid = uuid)) {
            this.allContacts[i].contacts.splice(x, 1);
          }
        }
      }
    }
  }

  findContact(input) {
    const regexedInput = new RegExp(input);
    for (let i = 0; i < this.allGroups.length; i++) {
      for (key in this.allContacts[i]) {
        if (this.allContacts[i].key.match(regexedInput)) {
          return this.allContacts[i].uuid;
        }
      }
    }
  }

  changeContactData(uuid, dataToChange, newValueOfDate) {
    let contactId = this.allContacts.find((el) => el.uuid == uuid);
    if (this.allContacts.contactId) {
      contactId.changeContactParameters(dataToChange, newValueOfDate);
    }
  }

  addNewGroup(name) {
    this.allGroups.push(new Group(name));
  }

  changeNameOfGroup(uuid, newName) {
    for (let i = 0; i < this.allGroups.length; i++) {
      if (this.allGroups[i].uuid === uuid) {
        this.allGroups[i].changeGroupName(newName);
      }
    }
  }

  deleteGroup(uuid) {
    for (let i = 0; i < this.allGroups.length; i++) {
      let indexOfContact = this.allGroups.find((el) => el.uuid == uuid);
      if (indexOfContact) {
        this.allGroups.splice(indexOfContact, 1);
      }
    }
  }
}
