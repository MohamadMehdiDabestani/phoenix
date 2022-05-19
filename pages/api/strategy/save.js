import { PrismaClient } from "@prisma/client";
import Validator from "fastest-validator";
import { getCookie } from "cookies-next";

const prisma = new PrismaClient();
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
  if (method === "POST") {
    try {
      const body = req.body;
      console.log(body.strategy.indicators);
      const schema = {
        indicators: {
          type: "array",
          items: {
            type: "object",
            props: {
              completed: { type: "boolean" },
              displayName: { type: "string" },
              id: { type: "number" },
              isBreake: { type: "boolean" },
              isCross: { type: "boolean" },
              isEnableBreake: { type: "boolean" },
              isEnableCross: { type: "boolean" },
              name: { type: "string" },
              parameters: { type: "array", items: "object" },
            },
          },
        },
        lowMarketCap: { type: "number" },
        lowPrice: { type: "number" },
        timeFrame: { type: "array", items: { type: "string" } },
      };
      const check = v.compile(schema);
      const validation = check({
        lowMarketCap: body.strategy.lowMarketCap,
        lowPrice: body.strategy.lowPrice,
        timeFrame: body.strategy.timeFrame,
        indicators: body.strategy.indicators,
      });

      if (typeof validation === "object") {
        result.err = validation;
        result.success = false;
        result.status = 500;
        result.isValidation = true;
      } else {
        console.log("else");
        await prisma.user.update({
          where: {
            email: JSON.parse(getCookie("authentication_scanner", { req, res }))
              .email,
          },
          data: {
            strategy: JSON.stringify(body),
          },
        });
      }
      res.status(result.status).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
}
