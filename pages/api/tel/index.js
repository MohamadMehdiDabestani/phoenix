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
      const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
      // const users = await prisma.user.findMany();
      const users = await prisma.user.findMany({
        where: {
          botStatus: true,
        },
        select: {
          botStrategy: true,
        },
      });
      const ex = new ccxt.bybit({ enableRateLimit: true });
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
      console.log("coins", coins);
      users.map(async (u) => {
        console.log(`url sent : ${process.env.analyzer}/openTrade`);
        const analysis = [];
        let time = "";
        coins.map(async (coin) => {
          const result = await axios.post(`${process.env.analyzer}/openTrade`, {
            strategy: u.botStrategy,
            coin,
          });
          analysis.push(result.data.signal);
          time = result.data.time;
          console.log("result", result.status);
          console.log("result statusText", result.statusText);
        });
        let text = `تحلیل تاریخ : ${time.replace("T", " ")}
      `;
        if (analysis.filter((s) => s.long).length > 0) {
          const longs = analysis
            .filter((s) => s.long)
            .map(
              (l) => `ارز : ${l.coin} - نقطه ی ورود : ${l.entry}
      ----------------------------------------------------
      `
            );
          text = `${text} سیگنال های خرید :
      ${longs.join("")}`;
        } else {
          text = `${text}موردی برای خرید وجود ندارد
      `;
        }
        if (analysis.filter((s) => s.short).length > 0) {
          const shorts = analysis
            .filter((s) => s.short)
            .map(
              (l) => `ارز : ${l.coin} - نقطه ی ورود : ${l.entry}
      ----------------------------------------------------
      `
            );
          text = `${text} سیگنال های فروش :
      ${shorts.join("")}`;
        } else {
          text = `${text}موردی برای فروش وجود ندارد
      `;
        }
        await bot.sendMessage(808254824, text);
      });
      res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
}
