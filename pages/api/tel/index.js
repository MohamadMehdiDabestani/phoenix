// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = "test";
import ccxt from "ccxt";
import { prisma } from "@/lib";
import axios from "axios";
import TelegramBot from "node-telegram-bot-api";

export default async function handler(req, res) {
  const { method } = req;
  const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
  await bot.sendMessage(808254824, "a cronJob done 1");
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
      console.log(users);
      users.map(async (u) => {
        console.log(`url sent : ${process.env.analyzer}/openTrade`);
        const res = await axios.post(`${process.env.analyzer}/openTrade`, {
          strategy: u.botStrategy,
          coins,
        });
        console.log("result", res.status);
        console.log("result statusText", res.statusText);
      });
      await bot.sendMessage(808254824, "a cronJob done 3");
      res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
}
