import express, { Request, Response } from 'express';

// const Util = require('../util/util');
import { Util } from '../util/util';

const router = express.Router();

const requestetFile = async (req: Request, res: Response, next: Function) => {
  const fileName = req.params.fileName;
  try {
    let dat = await Util.functionWithFetch(fileName);
    res.send(dat);
  } catch (err) {
    console.error(err);
    res.send('An error occured. Our Developers working on it');
  }
};

router.get('/q=:fileName', requestetFile);

// module.exports = router;
export default router;
