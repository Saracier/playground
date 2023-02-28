"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const express = require('express');
const router = express.Router();
const Util = require('../util/util');
const firstPage = (req, res, next) => {
    res.sendFile(path.join(path.dirname(require.main.filename), 'views', 'index.html'));
};
const newItem = (req, res, next) => {
    console.log(`Komentarz z main.ts linijka okolice 17 ${req.params}`);
    res.redirect(`/${req.body}`);
    // next();
};
const fileNameX = (req, res, next) => {
    console.log(`Komentarz z main.ts linijka okolice 22 ${req.params.fileNameX}`);
    const fileNm = req.params.fileNameX;
    const data = Util.functionWithFetch(fileNm);
    return data;
};
router.get('/', firstPage);
router.post('/', newItem);
router.get('/:fileNameX', fileNameX);
module.exports = router;
