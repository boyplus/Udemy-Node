const sgMail = require('@sendgrid/mail');
const sendGridAPIKEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendGridAPIKEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'thanaphon.me@mail.kmutt.ac.th',
        subject: 'Thankyou for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    });
};

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'thanaphon.me@mail.kmutt.ac.th',
        subject: 'Goodbye from task app',
        text: `Goodbye, ${name}. I hope to see you back sometimes soon.`,
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail,
};
