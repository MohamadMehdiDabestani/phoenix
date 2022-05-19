// import user from "../../../models/user";
// import dbConnection from "../../../services/dbConnection";

// dbConnection();
export default async function handler(req, res) {
  res.status(200).json({ success: req.query.Loginkey });
  //   const { method } = req;
  //   const { ClientId } = req.query;
  //   switch (method) {
  //     case "PUT":
  //       try {
  //         const strategy = req.body
  //         if(!strategy) throw "Invalid data"
  //         await user.updateOne({_id = ClientId},{strategy});
  //         res.status(200).json({ success: true });
  //       } catch (err) {
  //         console.log(err);
  //         res.status(500).json({ success: false, err });
  //       }
  //     case "DELETE":
  //       try {
  //         await user.deleteOne({_id : ClientId});
  //         res.status(200).json({ success: true });
  //       } catch (err) {
  //         console.log(err);
  //         res.status(500).json({ success: false, err });
  //       }
  //   }
}
