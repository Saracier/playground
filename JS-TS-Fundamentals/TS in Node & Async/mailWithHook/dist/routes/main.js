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
// const Util = require('../util/util');
const util_1 = require("../util/util");
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
const sendFirstEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetMail = req.params.targetMail;
        yield util_1.Util.sendFirstEmail(targetMail);
        res.send(`mail will be sent to ${targetMail}. Check your inbox`);
    }
    catch (err) {
        console.error(err);
        res.send('An error occured. Our Developers working on it');
    }
    // const targetMail = req.params.targetMail;
    // const dat = new Promise(async (resolve, reject) => {
    //   const dat2 = await Util.isLoadingFile(targetMail);
    //   console.log(dat2);
    //   resolve(dat2);
    // });
    // let dat = await Util.functionWithFetch(targetMail);
    // console.log('main.ts linijka 49', dat);
    // let data = JSON.parse(dat);
    // console.log('hello from main line 44', await dat);
    // let data = Util.functionWithFetch(targetMail);
    // console.log('hello from main line 45', await dat);
    // res.send(dat);
});
const sendSecondEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetMail = req.params.targetMail;
        yield util_1.Util.sendSecondEmail(targetMail);
    }
    catch (err) {
        console.error(err);
        res.send('An error occured. Our Developers working on it');
    }
});
router.get('/q=:targetMail', sendFirstEmail);
router.get('/helloq=:targetMail', sendSecondEmail);
// module.exports = router;
exports.default = router;
// https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
