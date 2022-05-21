// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = "test";
import TelegramBot from "node-telegram-bot-api";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    try {
      const body = req.body;
      const data = JSON.parse(body);
      const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
      let text = `تحلیل تاریخ : ${data.time.replace("T", " ")}
      `;
      if (data.signals.filter((s) => s.long).length > 0) {
        const longs = data.signals
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
      if (data.signals.filter((s) => s.short).length > 0) {
        const shorts = data.signals
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
      res.status(200).json({ success: true });
    } catch(err){
        console.log(err);
      res.status(500).json({ success: false });
    }
  }
}
