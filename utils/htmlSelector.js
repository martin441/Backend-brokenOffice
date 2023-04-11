const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

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
  } else if (op === 3 || op === 4) {
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
  } else if (op === 5 || op === 6) {
    let route = "../assets/index5.html";
    if (op === 6) route = "../assets/index6.html";
    const filePath = path.join(__dirname, route);
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      name: `${report.name}`,
      lastName: `${report.lastName}`,
      email: `${report.email}`,
      token: `${report.tokenUrl}`,
    };
    const htmlToSend = template(replacements);
    return htmlToSend;
  }
};

module.exports = { htmlSelector };
