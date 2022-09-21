// import { prisma } from "@/lib";
import { validation } from "@/lib";
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
        amount: {
          type: "number",
          positive: true,
          messages: {
            numberPositive: "مبلغ نباید کمتر از 0 باشد",
            number: "مبلغ را صحیح وارد کنید",
          },
        },
        customField: {
          type: "string",
        },
      };
      const validate = validation(schema, body);

      if (typeof validate !== "boolean") {
        result = validate;
      } else {
        console.log("success", JSON.parse(body.customField).title);
        result.data = body.amount;
      }
      res.status(result.status).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
}
