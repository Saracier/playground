// Stwórz fukcjonalność do pobierania i cachowania danych z https://www.googleapis.com/books/v1/volumes?q=clarcson która:
//  Pobierze dane poprzez axiosa/fetcha z open api google books na podstawie danego query
//  Dla każdego query (q=) który wpisze user, funkcja zapisze plik json w folderze /cache o nazwie szukanego query oraz zwróci pobrane dane
//  Ponowne wywołanie danej funkcjonalności z tym samym query powoduje zaserwowanie danych z pliku json

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const app = express();

const APIURL = 'https://www.googleapis.com/books/v1/volumes';

// const dataPath = path.join(path.dirname(process.mainModule.filename), 'data');

function getFullQuerryUrl(query: string) {
  return `${APIURL}?q=${query}`;
}

function getFileDataPath(dataName: string) {
  return path.join(
    path.dirname(process.mainModule.filename),
    'cache',
    `${dataName}.json`
  );
}

const functionWithFetch = async (query: string) => {
  const querryURL = getFullQuerryUrl(query);
  try {
    fs.readFile(getFileDataPath(query), (err, fileContent) => {
      if (!err) {
        return JSON.parse(fileContent);
      }
    });
  } catch (err) {
    console.log(err);
  }
  try {
    const response = await fetch(querryURL);
    const data = response.json();
    fs.writeFile(getFileDataPath(query), JSON.stringify(data), (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const functionWithAxios = (query) => {
  // axios.get(apiUrl).then()...
};

router.get('/:querryID', functionWithFetch(querryId));

app.listen(3000);
