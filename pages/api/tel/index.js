// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = "test";
import ccxt from "ccxt";
import { prisma } from "@/lib";
import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    try {
      // const users = await prisma.user.findMany();
      const users = await prisma.user.findMany({
        where: {
          botStatus: true,
        },
        select: {
          botStrategy: true,
        },
      });
      const usdt = /^\w+\/USDT/;
      const down = /^\w+DOWN+\/USDT/;
      const up = /^\w+UP+\/USDT/;
      const bear = /^\w+BEAR+\/USDT/;
      const bull = /^\w+BULL+\/USDT/;
      const exchange = new ccxt.bybit();
      const data = await exchange.loadMarkets();
      const coins = Object.keys(data).filter((e) => {
        if (
          usdt.test(e) &&
          !down.test(e) &&
          !up.test(e) &&
          !bear.test(e) &&
          !bull.test(e)
        )
          return e;
      });
      users.map(async (u) => {
        console.log(`url sent : ${process.env.analyzer}/openTrade`);
        const result = await axios.post(`${process.env.analyzer}/openTrade`, {
          strategy: u.botStrategy,
          coins,
        });
        console.log("result", result.status);
        console.log("result statusText", result.statusText);
      });
      res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
}
