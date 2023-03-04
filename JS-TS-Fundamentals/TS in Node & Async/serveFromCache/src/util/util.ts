import fs from 'fs';
import path from 'path';
import fetch from 'cross-fetch';

const APIURL = 'https://www.googleapis.com/books/v1/volumes';
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

// module.exports = Util;
