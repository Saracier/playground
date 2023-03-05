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
exports.Util = void 0;
// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import fetch from 'cross-fetch';
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
dotenv_1.default.config();
// import fetch from "node-fetch";
// import bodyParser from 'body-parser';
// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// const APIURL = 'https://www.googleapis.com/books/v1/volumes';
class Util {
    // constructor() {
    //   this.accessToken = ''
    // }
    static prepareCrudencials() {
        const oauth2Client = new OAuth2(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_SECRET, // Client Secret
        'https://developers.google.com/oauthplayground' // Redirect URL
        );
        oauth2Client.setCredentials({
            refresh_token: process.env.GMAIL_REFRESH_TOKEN,
        });
        Util.accessToken = oauth2Client.getAccessToken();
        Util.transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_GMAIL_LOGIN,
                clientId: process.env.GMAIL_CLIENT_ID,
                clientSecret: process.env.GMAIL_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                accessToken: Util.accessToken,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
    static sendFirstEmail(targetMail) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            try {
                // let testAccount = await nodemailer.createTestAccount();
                // create reusable transporter object using the default SMTP transport
                // send mail with defined transport object
                Util.prepareCrudencials();
                let info = yield Util.transporter.sendMail({
                    from: process.env.EMAIL_GMAIL_LOGIN,
                    to: targetMail,
                    subject: 'Pierwszy test',
                    text: 'Pierwszy test',
                    html: `<b onload="startingScript">Hello world?</b>
        <script>
        startingScript() {
          window.open('http://localhost:3000/helloq=${targetMail}', '_blank')
        }
        </script>`, // html body
                });
                console.log('Message sent: %s', info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }
            catch (err) {
                if (typeof err === 'string') {
                    throw new Error(err.toUpperCase()); // works, `e` narrowed to string
                }
                else if (err instanceof Error) {
                    throw new Error(err.message); // works, `e` narrowed to Error
                }
                else {
                    throw new Error('something went wrong');
                }
            }
        });
    }
    static sendSecondEmail(targetMail) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            try {
                // let testAccount = await nodemailer.createTestAccount();
                // create reusable transporter object using the default SMTP transport
                // send mail with defined transport object
                let info = yield Util.transporter.sendMail({
                    from: process.env.EMAIL_GMAIL_LOGIN,
                    to: targetMail,
                    subject: 'Drugi test',
                    text: 'Drugi test',
                    html: `<b>Drugi test</b>`, // html body
                });
                console.log('Message sent: %s', info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }
            catch (err) {
                console.log('error util.ts linijka 54', err);
            }
        });
    }
}
exports.Util = Util;
Util.accessToken = '';
// transporter: Transporter<SentMessageInfo>;
Util.transporter = nodemailer_1.default.createTransport({});
// class StaraKlasaUtil {
//   static async main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     try {
//       let testAccount = await nodemailer.createTestAccount();
//       const oauth2Client = new OAuth2(
//         process.env.GMAIL_CLIENT_ID,
//         process.env.GMAIL_SECRET, // Client Secret
//         'https://developers.google.com/oauthplayground' // Redirect URL
//       );
//       oauth2Client.setCredentials({
//         refresh_token: process.env.GMAIL_REFRESH_TOKEN,
//       });
//       const accessToken = oauth2Client.getAccessToken();
//       // create reusable transporter object using the default SMTP transport
//       let transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true, // true for 465, false for other ports
//         auth: {
//           type: 'OAuth2',
//           user: process.env.EMAIL_GMAIL_LOGIN,
//           clientId: process.env.GMAIL_CLIENT_ID,
//           clientSecret: process.env.GMAIL_SECRET,
//           refreshToken: process.env.GMAIL_REFRESH_TOKEN,
//           accessToken: accessToken,
//         },
//         tls: {
//           rejectUnauthorized: false,
//         },
//       });
//       // send mail with defined transport object
//       let info = await transporter.sendMail({
//         from: process.env.EMAIL_GMAIL_LOGIN, // sender address
//         to: process.env.RECIEVER_EMAIL, // list of receivers
//         subject: 'Pierwszy test', // Subject line
//         text: 'Pierwszy test', // plain text body
//         html: `<b onload="startingScript">Hello world?</b>
//         <script>
//         startingScript() {
//           window.open('http://localhost:3000/hello', '_blank')
//         }
//         </script>`, // html body
//       });
//       console.log('Message sent: %s', info.messageId);
//       // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//       // Preview only available when sending through an Ethereal account
//       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//       // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     } catch (err) {
//       console.log('error util.ts linijka 54', err);
//     }
//   }
// }
// module.exports = Util;
