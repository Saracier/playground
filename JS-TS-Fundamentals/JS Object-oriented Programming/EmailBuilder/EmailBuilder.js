//  Wykorzystując wzorzec projektowy Builder stwórz obiekt json reprezentujacy wszystkie parametry maila (parametry znajdują sie w kodzie poniżej)

class EmailBuilder {
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
  changeFrom(changedFrom) {
    this._mail.from = changedFrom;
  }
  changeTo(changedTo) {
    this._mail.to = changedTo;
  }
  changeTitle(changedTitle) {
    this._mail.title = changedTitle;
  }
  changeCc(changedCc) {
    this._mail.cc = changedCc;
  }
  changeBcc(changedBcc) {
    this._mail.bcc = changedBcc;
  }
  changeHtml(changedHtml) {
    this._mail.html = changedHtml;
  }

  buildMail = () => {
    return JSON.stringify(this._mail);
  };
}

function buildMail(from, to, title, cc, bcc, html) {
  email = new EmailBuilder();
  email.changeFrom(from);
  email.changeTo(to);
  email.changeTitle(title);
  email.changeCc(cc);
  email.changeBcc(bcc);
  email.changeHtml(html);
  return email.buildMail();
}
