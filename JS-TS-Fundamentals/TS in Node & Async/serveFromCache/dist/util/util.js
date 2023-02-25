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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
// import fetch from "node-fetch";
// import bodyParser from 'body-parser';
const app = (0, express_1.default)();
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
    fs_1.default.readFile(Util.getFileDataPath(query), (err, fileContent) => {
        if (!err) {
            return JSON.parse(fileContent);
        }
    });
    try {
        const response = yield (0, cross_fetch_1.default)(querryURL);
        // const response = await fetch(
        //   'https://www.googleapis.com/books/v1/volumes?q=clarcson'
        // );
        const data = response.json();
        fs_1.default.writeFile(Util.getFileDataPath(query), JSON.stringify(data), (err) => {
            if (err) {
                console.error(err);
            }
        });
        return data;
    }
    catch (err) {
        console.error(err);
    }
});
module.exports = Util;
