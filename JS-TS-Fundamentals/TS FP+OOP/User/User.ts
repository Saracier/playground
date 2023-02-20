// Stwórz dwie klasy dla struktury danych związanych z użytkownikiem(wytyczne w kodzie poniżej)
// Klasa User ma dostępne dwa poziomy dostępu: normal i admin.
// Powinna umożliwiać zmianę hasła, emaila oraz poziomu dostępu.
// User z poziomem dostępu = "admin" może zmieniać hasła,emaile oraz poziomy dostępu innych użytkowników.
// Klasa App powinna zarządzać relacjami pomiędzy użytkownikami.
// Zawiera listę użytkowników, pozwala tworzyć nowych użytkowników o różnych poziomach dostępu.

// Stwórz klase pomocniczną Validator, która będzie posiadała metody statyczne odpowiedzalne za walidacje usera. Jeżeli któraś z walidacji się nie powiedzie, instancja ma nie być tworzona, tylko ma zwracać error z odpowiednim komunikatem o niepowiedzionej walidacji. W razie problemów przy tworzeniu klasy validator, polecam zapoznać się z dokumentacja biblioteki is.js.

// Podczas walidacji upewnij się, że:
// - email jest poprawnym emailem
// - hasło ma mieć min 8 znaków, co najmniej jedną wielką literę i co najmniej jedną cyfrę oraz co najmniej 1 znak specjalny
// - płeć musi być ze zbioru [male, female]
// - data (nieważne jaka wejdzie) do konstruktora musi wejść w formacie MM/DD/YYYY
// - imię i nazwisko musi być niepuste

enum UserAcces {
  admin,
  normal,
}

//
//
//
// Interfejsu nie można dla klasy ze statycznymi metodami?
//
//
//
//
//

// interface IValidator {
//   firstnameValidator: (firstName: string) => string;
//   surnameValidator: (surname: string) => string;
//   birthDateValidator: (birthDate: string) => string;
//   genderValidator: (gender: string) => string;
//   emailValidator: (email: string) => string;
//   accessTokenValidator: (accessToken: string) => string;
// }

class Validator {
  static firstnameValidator(firstName: string) {
    if (firstName.length <= 0 || typeof firstName !== 'string') {
      throw new Error('invalid first name');
    }
    return firstName;
  }
  static surnameValidator(surname: string) {
    if (surname.length <= 0 || typeof surname !== 'string') {
      throw new Error('invalid surname');
    }
    return surname;
  }
  static birthDateValidator(birthDate: string) {
    const newDate = new Date(birthDate);
    return `${newDate.getMonth}/${newDate.getDay}/${newDate.getFullYear}`;
  }

  static passwordValidator(password: string) {
    if (password.length < 8) {
      throw new Error('Your password needs a minimum of eight characters');
    } else if (password.search(/[0-9]/) < 0) {
      throw new Error('Your password needs a number');
    } else if (password.search(/[A-Z]/) < 0) {
      throw new Error('Your password needs an single uppsercase letter');
    } else if (password.search(/[!@#$%^&*]/) < 0) {
      throw new Error('Your password needs a special character');
    } else {
      return password;
    }
  }
  static genderValidator(gender: string) {
    if (gender !== 'male' && gender !== 'female') {
      throw new Error('Gender must be male or female');
    }
    return gender;
  }

  static emailValidator(email: string) {
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      throw new Error('invalid email');
    }
    return email;
  }

  static accessTokenValidator(accessToken: UserAcces) {
    if (accessToken === UserAcces.admin) {
      return accessToken;
    } else {
      return UserAcces.normal;
    }
  }
}

class User {
  // imię
  // nazwisko
  // datę urodzenia
  // hasło
  // płeć
  // adres email
  // poziom dostępu = ("user" | "admin")
  firstName: string;
  surname: string;
  birthDate: string;
  password: string;
  gender: string;
  email: string;
  accessToken: UserAcces;

  constructor(
    firstName: string,
    surname: string,
    birthDate: string,
    password: string,
    gender: string,
    email: string,
    accessToken: UserAcces
  ) {
    this.firstName = Validator.firstnameValidator(firstName);
    this.surname = Validator.surnameValidator(surname);
    this.birthDate = Validator.birthDateValidator(birthDate);
    this.password = Validator.passwordValidator(password);
    this.gender = Validator.genderValidator(gender);
    this.email = Validator.emailValidator(email);
    this.accessToken = Validator.accessTokenValidator(accessToken);
  }

  changeProperties(
    whatProperty: string,
    newValueOfProperty: string | UserAcces
  ) {
    if (whatProperty === 'password' && typeof newValueOfProperty === 'string') {
      return Validator.passwordValidator(newValueOfProperty);
    } else if (
      whatProperty === 'email' &&
      typeof newValueOfProperty === 'string'
    ) {
      return Validator.emailValidator(newValueOfProperty);
      // Jak zrobić sprawdzenie bez używania negacji w typeof newValueOfProperty !== 'string'?
    } else if (
      whatProperty === 'accessToken' &&
      typeof newValueOfProperty !== 'string'
    ) {
      return Validator.accessTokenValidator(newValueOfProperty);
    } else {
      throw new Error('inputed property cannot be changed');
    }
  }
}

class App {
  // wszystkie metody w których admin ingeruje we właściwości innych użytkowników

  listOfUsers: User[];
  constructor() {
    this.listOfUsers = [];
  }
  createUser(
    firstName: string,
    surname: string,
    birthDate: string,
    password: string,
    gender: string,
    email: string
  ) {
    const newUser = new User(
      firstName,
      surname,
      birthDate,
      password,
      gender,
      email,
      UserAcces.normal
    );
    this.listOfUsers.push(newUser);
  }
  createAdmin(
    firstName: string,
    surname: string,
    birthDate: string,
    password: string,
    gender: string,
    email: string
  ) {
    const newAdmin = new User(
      firstName,
      surname,
      birthDate,
      password,
      gender,
      email,
      UserAcces.admin
    );
    this.listOfUsers.push(newAdmin);
  }

  changeUserProperties(
    sourceUser: User,
    targetUser: User,
    propertyName: string,
    newPropertyValue: string
  ) {
    if (
      sourceUser.accessToken === UserAcces.admin ||
      sourceUser === targetUser
    ) {
      targetUser.changeProperties(propertyName, newPropertyValue);
    } else {
      throw new Error(
        "Cannot change these properties without admin's permissions"
      );
    }
  }
}
