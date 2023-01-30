//  Wykorzystując wzorzec projektowy Builder stwórz obiekt json reprezentujacy wszystkie parametry maila (parametry znajdują sie w kodzie poniżej)
var EmailBuilder = /** @class */ (function () {
    function EmailBuilder() {
        var _this = this;
        this.buildMail = function () {
            return JSON.stringify(_this._mail);
        };
        this._mail = {
            from: '',
            to: '',
            title: '',
            cc: [],
            bcc: [],
            html: ''
        };
    }
    // Stwórz metody które będą zmieniać parametry from, to, title, cc, bcc, html
    EmailBuilder.prototype.changeFrom = function (changedFrom) {
        this._mail.from = changedFrom;
    };
    EmailBuilder.prototype.changeTo = function (changedTo) {
        this._mail.to = changedTo;
    };
    EmailBuilder.prototype.changeTitle = function (changedTitle) {
        this._mail.title = changedTitle;
    };
    EmailBuilder.prototype.changeCc = function (changedCc) {
        this._mail.cc = changedCc;
    };
    EmailBuilder.prototype.changeBcc = function (changedBcc) {
        this._mail.bcc = changedBcc;
    };
    EmailBuilder.prototype.changeHtml = function (changedHtml) {
        this._mail.html = changedHtml;
    };
    return EmailBuilder;
}());
function buildMail(from, to, title, cc, bcc, html) {
    var email = new EmailBuilder();
    email.changeFrom(from);
    email.changeTo(to);
    email.changeTitle(title);
    email.changeCc(cc);
    email.changeBcc(bcc);
    email.changeHtml(html);
    return email.buildMail();
}
