import ccxt from "ccxt";
import { prisma } from "@/lib";
import { getCookie } from "cookies-next";
import Validator from "fastest-validator";
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
      const schema = {
        bot: {
          type: "object",
          props: {
            chartType: { type: "string" },
            checkBtc: { type: "boolean" },
            market: { type: "string" },
            // balcList: { type: "array", items: "string" },
            orderType: { type: "string" },
            current: { type: "boolean" },
            strategy: {
              type: "object",
              props: {
                displayName: { type: "string" },
                id: { type: "number" },
                name: { type: "string" },
                parameters: { type: "array", items: "object" },
              },
            },
            timeFrame: { type: "string" },
          },
        },
      };
      const check = v.compile(schema);
      const validation = check({
        bot: body.bot,
      });
      if (typeof validation === "object") {
        result.err = validation;
        result.success = false;
        result.status = 200;
        result.isValidation = true;
      } else {
        const exchangeClient = getCookie("exchange", { req, res });
        const exchange = new ccxt[exchangeClient]();
        console.log(exchange);
        // hasCreateLimitOrder: true,
        // hasCreateMarketOrder: true,
        // hasCreateOrder: true,
        if (exchange[`has${body.bot.market}`]) {
          await prisma.user.update({
            where: {
              loginKey: getCookie("authentication_scanner", { req, res }),
            },
            data: {
              botStrategy: body.bot,
            },
          });
        } else {
          result.isValidation = true;
          result.err = [
            {
              message: `صرافی انتخابی شما بازار ${body.bot.market} را پشتیبانی نمیکند`,
            },
          ];
          result.success = false;
        }
      }
      res.status(result.status).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
}
