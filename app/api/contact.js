export default function (req, res) {
  console.log(req.body);
}

// export default function (req, res) {
//   console.log("🚀 ~ file: contact.js:18 ~ req.body:", req.body);
//   let nodemailer = require("nodemailer");
//   const transporter = nodemailer.createTransport({
//     port: 465,
//     host: "smtp.gmail.com",
//     auth: {
//       user: "muhammadibrahim.alphasquad@gmail.com",
//       pass: "aqkhan88@",
//     },
//     secure: true,
//   });
//   // const mailData = {
//   //   from: "muhammadibrahim.alphasquad@gmail.com",
//   //   to: "m.ibbi99@gmail.com",
//   //   subject: `Message From ${req.body.name}`,
//   //   text: req.body.message,
//   //   html: <div>{req.body.message}</div>,
//   // };

//   // transporter.sendMail(mailData, function (err, info) {
//   //   if (err) console.log(err);
//   //   else console.log(info);
//   // });
//   // res.status(200);
// }
