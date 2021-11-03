//Create reusable transporter object using the default SMTP transpor
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, //true for 465, false other ports
    auth: {
        user:"feriavirtualdidaxia@gmail.com",
        pass:"ielrcakxculfxzxi"
    },
})

transporter.verify().then( () => {
    console.log('Ready for send emails');
} )