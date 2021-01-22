const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendVerificationEmail2 = async (user) => {
  const linkForVarification = `${process.env.DOMAIN_ADDRESS}/verification/${user.verificationToken}`;

  const msg = {
    to: user.email, // Change to your recipient
    from: process.env.NODEMAILER_EMAIL, // Change to your verified sender
    subject: "Email verification",
    // text: "and easy to do anywhere, even with Node.js",
    html: `<p>
      Hello ${user.username}! Please verify your email by following next link.
      <p>Please open this <a href='${linkForVarification}'>link</a> and varify your email</p>
      </p>`,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

// exports.mailing = new Mailing();
