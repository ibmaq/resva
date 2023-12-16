function generateReservationId() {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function POST(request, response) {
  const data = await request.json();
  let nodemailer = require("nodemailer");
  const reservationId = generateReservationId();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "muhammadibrahim.alphasquad@gmail.com",
      pass: "xhvk zafa znin oovz",
    },
  });
  const mailData = {
    from: "muhammadibrahim.alphasquad@gmail.com",
    to: "m.ibbi99@gmail.com",
    subject: `Reservation ${reservationId} - For ${data.firstName} ${data.lastName}`,
    text: `
      First Name: ${data.firstName}
      Last Name: ${data.lastName}
      Email: ${data.email}
      Phone Number: ${data.phoneNumber}
      Number of Seats: ${data.numberOfSeats}
      Booking Date: ${data.bookingDate}
      Booking Time: ${data.bookingTime}
    `,
    attachments: [],
  };

  // Check if audio attachment is present
  if (data["order-audio"]) {
    mailData.attachments.push({
      filename: `order-${reservationId}.wav`,
      path: data["order-audio"],
    });
  }

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  // res.status(200);
}
