import { useFormik } from "formik";
import Image from "next/image";
import { Alert, Button, Grid, Typography } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import * as yup from "yup";
import { InputForm } from "../";
import { HomeIconTopLeft } from "../";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withoutLayout } from "../../redux/action/Actions";

const items = [
  {
    label: "ایمیل",
    icon: <AlternateEmailIcon />,
    id: "email",
    type: "text",
  },
];
export const ForgotPassword = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(withoutLayout(true));
    return function cleanUp() {
      dispatch(withoutLayout(false));
    };
  }, []);
  const validationHandler = yup.object({
    email: yup
      .string()
      .email("یک ایمیل معتبر وارد کنید")
      .required("یک ایمیل وارد کنید"),
    password: yup
      .string()
      .min(8, "رمز عبور باید بیشتر از 8 رقم باشد")
      .required("رمز عبور را وراد کنید"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationHandler,
    // onSubmit: (values) => {},
  });
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid
        item
        xl={6}
        lg={6}
        md={6}
        sm={6}
        xs={12}
        sx={{
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          "& > form": {
            width: "80%",
          },
        }}
      >
        <HomeIconTopLeft right />
        <form onSubmit={formik.handleSubmit}>
          <Typography
            sx={(theme) => ({
              color: theme.palette.text.primary,
              textAlign: "center",
              marginBottom: "40px",
            })}
            component="h1"
            variant="h4"
          >
            فراموشی رمز عبور
          </Typography>
          <Alert
            severity="info"
            sx={{
              marginBottom: "30px",
              a: { color: "rgb(30, 58, 102)", fontWeight: "bold" },
            }}
          >
            از طریق ایمیلی که به شما ارسال می شود می توانید رمز عبور جدیدی
            انتخاب کنید
          </Alert>
          {items.map((el, idx) => (
            <InputForm
              {...el}
              sx={{ width: "100%", marginBottom: "20px" }}
              value={formik.values[el.id]}
              error={formik.errors[el.id]}
              touched={formik.touched[el.id]}
              change={formik.handleChange}
              key={idx}
            />
          ))}

          <Button fullWidth variant="contained" type="submit">
            ارسال ایمیل
          </Button>
        </form>
      </Grid>
      <Grid
        item
        xl={6}
        lg={6}
        md={6}
        sm={6}
        sx={{
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          justifyContent: "center",
          "& > img": { width: "75%" },
        }}
      >
        <Image src="/public/image/ForgotPassword.svg" alt="" />
      </Grid>
    </Grid>
  );
};
