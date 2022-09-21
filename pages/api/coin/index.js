import ccxt from "ccxt";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    try {
      const body = req.body;
      const exchange = new ccxt[body.exchange]();

      const data = await exchange.fetchOHLCV(
        body.coin,
        body.timeFrame,
        undefined,
        100
      );
      const result = data.map((e) => {
        return { x: e.slice(0, 1)[0], y: e.slice(1, 5) };
      });
      res.status(200).json({ success: true, result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
}
