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
      order: `${report._id}`,
      date: `${report.date}`,
      issuer: `${report.issuer.name}`,
      solver: `${report.solver.name}`,
      office:`${report.office.address.street} - ${report.office.address.floor} floor`,
      status:`${report.status}`,
    }
    const htmlToSend = template(replacements);

    const filePath2 = path.join(__dirname, '../assets/index2.html');
    const source2 = fs.readFileSync(filePath2, 'utf-8').toString();
    const template2 = handlebars.compile(source2);
    const replacements2 = { 
      order: `${report._id}`,
      date: `${report.date}`,
      issuer: `${report.issuer.name}`,
      solver: `${report.solver.name}`,
      office:`${report.office.address.street} - ${report.office.address.floor} floor`,
      status:`${report.status}`,
    }
    const htmlToSend2 = template2(replacements2);

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
      html: op ? htmlToSend : htmlToSend2
    });

    return sended;

}

module.exports = { sendEmail }