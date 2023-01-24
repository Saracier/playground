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

class Validator {
  constructor(
    firstName,
    surname,
    birthDate,
    password,
    gender,
    email,
    accessToken
  ) {
    this.firstName = firstnameValidator(firstName);

    this.surname = surnameValidator(surname);
    this.birthDate = birthDateValidator(birthDate);
    this.password = passwordValidator(password);
    this.gender = genderValidator(gender);
    this.email = emailValidator(email);
    this.accessToken = accessTokenValidator(accessToken);
  }

  firstnameValidator(firstName) {
    if (firstName.length <= 0 || typeof firstName !== 'string') {
      throw new Error('invalid first name');
    }
    return firstName;
  }
  surnameValidator(surname) {
    if (firstName.length <= 0 || typeof firstName !== 'string') {
      throw new Error('invalid surname');
    }
  }
  birthDateValidator(birthDate) {
    // milcząco przyjmuje, że birthDate to data
    const newDate = new Date(birthDate);
    return `${newDate.getMonth}/${newDate.getDay}/${newDate.getFullYear}`;
  }

  passwordValidator(password) {
    // - hasło ma mieć min 8 znaków, co najmniej jedną wielką literę i co najmniej jedną cyfrę oraz co najmniej 1 znak specjalny
    if (password.length < 8) {
      throw new Error('Your password needs a minimum of eight characters');
    } else if (password.search(/[0-9]/) < 0) {
      throw new Error('Your password needs a number');
    } else if (password.search(/[A-Z]/) < 0) {
      throw new Error('Your password needs an uppser case letter');
    } else if (password.search(/[!@#$%^&*]/) < 0) {
      throw new Error('Your password needs a special character');
    } else {
      return password;
    }
  }
  genderValidator(gender) {
    if (gender === 'male' || gender === 'female') {
      return gender;
    } else {
      throw new Error('Gender must be male or female');
    }
  }

  emailValidator(email) {
    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return email;
    } else {
      throw new Error('invalid email');
    }
  }

  accessTokenValidator(accessToken) {
    if (accessToken === 'admin') {
      this.accessToken = 'admin';
    } else {
      this.accessToken = 'normal';
    }
  }
}

class User extends Validator {
  // imię
  // nazwisko
  // datę urodzenia
  // hasło
  // płeć
  // adres email
  // poziom dostępu = ("user" | "admin")
  constructor(
    firstName,
    surname,
    birthDate,
    password,
    gender,
    email,
    accessToken
  ) {
    super(firstName, surname, birthDate, password, gender, email, accessToken);
  }

  changeProperties(whatProperty, newValueOfProperty) {
    if (whatProperty === 'password') {
      return passwordValidator(newValueOfProperty);
    } else if ((whatProperty = 'email')) {
      return emailValidator(newValueOfProperty);
    } else if ((whatProperty = 'accessToken')) {
      return changeAccesToken(newValueOfProperty);
    }
  }
}

class App {
  // wszystkie metody w których admin ingeruje we właściwości innych użytkowników
  constructor() {
    this.listOfUsers = [];
  }
  // createUser i createAdmin robiąto samo. Jak sprawić, żeby tylko admin miał dostęp do metody zmieniającej coś u innego użytkownika?
  // I przy okazji jak określić że użytkownik coś chce? Że ósma osoba z arraya listOfusers wywołuje jakąś metodę?
  createUser(
    firstName,
    surname,
    birthDate,
    password,
    gender,
    email,
    accessToken
  ) {
    const newUser = new User(
      firstName,
      surname,
      birthDate,
      password,
      gender,
      email,
      accessToken
    );
    this.listOfUsers.push(newUser);
  }
  createAdmin(
    firstName,
    surname,
    birthDate,
    password,
    gender,
    email,
    accessToken
  ) {
    const newAdmin = new User(
      firstName,
      surname,
      birthDate,
      password,
      gender,
      email,
      accessToken
    );
    this.listOfUsers.push(newAdmin);
  }
}
