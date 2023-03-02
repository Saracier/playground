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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Util = require('../util/util');
const router = express_1.default.Router();
// const firstPage = (req: Request, res: Response, next: Function) => {
//   res.sendFile(
//     path.join(path.dirname(require.main.filename), 'views', 'index.html')
//   );
// };
// const newItem = (req: Request, res: Response, next) => {
//   //
//   // req.body;
//   // res.send();
//   //
//   //
//   console.log(`Komentarz z main.ts linijka okolice 17 `, req.body.title);
//   res.redirect(`/${req.body.title}`);
//   // next();
// };
// const fileNameX = async (req: Request, res: Response, next: Function) => {
//   console.log(`Komentarz z main.ts linijka okolice 22 ${req.params.fileNameX}`);
//   const fileNm = req.params.fileNameX;
//   const data = await Util.functionWithFetch(fileNm);
//   return data;
// };
// router.get('/', firstPage);
// router.post('/', newItem);
// router.get('/:fileNameX', fileNameX);
const requestetFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.params.fileName;
    //
    // !!!
    // Typescript mi krzyczy, że req nie ma wartości params, a dokumentacja expressa mówi, że ma https://expressjs.com/en/guide/routing.html
    //
    // const dat = new Promise(async (resolve, reject) => {
    //   const dat2 = await Util.isLoadingFile(fileName);
    //   console.log(dat2);
    //   resolve(dat2);
    // });
    let dat = yield Util.functionWithFetch(fileName);
    console.log('main.ts linijka 49', dat);
    // let data = JSON.parse(dat);
    // console.log('hello from main line 44', await dat);
    // let data = Util.functionWithFetch(fileName);
    console.log('hello from main line 45', yield dat);
    res.send(dat);
});
router.get('/q=:fileName', requestetFile);
module.exports = router;
