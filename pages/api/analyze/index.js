import { prisma } from "@/lib";
// import Validator from "fastest-validator";
import { getCookie } from "cookies-next";

// const v = new Validator();
export default async function handler(req, res) {
  const { method } = req;
  //   let result = {
  // status: 200,
  // success: true,
  // data: {},
  // err: {},
  // isValidation: false,
  //   };
  if (method === "GET") {
    const user = await prisma.user.findFirst({
      where: {
        email: JSON.parse(getCookie("authentication_scanner", { req, res }))
          .email,
      },
    });
    console.log(user);

    // send request to analyzer api

    // return user
  }
}
