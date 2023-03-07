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
const APIURL = 'https://www.googleapis.com/books/v1/volumes';
class Util {
    static getFullQuerryUrl(query) {
        return `${APIURL}?q=${query}`;
    }
    static getFileDataPath(dataName) {
        return path_1.default.join(path_1.default.dirname(require.main.filename), 'cache', `${dataName}.json`);
    }
}
_a = Util;
Util.functionWithFetch = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const querryURL = Util.getFullQuerryUrl(query);
    const dataPath = Util.getFileDataPath(query);
    let dataLocal;
    try {
        dataLocal = fs_1.default.readFileSync(dataPath);
    }
    catch (err) {
        console.log(err);
    }
    if (dataLocal) {
        return dataLocal;
    }
    else {
        try {
            const response = yield (yield (0, cross_fetch_1.default)(querryURL)).json();
            const res = response;
            fs_1.default.writeFile(dataPath, JSON.stringify(response), (err) => {
                if (err) {
                    console.error(err);
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
    return fs_1.default.readFileSync(road);
});
module.exports = Util;
