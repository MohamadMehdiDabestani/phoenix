// import ccxt from "ccxt";
// import { PrismaClient } from "@prisma/client";
// import Validator from "fastest-validator";
// const prisma = new PrismaClient();
// const v = new Validator();
// export default async function handler(req, res) {
//   const { method } = req;
//   console.log("================================================");
//   let result = {
//     status: 200,
//     success: true,
//     data: {},
//     err: {},
//     isValidation: false,
//   };
//   if (method === "POST") {
//     try {
//       const body = req.body;
//       const schema = {
//         exchange: {
//           type: "string",
//           messages: {
//             string: "صرافی ای را انتخاب کنید",
//           },
//         },
//       };
//       const check = v.compile(schema);
//       const validation = check({
//         exchange: body.exchange,
//       });
//       if (typeof validation === "object") {
//         result.err = validation;
//         result.success = false;
//         result.status = 500;
//         result.isValidation = true;
//       } else {
//         const exchange = new ccxt[body.exchange]({
//           ...body.auth,
//         });
//         console.log({
//           ...body.auth,
//           enableRateLimit: true,
//         });
//         console.log(await exchange.fetchBalance());
//       }
//       res.status(result.status).json(result);
//     } catch (err) {
//       console.log(err);
//       if (err.name === "RequestTimeout") {
//         res.status(500).json({
//           ...result,
//           success: false,
//           isValidation: true,
//           err: [{ message: "مشکلی در احراز هویت وجود دارد" }],
//         });
//       } else {
//         res.status(500).json({ success: false });
//       }
//     }
//   }
// }
