import { MailAdapter, SendMailData } from "../MailAdapter";
import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "cf487716d4cf5d",
        pass: "9406f2caf1ebf6"
    }
});

export class NodemailerAdapter implements MailAdapter {

    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Ronaldo Barbosa <ronaldo.s.barbosa@outlook.com',
            subject: subject,
            html: body
        })
    }
}