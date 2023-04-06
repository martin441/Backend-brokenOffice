const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
require("dotenv").config();
const { NM_EMAIL, NM_PASS } = process.env;

const htmlSelector = (report, op) => {
  if (op === 1 || op === 2) {
    let route = "../assets/index.html";
    if (op === 2) route = "../assets/index2.html";
    const filePath = path.join(__dirname, route);
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
    return htmlToSend;
  } else {
    let route = "../assets/index3.html";
    if (op === 4) route = "../assets/index4.html";
    const filePath = path.join(__dirname, route);
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      order: `${report._id}`,
      date: `${report.date}`,
      issuer: `${report.issuer.name}`,
      solver: `${report.solver.name}`,
      office: `${report.office.address.street} - ${report.office.address.floor}`,
      status: `${report.status}`,
      description: `${report.reason.description}`,
      title: `${report.reason.title}`,
    };
    const htmlToSend = template(replacements);
    return htmlToSend;
  }
};

module.exports = { htmlSelector };
