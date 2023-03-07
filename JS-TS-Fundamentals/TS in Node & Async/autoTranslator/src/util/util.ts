import fs from 'fs';
import path from 'path';
import fetch from 'cross-fetch';
import dotenv from 'dotenv';
const { Translate } = require('@google-cloud/translate').v2;

dotenv.config();

export class Util {
  static getFullQuerryUrl(query: string) {
    return `${APIURL}?q=${query}`;
  }

  private static getFileDataPath(dataName: string) {
    return path.join(path.dirname(__dirname), 'cache', `${dataName}.json`);
  }

  static functionWithFetch = async (
    query: string
  ): Promise<JSON | Error | Buffer> => {
    const querryURL = Util.getFullQuerryUrl(query);
    const dataPath = Util.getFileDataPath(query);
    let dataLocal;

    try {
      dataLocal = fs.readFileSync(dataPath);
    } catch (err) {
      console.log("can't find such file. Making new one");
    }

    if (dataLocal) {
      return dataLocal;
    } else {
      return await Util.downloadDataWithFetch(querryURL, dataPath);
    }
  };

  static downloadDataWithFetch = async (
    querryURL: string,
    dataPath: string
  ) => {
    try {
      const response = await (await fetch(querryURL)).json();
      fs.writeFile(dataPath, JSON.stringify(response), (err) => {
        if (err) {
          console.error(err);
        }
      });
      return response;
    } catch (err) {
      if (typeof err === 'string') {
        throw new Error(err.toUpperCase()); // works, `e` narrowed to string
      } else if (err instanceof Error) {
        throw new Error(err.message); // works, `e` narrowed to Error
      } else {
        throw new Error('something went wrong');
      }
    }
  };
}

let CREDENTIALS;
if (process.env.CREDENTIALS) {
  CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
} else {
  throw new Error('cannot find proper credentials from env file');
}

const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

const detectLanguage = async (text: string) => {
  try {
    let response = await translate.detext(text);
    return response[0].language;
  } catch (error) {
    console.log(`Error at detectLanguage : ${error}`);
    return 0;
  }
};

const translateText = async (text: string, targetLanguage: string) => {
  try {
    let [response] = await translate.translate(text, targetLanguage);
    return response;
  } catch (error) {
    console.log(`Error ar translateText : ${error}`);
    return 0;
  }
};

// module.exports = Util;
