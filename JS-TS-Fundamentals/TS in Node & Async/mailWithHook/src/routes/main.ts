// import path, { resolve } from 'path';

import express, { Request, Response } from 'express';

// const Util = require('../util/util');
import { Util } from '../util/util';

const router = express.Router();

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

const sendFirstEmail = async (req: Request, res: Response, next: Function) => {
  try {
    const targetMail = req.params.targetMail;
    const msgRes = await Util.sendFirstEmail(targetMail);
    res.send(msgRes);
  } catch (err) {
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
};

const sendSecondEmail = async (req: Request, res: Response, next: Function) => {
  try {
    const targetMail = req.params.targetMail;
    await Util.sendSecondEmail(targetMail);
  } catch (err) {
    console.error(err);
    res.send('An error occured. Our Developers working on it');
  }
};

router.get('/q=:targetMail', sendFirstEmail);
router.get('/helloq=:targetMail', sendSecondEmail);

// module.exports = router;
export default router;
// https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
