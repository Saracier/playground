import express from 'express';
import fs from 'fs';
import path from 'path';
import fetch from 'cross-fetch';
// import fetch from "node-fetch";
// import bodyParser from 'body-parser';

const app = express();

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

    fs.readFile(Util.getFileDataPath(query), (err, fileContent) => {
      if (!err) {
        return JSON.parse(fileContent);
      }
    });

    try {
      const response = await fetch(querryURL);
      // const response = await fetch(
      //   'https://www.googleapis.com/books/v1/volumes?q=clarcson'
      // );
      const data = response.json();
      fs.writeFile(Util.getFileDataPath(query), JSON.stringify(data), (err) => {
        if (err) {
          console.error(err);
        }
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = Util;
