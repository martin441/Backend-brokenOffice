const path = require("path");
const nodemailer = require("nodemailer");
const { htmlSelector } = require("./htmlSelector");
require("dotenv").config();
const { NM_EMAIL, NM_PASS } = process.env;

async function sendEmail(report, op, shareMail) {
  const imgPath = path.join(__dirname, "../assets/greenbook-logo-7.jpg");

  const htmlToSend = htmlSelector(report, op);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: NM_EMAIL,
      pass: NM_PASS,
    },
  });

  let varTo;
  if (op === 2) {
    varTo = shareMail;
  } else if (op === 5 || op === 6) {
    varTo = report.email;
  } else {
    varTo = report.issuer.email;
  }

  const sended = await transporter.sendMail({
    from: op ? NM_EMAIL : `${report.issuer.email}`,
    to: varTo,
    subject:
      op === 5
        ? `Broken Office Restore Password`
        : `Broken Office Report: ${report.title}`,
    html: htmlToSend,
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
