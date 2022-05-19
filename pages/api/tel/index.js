// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = "test";

import TelegramBot from "node-telegram-bot-api";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    try {
      const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
      const m = new Date();
      const dateString =
        m.getUTCFullYear() +
        "/" +
        (m.getUTCMonth() + 1) +
        "/" +
        m.getUTCDate() +
        " " +
        m.getUTCHours() +
        ":" +
        m.getUTCMinutes() +
        ":" +
        m.getUTCSeconds();
      await bot.sendMessage(808254824, dateString);
      res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
}
