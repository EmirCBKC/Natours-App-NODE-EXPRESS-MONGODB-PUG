const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");

//* Example => new Email(user, url).sendWelcome();
module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(" ")[0];
        this.url = url;
        this.from = `Emircan ÇUBUKCU <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {

        if (process.env.NODE_ENV === "production") {
            //* Sendgrid
            return nodemailer.createTransport({
                service: "SendGrid",
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

    }

    //* Send the actual email
    async send(template, subject) {

        //* 1-) Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        });

        //* 2-a) Define the email options in "PRODUCTION"
        if (process.env.NODE_ENV === "production") {
            const mailOptions = {
                from: process.env.SENDGRID_EMAIL_FROM,
                to: this.to,
                subject,
                html,
                text: convert(html, {
                    wordwrap: false,
                })
            };

            //* 3-a) Create a transport and send email
            return await this.newTransport().sendMail(mailOptions);
        }

        //* 2-b) Define the email options in "DEVELOPMENT"
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: convert(html, {
                wordwrap: false,
            })
        };

        //* 3-b) Create a transport and send email
        return await this.newTransport().sendMail(mailOptions);

    }

    async sendWelcome() {
        await this.send("welcome", "Welcome to the Natours Family!");
    }

    async sendPasswordReset() {
        await this.send("passwordReset", "Your password reset token (valid for only 10 minutes)");
    }

};
