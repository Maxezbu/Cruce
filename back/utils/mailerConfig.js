const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  post: 465,
  secure: true,
  auth: {
    user: "getawayexperience@gmail.com",
    pass: "plataforma5",
  },
});

module.exports = transporter;
