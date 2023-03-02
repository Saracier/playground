"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
// import fetch from "node-fetch";
// import bodyParser from 'body-parser';
// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
const APIURL = 'https://www.googleapis.com/books/v1/volumes';
class Util {
    static getFullQuerryUrl(query) {
        return `${APIURL}?q=${query}`;
    }
    static getFileDataPath(dataName) {
        return path_1.default.join(path_1.default.dirname(require.main.filename), 
        // path.dirname(process.mainModule.filename),
        'cache', `${dataName}.json`);
    }
}
_a = Util;
Util.functionWithFetch = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const querryURL = Util.getFullQuerryUrl(query);
    const dataPath = Util.getFileDataPath(query);
    // fs.readFile(Util.getFileDataPath(query), (err, fileContent) => {
    //   if (!err) {
    //     return JSON.parse(fileContent);
    //   }
    // });
    let dataLocal;
    try {
        dataLocal = fs_1.default.readFileSync(dataPath);
        console.log('util.ts linijka 39', dataLocal);
    }
    catch (err) {
        console.log(err);
    }
    if (dataLocal) {
        console.log('datalocal util.ts linijka 46', dataLocal);
        return dataLocal;
    }
    else {
        try {
            const response = yield (yield (0, cross_fetch_1.default)(querryURL)).json();
            console.log('util.ts linijka 47', response);
            // const response = await fetch(
            //   'https://www.googleapis.com/books/v1/volumes?q=clarcson'
            // );
            // const data = response.json();
            const res = response;
            fs_1.default.writeFile(dataPath, JSON.stringify(response), (err) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log('plik z util.ts linijka 63 zapisany poprawnie');
                }
            });
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }
});
Util.isLoadingFile = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const road = path_1.default.join(path_1.default.dirname(require.main.filename), 'cache', `${query}.json`);
    console.log('consolelog util.ts linijka 59', road);
    return fs_1.default.readFileSync(road);
    // fs.readFile(road, async (err, fileContent) => {
    //   fileContent = await JSON.parse(fileContent);
    //   console.log('consolelog util.ts linijka 62', fileContent);
    //   if (!err) {
    //     console.log('consolelog util.ts linijka 64', fileContent);
    //     return JSON.stringify(fileContent);
    //   }
    // });
});
module.exports = Util;
