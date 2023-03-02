import path, { resolve } from 'path';

import express from 'express';

const Util = require('../util/util');

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

const requestetFile = async (req: Request, res: Response, next: Function) => {
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
  let dat = await Util.functionWithFetch(fileName);
  console.log('main.ts linijka 49', dat);
  // let data = JSON.parse(dat);
  // console.log('hello from main line 44', await dat);

  // let data = Util.functionWithFetch(fileName);

  console.log('hello from main line 45', await dat);

  res.send(dat);
};

router.get('/q=:fileName', requestetFile);

module.exports = router;
