import Validator from "fastest-validator";
import { prisma } from "@/lib";
import { getCookie } from "cookies-next";
const v = new Validator();

export default async function handler(req, res) {
  const { method } = req;
  let result = {
    status: 200,
    success: true,
    data: {},
    err: {},
    isValidation: false,
  };
  switch (method) {
    case "POST":
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
        };
        const check = v.compile(schema);
        const validation = check({
          email: body.email,
          userName: body.userName,
        });
        if (typeof validation === "object") {
          result.err = validation;
          result.success = false;
          result.status = 500;
          result.isValidation = true;
        } else {
          await prisma.user.update({
            where: {
              loginKey: getCookie("authentication_scanner", { req, res }),
            },
            data: {
              userName: body.userName,
              email: body.email,
            },
          });
        }
        res.status(result.status).json(result);
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err });
      }
  }
}
