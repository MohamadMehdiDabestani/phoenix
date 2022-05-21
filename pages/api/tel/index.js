// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = "test";

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
      console.log('users' , users);
      console.log(`url sent : ${process.env.analyzer}/openTrade`);
      users.map(async (u) => {
        const result = await axios.post(`${process.env.analyzer}/openTrade`, {
          strategy: u.botStrategy,
        });
        console.log("result" , result.status);
        console.log("result statusText" , result.statusText);
        let text = `تحلیل تاریخ : ${result.data.time.replace("T", " ")}
`;
        if (result.data.signals.filter((s) => s.long).length > 0) {
          const longs = result.data.signals
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
        if (result.data.signals.filter((s) => s.short).length > 0) {
          const shorts = result.data.signals
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
