import Validator from "fastest-validator";
import { prisma } from "@/lib";
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
          cookieValue: {
            type: "string",
            max: 36,
          },
        };
        const check = v.compile(schema);
        const validation = check({
          cookieValue: body.cookieValue,
        });
        if (typeof validation === "object") {
          result.err = validation;
          result.success = false;
          result.status = 500;
          result.isValidation = true;
        } else {
          const user = await prisma.user.findUnique({
            where: {
              loginKey: body.cookieValue,
            },
            select: {
              userName: true,
              email: true,  
            },
          });
          result.data = user;
        }
        res.status(result.status).json(result);
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err });
      }
  }
}
