/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import nodemailer, { TransportOptions } from "nodemailer";
import { saveCode } from "./dbAction";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: "465",
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
} as TransportOptions);

export async function sendConfirmation(email: string) {
  // console.log(email);
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += "" + Math.floor(Math.random() * 9);
  }
  try {
    // Save the code in database
    await saveCode(email, code);
    const info = await transporter.sendMail({
      from: "Voting Website <Info@varianceproject.com>",
      to: email,
      subject: "Voting Confirmation",
      text:
        "The cofirmation code is: " +
        code +
        ", The code will be valid for 5 minutes.",
    });
    console.log(info);
    return true;
  } catch {
    return false;
  }
}
