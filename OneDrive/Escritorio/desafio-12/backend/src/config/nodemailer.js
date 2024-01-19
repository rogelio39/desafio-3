import 'dotenv/config';
import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "rogeliosuleta@gmail.com",
		pass: process.env.PASSWORD_NODEMAILER,
		authMethod: "LOGIN"
	},
    debug: true,
})

export default transporter;