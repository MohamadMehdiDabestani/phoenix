import Validator from "fastest-validator";
export const validation = (schema, body) => {
  const v = new Validator();
  const check = v.compile(schema);
  const items = {};
  Object.keys(body).map((e) => {
    items[e] = body[e];
  });
  const validation = check(items);
  console.log("body" , body)

  if (typeof validation === "object")
    return {
      err: validation,
      success: false,
      status: 500,
      isValidation: true,
      data: {},
    };
  return true;
};
