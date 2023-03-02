import express from 'express';
import fs from 'fs';
import path from 'path';
import fetch from 'cross-fetch';
// import fetch from "node-fetch";
// import bodyParser from 'body-parser';

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));

const APIURL = 'https://www.googleapis.com/books/v1/volumes';
class Util {
  static getFullQuerryUrl(query: string) {
    return `${APIURL}?q=${query}`;
  }

  static getFileDataPath(dataName: string) {
    return path.join(
      path.dirname(require.main.filename),
      // path.dirname(process.mainModule.filename),
      'cache',
      `${dataName}.json`
    );
  }

  static functionWithFetch = async (query: string) => {
    const querryURL = Util.getFullQuerryUrl(query);

    const dataPath = Util.getFileDataPath(query);

    // fs.readFile(Util.getFileDataPath(query), (err, fileContent) => {
    //   if (!err) {
    //     return JSON.parse(fileContent);
    //   }
    // });
    let dataLocal;

    try {
      dataLocal = fs.readFileSync(dataPath);
      console.log('util.ts linijka 39', dataLocal);
    } catch (err) {
      console.log(err);
    }
    if (dataLocal) {
      console.log('datalocal util.ts linijka 46', dataLocal);
      return dataLocal;
    } else {
      try {
        const response = await (await fetch(querryURL)).json();
        console.log('util.ts linijka 47', response);
        // const response = await fetch(
        //   'https://www.googleapis.com/books/v1/volumes?q=clarcson'
        // );
        // const data = response.json();
        const res = response;
        fs.writeFile(dataPath, JSON.stringify(response), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('plik z util.ts linijka 63 zapisany poprawnie');
          }
        });
        return res;
      } catch (err) {
        console.error(err);
      }
    }
  };

  static isLoadingFile = async (query: string) => {
    const road = path.join(
      path.dirname(require.main.filename),
      'cache',
      `${query}.json`
    );
    console.log('consolelog util.ts linijka 59', road);
    return fs.readFileSync(road);
    // fs.readFile(road, async (err, fileContent) => {
    //   fileContent = await JSON.parse(fileContent);
    //   console.log('consolelog util.ts linijka 62', fileContent);
    //   if (!err) {
    //     console.log('consolelog util.ts linijka 64', fileContent);
    //     return JSON.stringify(fileContent);
    //   }
    // });
  };
}

module.exports = Util;
