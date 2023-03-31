const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
require("dotenv").config();
const { NM_EMAIL, NM_PASS } = process.env;

async function sendEmail (report, op, shareMail) {

    const filePath = path.join(__dirname, '../assets/index.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = { 
        name: `${report.issuer.name}`
    }
    const htmlToSend = template(replacements);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: NM_EMAIL,
        pass: NM_PASS,
      },
    });

    const sended = await transporter.sendMail({
      from: op ? NM_EMAIL : `${report.issuer.email}`,
      to: op ? `${report.issuer.email}` : shareMail,
      subject: `Broken Office Report: ${report.title}`,
      html: op ? htmlToSend : `<h1>GRACIAS POR SU COMPRA</h1>
      <p>TOTAL ABONADO: </p>
      <p>DESTINO : </p>`
    });

    return sended;

}

module.exports = { sendEmail }