import { checkCookies } from "cookies-next";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import { Alert, Button, Grid, Typography } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PasswordIcon from "@mui/icons-material/Password";
// import GoogleIcon from "@mui/icons-material/Google";
import * as yup from "yup";
import Link from "next/link";
import { HomeIconTopLeft, InputForm, Loading } from "@/components";
import { Box } from "@mui/system";
import { useApi } from "@/hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleLoading,
  toggleSnackBar,
  withoutLayout,
} from "@/redux/action/Actions";
import Head from "next/head";

const items = [
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
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { show } = useSelector((state) => state.loading);
  useEffect(() => {
    dispatch(withoutLayout(true));
    if (router.query.notif) {
      dispatch(
        toggleSnackBar({
          message: "وارد حسابتان شوید",
          show: true,
          severity: "error",
        })
      );
    }
    return function cleanUp() {
      dispatch(withoutLayout(false));
    };
  }, []);
  const { postHandeled } = useApi({ baseUrl: process.env.NEXT_JS_URI_API });
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
    onSubmit: (values) => {
      dispatch(toggleLoading({ show: true, isGlobal: true }));

      postHandeled(
        "/api/user/login",
        {
          password: values.password,
          email: values.email,
        },
        () => {
          dispatch(
            toggleSnackBar({
              message: "وارد حساب شدید",
              show: true,
            })
          );
          Router.push("/panel/getstart");
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
        <title>کریپتو ققنوس | ورود به سایت کریپتو ققنوس</title>
      </Head>
      {show && <Loading />}
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
        <form onSubmit={formik.handleSubmit}>
          <HomeIconTopLeft right />
          <Typography
            sx={(theme) => ({
              color: theme.palette.text.primary,
              textAlign: "center",
              marginBottom: "40px",
            })}
            component="h1"
            variant="h4"
          >
            وارد حساب شوید
          </Typography>
          <Alert
            severity="info"
            sx={{
              marginBottom: "30px",
              a: { color: "rgb(30, 58, 102)", fontWeight: "bold" },
            }}
          >
            اگر حساب کاربری ندارید ابتدا باید در سایت{" "}
            <Link href="/register">ثبت نام</Link> کنید
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
          <Box
            sx={{
              display: "flex",
              "& hr": {
                mx: 0.5,
              },
              alignItems: "center",
              justifyContent: "space-around",
              a: {
                width: "50%",
                textDecoration: "none",
              },
            }}
          >
            <Button sx={{ width: "100%" }} variant="contained" type="submit">
              ورود
            </Button>
            {/* <Divider orientation="vertical" variant="middle" flexItem />
            <Link href="/forgotpassword">
              <Button
                sx={{ width: "100%" }}
                color="warning"
                variant="contained"
              >
                فراموشی رمز عبور
              </Button>
            </Link> */}
          </Box>
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
        <Image layout="fill" className="img" src="/image/Lgoin.svg" alt="" />
      </Grid>
    </Grid>
  );
};
export async function getServerSideProps({ req, res }) {
  const cookie = checkCookies("authentication_scanner", { req, res });
  if (cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/panel",
      },
    };
  }
  return {
    props: {},
  };
}
export default Login;
