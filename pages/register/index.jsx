import { useFormik } from "formik";
// import Image from "../../public/image/Register.svg";
import Image from "next/image";
import { Alert, Button, Grid, Typography } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
// import GoogleIcon from "@mui/icons-material/Google";
import * as yup from "yup";
import Link from "next/link";
import { HomeIconTopLeft, InputForm, Loading } from "@/components";
import { useApi } from "@/hooks/useApi";
import { useEffect } from "react";
import {
  toggleLoading,
  toggleSnackBar,
  withoutLayout,
} from "@/redux/action/Actions";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
const items = [
  {
    label: "نام کاربری",
    icon: <AccountCircle />,
    id: "userName",
    type: "text",
  },
  {
    label: "ایمیل",
    icon: <AlternateEmailIcon />,
    id: "email",
    type: "text",
  },
  {
    label: "رمز عبور",
    id: "password",
    icon: <PasswordIcon />,
    type: "password",
  },
];
const Register = () => {
  const { postHandeled } = useApi({ baseUrl: process.env.NEXT_JS_URI_API });
  const dispatch = useDispatch();
  const { show } = useSelector((state) => state.loading);
  useEffect(() => {
    dispatch(withoutLayout(true));
    return function cleanUp() {
      dispatch(withoutLayout(false));
    };
  }, []);
  const validationHandler = yup.object({
    userName: yup.string().required("نام کاربری را وارد کنید"),
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
      userName: "",
      password: "",
    },
    validationSchema: validationHandler,
    onSubmit: (values) => {
      dispatch(toggleLoading({ show: true, isGlobal: true }));

      postHandeled(
        "/api/user/register",
        {
          email: values.email,
          password: values.password,
          userName: values.userName,
        },
        () => {
          dispatch(
            toggleSnackBar({
              message:
                "حساب کاربری ایجاد شد . ایمیل باکس خود را چک کرده و حساب کاربری خود را فعال کنید",
              show: true,
            })
          );
        },
        () => {
          dispatch(toggleLoading({ show: false, isGlobal: false }));
        }
      );
    },
  });
  return (
    <Grid container sx={{ height: "100%" }}>
      <Head>
        <title>کریپتو ققنوس | ثبت نام در سایت کریپتو ققنوس</title>
      </Head>
      {show && <Loading />}
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
          "& >span> img": {
            width: "75% !important",
            height: "100% !important",
            position: "unset !important",
          },
          "& >span": {
            position: "unset !important",
            width: "100% !important",
            height: "100% !important",
          },
        }}
      >
        <Image layout="fill" className="img" src="/image/Register.svg" alt="" />
      </Grid>
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
            ثبت نام کنید
          </Typography>
          <Alert
            severity="info"
            sx={{
              marginBottom: "30px",
              a: { color: "rgb(30, 58, 102)", fontWeight: "bold" },
            }}
          >
            اگر حساب کاربری دارید میتوانید <Link href="/login">وارد</Link> حساب
            شوید
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
            ثبت نام
          </Button>
          {/* <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ marginTop: "20px" }}
            endIcon={<GoogleIcon />}
          >
            ورود با گوگل
          </Button> */}
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;
