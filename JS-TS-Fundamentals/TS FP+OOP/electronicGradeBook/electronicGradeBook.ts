// Cele główne
// Stwórz dziennik elektroniczny, który będzie umożliwiał prowadzenie ewidencji i postępów klasy:
// Stwórz obiekt odwzorowywujący nauczyciela oraz wychowawcę klasy
// Stwórz obiekt odwzorowywujący ucznia
// Stwórz obiekt odwzorowywujący rodzica
// Stwórz obiekt odwzorowywujący dziennik

interface ITeacher {
  firstName: string;
  secondName: string;
  subject: string;
  emailInbox: [number, string][];
}

class Teacher {
  // Ma miec: Imie, Nazwisko, uuid, nauczany przedmiot, oraz skrzynkę odbiorczą na wiadomości od rodziców i uczniów
  // Ma umożliwiać:
  // - przeglądanie listy uczniów i rodziców
  // - przeglądanie ocen każdego ucznia
  // - dodawanie ocen każdemu uczniowi
  // - wpisywanie nieobecności każdemu uczniowi
  // - odczytywanie wiadomości
  // - odpisywanie na wiadomości
  firstName: string;
  secondName: string;
  subject: string;
  emailInbox: [number, string][] = [];
  uuid: number;

  constructor(firstName: string, secondName: string, subject: string) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.subject = subject;
    this.uuid = Math.random();
  }
}

class ClassTeacher extends Teacher {
  // to samo co klasa Teacher, i dodatkowo możliwość dodawania i usuwania uczniów, rodziców i nauczycieli z dziennika, oraz wysyłanie wiadomości do wszystkich uczniów w klasie lub rodziców naraz

  constructor(firstName: string, secondName: string, subject: string) {
    super(firstName, secondName, subject);
  }
}

class Parent {
  // Ma miec: imie, nazwisko, uuid, oraz powinien mieć przypisanego studenta jako dziecko
  // Ma umożliwiać:
  // - przeglądanie ocen swojego dziecka
  // - przeglądanie nieobecności swojego dziecka
  // - usprawiedliwianie nieobecności swojego dziecka
  // - wymianę wiadomości z nauczycielem
  uuid: number;
  emailInbox: [number, string][] = [];
  constructor(public firstName: string, public secondName: string) {
    this.uuid = Math.random();
  }
}

class Student {
  // Ma mieć: imie, nazwisko, uuid oraz przypisanego rodzica
  // Ma umożliwiać:
  // - przeglądanie swoich ocen
  // - przeglądanie swoich nieobecności
  // - wymianę wiadomości z nauczycielem
  uuid: number;
  grades: number[];
  emailInbox: [number, string][] = [];
  constructor(
    public firstName: string,
    public secondName: string,
    public parent: Parent
  ) {
    this.uuid = Math.random();
  }

  giveGrade(grade: number) {
    if (grade < 1 || grade > 6) {
      return;
    }
    this.grades.push(grade);
  }
}

class GradeBook {
  // Ma miec;
  // - przypisanego wychowawcę
  // - listę nauczycieli
  // - liste uczniów z przypisanymi rodzicami
  // Ma umożliwiać:
  // - dodawanie uczniów i rodziców
  // - przypisywanie uczniów do rodziców lub na odwrót
  // - dodawanie nauczycieli (przy odpowiednich uprawnieniach)
  // - listę nieobecności
  // - kanały komunikacyjne

  listOfTeachers: Teacher[] = [];
  listOfStudents: Student[] = [];
  classTeacher: ClassTeacher;
  listOfParents: Parent[] = [];

  private findStudent(studentUuid: number) {
    return this.listOfStudents
      .map((element) => element.uuid)
      .indexOf(studentUuid);
  }

  private findParent(parentUuid: number) {
    return this.listOfParents
      .map((element) => element.uuid)
      .indexOf(parentUuid);
  }

  private findTeacher(teacherUuid: number) {
    return this.listOfTeachers
      .map((element) => element.uuid)
      .indexOf(teacherUuid);
  }

  addStudent(
    requestExecutorUuid: number,
    firstName: string,
    secondName: string,
    parent: Parent
  ) {
    if (this.classTeacher.uuid !== requestExecutorUuid) {
      return;
    }
    const newStudent = new Student(firstName, secondName, parent);
    this.listOfStudents.push(newStudent);
  }

  deleteStudent(requestExecutorUuid: number, studentUuid: number) {
    if (this.classTeacher.uuid !== requestExecutorUuid) {
      return;
    }
    const indexOfStudent = this.findStudent(studentUuid);
    if (indexOfStudent >= 0) {
      this.listOfStudents.splice(indexOfStudent, 1);
    }
  }

  addParent(
    requestExecutorUuid: number,
    firstName: string,
    secondName: string
  ) {
    if (this.classTeacher.uuid !== requestExecutorUuid) {
      return;
    }
    const newParent = new Parent(firstName, secondName);
    this.listOfParents.push(newParent);
  }

  deleteParent(requestExecutorUuid: number, parentUuid: number) {
    if (this.classTeacher.uuid !== requestExecutorUuid) {
      return;
    }
    const indexOfParent = this.findParent(parentUuid);
    if (indexOfParent >= 0) {
      this.listOfParents.splice(indexOfParent, 1);
    }
  }

  giveListOfParents(requestExecutorUuid: number) {
    if (this.findTeacher(requestExecutorUuid) < 0) {
      return;
    }
    return this.listOfParents;
  }

  giveListOfStudents(requestExecutorUuid: number) {
    if (this.findTeacher(requestExecutorUuid) < 0) {
      return;
    }
    return this.listOfStudents;
  }

  lookThroughGrades(requestExecutorUuid: number, studentUuid: number) {
    if (
      this.findTeacher(requestExecutorUuid) < 0 ||
      (this.findStudent(studentUuid) >= 0 &&
        this.listOfStudents[this.findStudent(studentUuid)].parent.uuid !==
          requestExecutorUuid)
    ) {
      return;
    }
    return this.listOfStudents[this.findStudent(studentUuid)].grades;
  }

  addGrade(requestExecutorUuid: number, studentUuid: number, grade: number) {
    if (this.findTeacher(requestExecutorUuid) < 0) {
      return;
    }
    this.listOfStudents[studentUuid].giveGrade(grade);
  }

  printMessages(requestExecutorUuid: number) {
    if (
      this.listOfTeachers[this.findTeacher(requestExecutorUuid)].uuid ===
      requestExecutorUuid
    ) {
      return this.listOfTeachers[this.findTeacher(requestExecutorUuid)]
        .emailInbox;
    }
    if (
      this.listOfParents[this.findParent(requestExecutorUuid)].uuid ===
      requestExecutorUuid
    ) {
      return this.listOfParents[this.findParent(requestExecutorUuid)]
        .emailInbox;
    }
    if (
      this.listOfStudents[this.findStudent(requestExecutorUuid)].uuid ===
      requestExecutorUuid
    ) {
      return this.listOfStudents[this.findStudent(requestExecutorUuid)]
        .emailInbox;
    }
  }

  sendMessage(
    requestExecutorUuid: number,
    targetUuid: number,
    message: string
  ) {
    if (
      this.findTeacher(requestExecutorUuid) < 0 &&
      this.findParent(requestExecutorUuid) < 0 &&
      this.findStudent(requestExecutorUuid) < 0
    ) {
      return;
    }
    if (this.findParent(targetUuid) >= 0) {
      this.listOfStudents[targetUuid].emailInbox.push([
        requestExecutorUuid,
        message,
      ]);
    }
    if (this.findTeacher(targetUuid) >= 0) {
      this.listOfTeachers[targetUuid].emailInbox.push([
        requestExecutorUuid,
        message,
      ]);
    }
    if (this.findStudent(targetUuid) >= 0) {
      this.listOfStudents[targetUuid].emailInbox.push([
        requestExecutorUuid,
        message,
      ]);
    }
  }
  //
  // I dalej więcej metod robionych na wzór i podobieństwo. Chyba każdy ogarnia o co chodzi
  //
}
