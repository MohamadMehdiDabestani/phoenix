import ccxt from "ccxt";
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
        exchange: {
          type: "string",
          messages: {
            string: "صرافی ای را انتخاب کنید",
          },
        },
      };
      const check = v.compile(schema);
      const validation = check({
        exchange: body.exchange,
      });
      if (typeof validation === "object") {
        result.err = validation;
        result.success = false;
        result.status = 500;
        result.isValidation = true;
      } else {
        const exchange = new ccxt[body.exchange]({
          ...body.auth,
        });
        console.log(await exchange.fetchBalance());
      }
      res.status(result.status).json(result);
    } catch (err) {
      if (err.message === "Access ID Not Exist") {
        res.status(500).json({
          success: false,
          status: 500,
          isValidation: true,
          err: [{ message: "مشکلی در احراز هویت وجود دارد" }],
        });
      } else {
        res.status(500).json({ success: false });
      }
    }
  }
}
// access id : 2357DD40FBA94E5EAC3629F704F5CF81
// secret : BDFB2E6247EDC2E70CFA9AA537099ED9A545B88E277517BC
