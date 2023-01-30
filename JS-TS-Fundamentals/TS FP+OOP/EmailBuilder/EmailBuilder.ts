//  Wykorzystując wzorzec projektowy Builder stwórz obiekt json reprezentujacy wszystkie parametry maila (parametry znajdują sie w kodzie poniżej)

interface mail {
  from: string;
  to: string;
  title: string;
  cc: string[];
  bcc: string[];
  html: string;
}

class EmailBuilder {
  _mail: mail;
  constructor() {
    this._mail = {
      from: '',
      to: '',
      title: '',
      cc: [],
      bcc: [],
      html: '',
    };
  }

  // Stwórz metody które będą zmieniać parametry from, to, title, cc, bcc, html
  changeFrom(changedFrom: string) {
    this._mail.from = changedFrom;
  }
  changeTo(changedTo: string) {
    this._mail.to = changedTo;
  }
  changeTitle(changedTitle: string) {
    this._mail.title = changedTitle;
  }
  changeCc(changedCc: string[]) {
    this._mail.cc = changedCc;
  }
  changeBcc(changedBcc: string[]) {
    this._mail.bcc = changedBcc;
  }
  changeHtml(changedHtml: string) {
    this._mail.html = changedHtml;
  }

  buildMail = () => {
    return JSON.stringify(this._mail);
  };
}

function buildMail(
  from: string,
  to: string,
  title: string,
  cc: string[],
  bcc: string[],
  html: string
) {
  let email: EmailBuilder = new EmailBuilder();
  email.changeFrom(from);
  email.changeTo(to);
  email.changeTitle(title);
  email.changeCc(cc);
  email.changeBcc(bcc);
  email.changeHtml(html);
  return email.buildMail();
}
