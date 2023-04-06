const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
require("dotenv").config();
const { NM_EMAIL, NM_PASS } = process.env;

async function sendEmail(report, op, shareMail) {
  const filePath = path.join(__dirname, "../assets/index.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = {
    order: `${report._id}`,
    date: `${report.date}`,
    issuer: `${report.issuer.name}`,
    solver: `${report.solver.name}`,
    office: `${report.office.address.street} - ${report.office.address.floor}`,
    status: `${report.status}`,
  };
  const htmlToSend = template(replacements);

  const filePath2 = path.join(__dirname, "../assets/index2.html");
  const source2 = fs.readFileSync(filePath2, "utf-8").toString();
  const template2 = handlebars.compile(source2);
  const replacements2 = {
    order: `${report._id}`,
    date: `${report.date}`,
    issuer: `${report.issuer.name}`,
    solver: `${report.solver.name}`,
    office: `${report.office.address.street} - ${report.office.address.floor}`,
    status: `${report.status}`,
  };
  const htmlToSend2 = template2(replacements2);

  const filePath3 = path.join(__dirname, "../assets/index3.html");
  const source3 = fs.readFileSync(filePath3, "utf-8").toString();
  const template3 = handlebars.compile(source3);
  const replacements3 = {
    order: `${report._id}`,
    date: `${report.date}`,
    issuer: `${report.issuer.name}`,
    solver: `${report.solver.name}`,
    office: `${report.office.address.street} - ${report.office.address.floor}`,
    status: `${report.status}`,
    description: `${report.reason.description}`,
    title: `${report.reason.title}`,
  };
  const htmlToSend3 = template3(replacements3);

  const filePath4 = path.join(__dirname, "../assets/index4.html");
  const source4 = fs.readFileSync(filePath4, "utf-8").toString();
  const template4 = handlebars.compile(source4);
  const replacements4 = {
    order: `${report._id}`,
    date: `${report.date}`,
    issuer: `${report.issuer.name}`,
    solver: `${report.solver.name}`,
    office: `${report.office.address.street} - ${report.office.address.floor}`,
    status: `${report.status}`,
    description: `${report.reason.description}`,
    title: `${report.reason.title}`,
  };
  const htmlToSend4 = template4(replacements4);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: NM_EMAIL,
      pass: NM_PASS,
    },
  });

  const imgPath = path.join(__dirname, "../assets/greenbook-logo-7.jpg");

  let finalHtml = htmlToSend;
  if (op === 2) {
    finalHtml = htmlToSend2;
  } else if (op === 3) {
    finalHtml = htmlToSend3;
  } else if (op === 4) {
    finalHtml = htmlToSend4;
  }

  const sended = await transporter.sendMail({
    from: op ? NM_EMAIL : `${report.issuer.email}`,
    to: op === 2 ? shareMail : `${report.issuer.email}`,
    subject: `Broken Office Report: ${report.title}`,
    html: finalHtml,
    attachments: [
      {
        filename: "greenbook-logo-7.jpg",
        path: imgPath,
        cid: "unique@kreata.ee",
      },
    ],
  });

  return sended;
}

module.exports = { sendEmail };
