import { removeCookies } from "cookies-next";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    try {
      removeCookies("authentication_scanner", {
        req,
        res,
      });
      res.status(200).json({
        status: 200,
        success: true,
      });
    } catch {
      res.status(500).json({ success: false });
    }
  }
}
