// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = "test";
import ccxt from "ccxt";
import { prisma } from "@/lib";
import axios from "axios";
import TelegramBot from "node-telegram-bot-api";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    try {
      // const users = await prisma.user.findMany();
      const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
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
      const coins = ['XTZ/USDT' , 'YFI/USDT' , 'ADA/USDT']
      users.map((u) => {
        console.log(`url sent : ${process.env.analyzer}/openTrade`);
        axios
          .post(`${process.env.analyzer}/openTrade`, {
            strategy: u.botStrategy,
            coins,
          })
          .then(async (result) => {
            await bot.sendMessage(808254824, "a cronJob done");
            console.log("result", result.status);
            console.log("result statusText", result.statusText);
          });
      });
      res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
}
