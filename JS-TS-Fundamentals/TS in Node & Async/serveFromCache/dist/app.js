"use strict";
// Stwórz fukcjonalność do pobierania i cachowania danych z https://www.googleapis.com/books/v1/volumes?q=clarcson która:
//  Pobierze dane poprzez axiosa/fetcha z open api google books na podstawie danego query
//  Dla każdego query (q=) który wpisze user, funkcja zapisze plik json w folderze /cache o nazwie szukanego query oraz zwróci pobrane dane
//  Ponowne wywołanie danej funkcjonalności z tym samym query powoduje zaserwowanie danych z pliku json
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const dotenv = require('dotenv');
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
// const router = express.Router();
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({ extended: false }));
const routes = require('./routes/main');
// import * as routes from './routes/main';
app.use(routes);
// const APIURL = 'https://www.googleapis.com/books/v1/volumes';
const MY_PORT = process.env.PORT;
// const dataPath = path.join(path.dirname(process.mainModule.filename), 'data');
// const functionWithAxios = (query) => {
//   // axios.get(apiUrl).then()...
// };
// router.get('/:querryID', functionWithFetch(querryId));
app.listen(MY_PORT);
