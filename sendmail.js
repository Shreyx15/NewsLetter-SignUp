const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();



const sendMail = function main() {
    // create transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'shreyv15@gmail.com',
            pass: 'shrey@2002',
            clientId: '715887991919-3lucrbaqfeknbsqg1pojbt11dvgmtolq.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//04YEY0z5hascnCgYIARAAGAQSNgF-L9Ir9rsjTw2rE51VPVwSyJJ_h1QxwP03kpzsef6MfAN4-HwsEP2NoGHXkl_ekQ1sRqgYcg',
            accessToken: 'ya29.ya29.a0AVvZVsr1iQzX8G1BKn-p2VE0MxKhXcO6TgxbY4vN5MwxwF3KEQZrUtXK6C4-FPttkDREAFowEjL9AEhJ6Z9S0ZMbSCr3nma8-5wgAujY0VNVuwSDrkK9htkweeVroUaYOoWderFvsLK0cJJynI7NpCtyHMavmZMaCgYKAUgSARMSFQGbdwaIsYULtfHk86-y55X5_MqIlA0166    ',
        }
    });

    // send mail
    const mailOptions = {
        from: 'shreyv15@gmail.com',
        to: ['legendarynoobx15@gmail.com', 'quincyvaghela112@gmail.com'],
        subject: 'Test email',
        text: 'This is a test email sent using nodemailer and Gmail API.'
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(info.status);
    });
};



module.exports.sendMail = sendMail;