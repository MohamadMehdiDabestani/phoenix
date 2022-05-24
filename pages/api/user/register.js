import { prisma } from "@/lib";
import Validator from "fastest-validator";
import md5 from "md5";
// import nodemailer from "nodemailer";
const v = new Validator();
// function addDays(date, days) {
// date.setDate(date.getDate() + days);
// return date;
// }
export default async function handler(req, res) {
  const { method } = req;
  let result = {
    status: 200,
    success: true,
    data: {},
    err: {},
    isValidation: false,
  };
  if (method === "POST") {
    try {
      const body = req.body;
      const schema = {
        userName: {
          type: "string",
          max: 150,
          messages: {
            string: "نام کاربری را صحیح وارد کنید",
            stringMax: "نام کاربری نمی تواند بیشتر از 150 کاراکتر باشد",
          },
        },
        email: {
          type: "email",
          max: 150,
          messages: {
            email: "ایمیل را صحیح وارد کنید",
            emailMax: "ایمیل نمی تواند بیشتر از 150 کاراکتر باشد",
          },
        },
        password: {
          type: "string",
          min: 8,
          messages: {
            string: "رمزعبور را صحیح وارد کنید",
            stringMin: "رمز عبور نمی تواند کمتر از 8 رقم باشد",
          },
        },
      };
      const check = v.compile(schema);
      const validation = check({
        userName: body.userName,
        email: body.email,
        password: body.password,
      });
      if (typeof validation === "object") {
        result.err = validation;
        result.success = false;
        result.status = 500;
        result.isValidation = true;
      } else {
        const user = await prisma.user.findUnique({
          where: {
            email: body.email.toLowerCase(),
          },
        });
        if (user !== null) {
          result.err = [{ message: "ایمیل از قبل وارد شده" }];
          result.success = false;
          result.status = 500;
          result.isValidation = true;
        } else {
          await prisma.user.create({
            data: {
              email: body.email.toLowerCase(),
              userName: body.userName,
              password: md5(body.password),
              registerDate: Date().toString(),
            },
          });
        }
        // const transporter = nodemailer.createTransport({
        //   port: 465,
        //   host: "smtp.gmail.com",
        //   auth: {
        //     user: "mohamad.fortnait.user@gmail.com",
        //     pass: "mohamad.fortnait..",
        //   },
        //   secure: true,
        // });
        // const mailData = {
        //   from: "mohamad.fortnait.user@gmail.com",
        //   to: body.email.toLowerCase(),
        //   subject: `ایمیل فعال سازی حساب کاربری`,
        //   text: req.body.message + " | Sent from: " + req.body.email,
        //   html: `<div>${req.body.message}</div><p>Sent from:
        //   ${req.body.email}</p>`,
        // };
        // transporter.sendMail(mailData);
      }
      res.status(result.status).json(result);
    } catch (err) {
      console.log(err);
      if (err.meta.target[0] === "email") {
        res.status(500).json({
          ...result,
          success: false,
          isValidation: true,
          err: [{ message: "ایمیل از قبل وارد شده " }],
        });
      }
      res.status(500).json({ success: false });
    }
  }
}
