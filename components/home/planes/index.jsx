import { Alert, Grid } from "@mui/material";
import { Fragment } from "react";
import { Item } from "./item";

const items = [
  {
    title: "رایگان",
    price: 0,
    options: ["تحلیل مارکت با برخی اندیکاتور ها"],
    not: [
      "غیر فعال بودن معاملات",
      "غیر فعال بودن ربات معامله گر",
      "تبدیل شدن به لیدر کپی تریدینگ",
      "محدود بودن کپی تریدینگ به هفته ای 5 ترید",
    ],
    btnType: "register",
    type: "register",
  },
  {
    title: "نقره ای",
    price: 3000000,
    options: [
      "تحلیل مارکت با تمامی اندیکاتور ها",
      "فعال بودن معاملات",
      "تبدیل شدن به لیدر کپی تریدینگ",
    ],
    not: [
      "غیر فعال بودن ربات معامله گر",
      "محدود بودن کپی تریدینگ به هفته ای 30 ترید",
    ],
    btnType: "submit",
    type: "payment",
  },

  {
    title: "طلایی",
    price: 7000000,
    options: [
      "تحلیل مارکت با تمامی اندیکاتور ها",
      "فعال بودن معاملات",
      "تبدیل شدن به لیدر کپی تریدینگ",
      "فعال بودن ربات معامله گر",
      "بدون محدودیت در کپی تریدینگ",
    ],
    not: [],
    btnType: "submit",
    type: "payment",
  },
  {
    title: "ویژه",
    price: "تماس بگیرید",
    options: [
      "تحلیل مارکت با تمامی اندیکاتور ها",
      "فعال بودن معاملات",
      "تبدیل شدن به لیدر کپی تریدینگ",
      "فعال بودن ربات معامله گر",
      "بدون محدودیت در کپی تریدینگ",
      "هوش مصنوعی به خصوص برای پیش بینی و تحلیل مارکت",
    ],
    not: [],
    btnType: "submit",
    type: "contact",
  },
];
export const Plane = () => {
  return (
    <Fragment>
      <Alert
        severity="warning"
        variant="filled"
        sx={{ width: "100%", margin: "20px 0" }}
      >
        تا اطلاعات ثانویه استفاده از سایت کاملا رایگان و بلامانع می باشد .
      </Alert>
      <Grid container spacing={4} justifyContent="center" mb="30px">
        {items.map((e, idx) => (
          <Grid item key={idx} xl={3} lg={3} md={5} sm={5} xs={12}>
            <Item {...e} />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};
