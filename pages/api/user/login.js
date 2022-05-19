import { v4 as uuidv4 } from "uuid";
import md5 from "md5";
import { PrismaClient } from "@prisma/client";
import Validator from "fastest-validator";
import { setCookies } from "cookies-next";

const prisma = new PrismaClient();
const v = new Validator();
function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}
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
        email: {
          type: "email",
          max: 150,
          messages: {
            email: "ایمیل را صحیح وارد کنید",
            emailMax: "ایمیل نمی تواند بیشتر از 150 کاراکتر باشد",
            emailEmpty: "ایمیل را وارد کنید",
          },
        },
        password: {
          type: "string",
          min: 8,
          messages: {
            stringEmpty: "رمز عبور را وارد کنید",
            string: "رمزعبور را صحیح وارد کنید",
            stringMin: "رمز عبور نمی تواند کمتر از 8 رقم باشد",
          },
        },
      };
      const check = v.compile(schema);
      const validation = check({
        email: body.email,
        password: body.password,
      });
      if (typeof validation === "object") {
        console.log(validation);
        result.err = validation;
        result.success = false;
        result.status = 500;
        result.isValidation = true;
      } else {
        const user = await prisma.user.findFirst({
          where: {
            email: body.email.toLowerCase(),
            password: md5(body.password),
          },
        });
        if (user === null || user.isActive === false) {
          result.success = false;
          result.status = 500;
          result.isValidation = true;
          result.err = [{ message: "کاربری یافت نشد" }];
        } else {
          result.data = user;
          const generatedLoginKey = uuidv4();
          setCookies("authentication_scanner", generatedLoginKey, {
            req,
            res,
            expires: addDays(new Date(), 12),
            secure: true,
            httpOnly: true,
          });
          await prisma.user.update({
            where: {
              email: body.email.toLowerCase(),
            },
            data: {
              lastLogin: Date().toString(),
              loginKey: generatedLoginKey,
            },
          });
        }
      }
      res.status(result.status).json(result);
    } catch (err) {
      res.status(500).json({ success: false });
    }
  }
}
