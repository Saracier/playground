// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import fetch from 'cross-fetch';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

dotenv.config();

// import fetch from "node-fetch";
// import bodyParser from 'body-parser';

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));

// const APIURL = 'https://www.googleapis.com/books/v1/volumes';
export class Util {
  static accessToken: string = '';
  // transporter: Transporter<SentMessageInfo>;
  static transporter = nodemailer.createTransport({});

  // constructor() {
  //   this.accessToken = ''
  // }

  static prepareCrudencials() {
    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_SECRET, // Client Secret
      'https://developers.google.com/oauthplayground' // Redirect URL
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    Util.accessToken = oauth2Client.getAccessToken();

    Util.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports

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

  static async sendFirstEmail(targetMail: string) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    try {
      // let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport

      // send mail with defined transport object
      Util.prepareCrudencials();
      let info = await Util.transporter.sendMail({
        from: process.env.EMAIL_GMAIL_LOGIN, // sender address
        to: targetMail, // list of receivers
        subject: 'Pierwszy test', // Subject line
        text: 'Pierwszy test', // plain text body
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
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (err) {
      if (typeof err === 'string') {
        throw new Error(err.toUpperCase()); // works, `e` narrowed to string
      } else if (err instanceof Error) {
        throw new Error(err.message); // works, `e` narrowed to Error
      } else {
        throw new Error('something went wrong');
      }
    }
  }

  static async sendSecondEmail(targetMail: string) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    try {
      // let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport

      // send mail with defined transport object
      let info = await Util.transporter.sendMail({
        from: process.env.EMAIL_GMAIL_LOGIN, // sender address
        to: targetMail, // list of receivers
        subject: 'Drugi test', // Subject line
        text: 'Drugi test', // plain text body
        html: `<b>Drugi test</b>`, // html body
      });

      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (err) {
      if (typeof err === 'string') {
        throw new Error(err.toUpperCase()); // works, `e` narrowed to string
      } else if (err instanceof Error) {
        throw new Error(err.message); // works, `e` narrowed to Error
      } else {
        throw new Error('something went wrong');
      }
    }
  }

  // main().catch(console.error);

  // static getFullQuerryUrl(query: string) {
  //   return `${APIURL}?q=${query}`;
  // }

  // static getFileDataPath(dataName: string) {
  //   return path.join(
  //     path.dirname(require.main.filename),
  //     // path.dirname(process.mainModule.filename),
  //     'cache',
  //     `${dataName}.json`
  //   );
  // }

  // static functionWithFetch = async (query: string) => {
  //   const querryURL = Util.getFullQuerryUrl(query);

  //   const dataPath = Util.getFileDataPath(query);

  //   // fs.readFile(Util.getFileDataPath(query), (err, fileContent) => {
  //   //   if (!err) {
  //   //     return JSON.parse(fileContent);
  //   //   }
  //   // });
  //   let dataLocal;

  //   try {
  //     dataLocal = fs.readFileSync(dataPath);
  //     console.log('util.ts linijka 39', dataLocal);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   if (dataLocal) {
  //     console.log('datalocal util.ts linijka 46', dataLocal);
  //     return dataLocal;
  //   } else {
  //     try {
  //       const response = await (await fetch(querryURL)).json();
  //       console.log('util.ts linijka 47', response);
  //       // const response = await fetch(
  //       //   'https://www.googleapis.com/books/v1/volumes?q=clarcson'
  //       // );
  //       // const data = response.json();
  //       const res = response;
  //       fs.writeFile(dataPath, JSON.stringify(response), (err) => {
  //         if (err) {
  //           console.error(err);
  //         } else {
  //           console.log('plik z util.ts linijka 63 zapisany poprawnie');
  //         }
  //       });
  //       return res;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // };

  // static isLoadingFile = async (query: string) => {
  //   const road = path.join(
  //     path.dirname(require.main.filename),
  //     'cache',
  //     `${query}.json`
  //   );
  //   console.log('consolelog util.ts linijka 59', road);
  //   return fs.readFileSync(road);
  //   // fs.readFile(road, async (err, fileContent) => {
  //   //   fileContent = await JSON.parse(fileContent);
  //   //   console.log('consolelog util.ts linijka 62', fileContent);
  //   //   if (!err) {
  //   //     console.log('consolelog util.ts linijka 64', fileContent);
  //   //     return JSON.stringify(fileContent);
  //   //   }
  //   // });
  // };
}

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
