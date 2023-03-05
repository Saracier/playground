"use strict";
// Stwórz endpoint na metodzie GET, który wyślę maila z losową treścią i przyciskiem do kliknięcia
// Użytkownik w przypadku otworzenia pierszego maila automatycznie powinien otrzymać drugiego maila
// Cele opcjonalne do wykonania
// Wysyłający dostanie maila, wtedy kiedy osoba do której wysyłamy maila otworzy tego maila
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
// const router = express.Router();
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({ extended: false }));
// const routes = require('./routes/main');
const main_1 = __importDefault(require("./routes/main"));
app.use(main_1.default);
// const APIURL = 'https://www.googleapis.com/books/v1/volumes';
const MY_PORT = process.env.PORT;
// const dataPath = path.join(path.dirname(process.mainModule.filename), 'data');
// const functionWithAxios = (query) => {
//   // axios.get(apiUrl).then()...
// };
// router.get('/:querryID', functionWithFetch(querryId));
app.listen(MY_PORT || 3000);
