// Stwórz strukturę danych związaną z biblioteką, pełen opis znajduję się w kodzie poniżej
//  Wypracuj obiekt charakteryzujący pojedyńczy kontakt
//  Wypracuj obiekt charakteryzujący grupę kontakt
//  Wypracuj obiekt charakteryzujący książkę adresową

interface IContact {
  name: string;
  surname: string;
  email: string;
  modificationDate: Date;
  creationDate: Date;
  readonly uuid: number;
  updateProperty: (prop: string, newProperty: string | Date) => void;
  changeContactParameters: (parameter: string, newValue: string) => void;
  actualizeModificationDate: () => void;
}

class Contact implements IContact {
  // Ma mieć: Imie, Nazwisko, adres-emial, datę modyfikacji i utworzenia, uuid
  // Ma umożliwiać: aktualizację datę modyfikacji, pozwalac na modyfikację imienia, nazwiska oraz adresu email

  name: string;
  surname: string;
  email: string;
  modificationDate: Date;
  creationDate: Date;
  uuid: number;
  constructor(name: string, surname: string, email: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.modificationDate = new Date();
    this.creationDate = new Date();
    this.uuid = Math.random();
  }

  updateProperty(prop: string, newProperty: string | Date) {
    this[prop] = newProperty;
    this.modificationDate = new Date();
  }

  changeContactParameters(parameter: string, newValue: string) {
    if (
      parameter !== 'name' &&
      parameter !== 'surname' &&
      parameter !== 'email'
    ) {
      return;
    }
    this[parameter] = newValue;
    this.modificationDate = new Date();
  }

  actualizeModificationDate() {
    this.modificationDate = new Date();
  }
}

class Group {
  // Ma mieć: listę kontaktów oraz nazwę grupy oraz uuid
  // Ma umożliwiać: zmianę nazwy grupy, można dodać lub usunac kontakt z grupy, można sprawdzić czy kontakt istnieje w grupie
  name: string;
  contacts: Contact[];
  uuid: number;

  constructor(name: string) {
    this.name = name;
    this.contacts = [];
    this.uuid = Math.random();
  }

  changeGroupName(name: string) {
    this.name = name;
  }

  addContact(newContact: Contact) {
    this.contacts.push(newContact);
  }

  removeContact(uuid: number) {
    let contact = this.contacts.find((el) => el.uuid == uuid);
    let indexOfContact;
    if (contact) {
      indexOfContact = this.contacts.indexOf(contact);
    }
    if (indexOfContact) {
      this.contacts.splice(indexOfContact, 1);
    } else {
      console.log(`can't found such contact with UUID ${uuid}`);
    }
  }

  doesContactExist(uuid: number) {
    let indexOfContact = this.contacts.find((el) => el.uuid == uuid);
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
  allContacts: Contact[] = [];
  allGroups: Group[] = [];

  addNewContact(name: string, surname: string, email: string) {
    this.allContacts.push(new Contact(name, surname, email));
  }

  deleteContact(uuid: number) {
    let contact = this.allContacts.find((el) => el.uuid == uuid);
    let contactId: number | undefined;
    if (contact) {
      contactId = this.allContacts.indexOf(contact);
    }
    if (contactId) {
      this.allContacts.splice(contactId, 1);
      // przy okazji usuwanie kontaktu z grup
      for (let i = 0; i < this.allContacts.length; i++) {
        for (let x = 0; x < this.allGroups[i].contacts.length; x++) {
          if ((this.allGroups[i].contacts[x].uuid = uuid)) {
            this.allGroups[i].contacts.splice(x, 1);
          }
        }
      }
    }
  }

  findContact(input: string) {
    const regexedInput = new RegExp(input);
    for (let i = 0; i < this.allGroups.length; i++) {
      for (let key in this.allContacts[i]) {
        if (key.match(regexedInput)) {
          return this.allContacts[i].uuid;
        }
      }
    }
  }

  changeContactData(
    uuid: number,
    dataToChange: string,
    newValueOfData: string
  ) {
    let contact = this.allContacts.find((el) => el.uuid == uuid);
    let contactId: number | undefined;
    if (contact) {
      let contactId = this.allContacts.indexOf(contact);
    }
    if (contactId && this.allContacts[contactId]) {
      this.allContacts[contactId].changeContactParameters(
        dataToChange,
        newValueOfData
      );
    }
  }

  addNewGroup(name: string) {
    this.allGroups.push(new Group(name));
  }

  changeNameOfGroup(uuid: number, newName: string) {
    for (let i = 0; i < this.allGroups.length; i++) {
      if (this.allGroups[i].uuid === uuid) {
        this.allGroups[i].changeGroupName(newName);
      }
    }
  }

  deleteGroup(uuid: number) {
    for (let i = 0; i < this.allGroups.length; i++) {
      let contact = this.allGroups.find((el) => el.uuid == uuid);
      let indexOfContact: number | undefined;
      if (contact) {
        indexOfContact = this.allGroups.indexOf(contact);
      }
      if (indexOfContact) {
        this.allGroups.splice(indexOfContact, 1);
      }
    }
  }
}
