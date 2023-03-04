// Stwórz fukcjonalność do pobierania i cachowania danych z https://www.googleapis.com/books/v1/volumes?q=clarcson która:
//  Pobierze dane poprzez axiosa/fetcha z open api google books na podstawie danego query
//  Dla każdego query (q=) który wpisze user, funkcja zapisze plik json w folderze /cache o nazwie szukanego query oraz zwróci pobrane dane
//  Ponowne wywołanie danej funkcjonalności z tym samym query powoduje zaserwowanie danych z pliku json

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

import routes from './routes/main';
// const routes = require('./routes/main');

dotenv.config();
app.use(routes);

const MY_PORT = process.env.PORT;
app.listen(MY_PORT);
