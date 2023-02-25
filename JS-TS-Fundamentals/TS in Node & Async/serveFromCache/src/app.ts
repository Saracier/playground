// Stwórz fukcjonalność do pobierania i cachowania danych z https://www.googleapis.com/books/v1/volumes?q=clarcson która:
//  Pobierze dane poprzez axiosa/fetcha z open api google books na podstawie danego query
//  Dla każdego query (q=) który wpisze user, funkcja zapisze plik json w folderze /cache o nazwie szukanego query oraz zwróci pobrane dane
//  Ponowne wywołanie danej funkcjonalności z tym samym query powoduje zaserwowanie danych z pliku json

// const express = require('express');
// const fs = require('fs');
// const path = require('path');
import express from 'express';

import bodyParser from 'body-parser';

const router = express.Router();

const app = express();

const routes = require('./routes/main');

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

const APIURL = 'https://www.googleapis.com/books/v1/volumes';

// const dataPath = path.join(path.dirname(process.mainModule.filename), 'data');






// const functionWithAxios = (query) => {
//   // axios.get(apiUrl).then()...
// };

// router.get('/:querryID', functionWithFetch(querryId));

app.listen(3000);
