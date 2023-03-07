// Integracja z API google translator
// Przetłumaczenie pól obiektu poprzez API googla translatora podany w requestBody
// Zapis wszystkich danych we wskazanym języku w formie pliku js o nazwie tego języka (dla angielskiego będzie to en.json)
// W response zwrócić kompletny obiekt z tekstami
// Cele opcjonalne do wykonania
// Jeśli przy zapytaniu o tłumaczenie na język angielski istnieje już plik en.json to jego zawartość jest zwracana w response
// Funkcja translate nie powinna zmieniać struktury danych językowych oraz powinna tłumaczyć cały obiekt jednocześnie

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
