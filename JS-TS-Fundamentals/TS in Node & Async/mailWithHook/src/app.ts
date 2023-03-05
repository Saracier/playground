// Stwórz endpoint na metodzie GET, który wyślę maila z losową treścią i przyciskiem do kliknięcia
// Użytkownik w przypadku otworzenia pierszego maila automatycznie powinien otrzymać drugiego maila
// Cele opcjonalne do wykonania
// Wysyłający dostanie maila, wtedy kiedy osoba do której wysyłamy maila otworzy tego maila

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// const router = express.Router();

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
// const routes = require('./routes/main');
import routes from './routes/main';

app.use(routes);

// const APIURL = 'https://www.googleapis.com/books/v1/volumes';

const MY_PORT = process.env.PORT;

// const dataPath = path.join(path.dirname(process.mainModule.filename), 'data');

// const functionWithAxios = (query) => {
//   // axios.get(apiUrl).then()...
// };

// router.get('/:querryID', functionWithFetch(querryId));

app.listen(MY_PORT || 3000);
