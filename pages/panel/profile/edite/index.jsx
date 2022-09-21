import { useEffect } from "react";
import { EditeProfileDialogBox, Loading } from "@/components";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { InputForm } from "@/components";
import ccxt from "ccxt";
import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialog, toggleLoading, toggleSnackBar } from "@/redux/action/Actions";
import { useRouter } from "next/router";
import axios from "axios";
import { useApi } from "@/hooks/useApi";
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
];
const Edite = ({ user, nexUrl, list }) => {
  const { postHandeled } = useApi({ baseUrl: nexUrl });
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = JSON.parse(user);
  useEffect(() => {
    if (router.query.notif) {
      dispatch(
        toggleSnackBar({
          message: "ابتدا یک صرافی انتخاب کنید",
          show: true,
          severity: "error",
        })
      );
    }
    if (router.query.ex) {
      dispatch(
        toggleSnackBar({
          message: "لطفا یک صرافی دیگر انتخاب کنید",
          show: true,
          severity: "error",
        })
      );
    }
  }, []);
  const open = useSelector((state) => state.dialog);
  const validationHandler = yup.object({
    userName: yup.string().required("نام کاربری را وارد کنید"),
    email: yup
      .string()
      .email("یک ایمیل معتبر وارد کنید")
      .required("یک ایمیل وارد کنید"),
    exchange: yup.string().required("یک صرافی انتخاب کنید"),
  });
  const formik = useFormik({
    initialValues: {
      email: userData.email,
      userName: userData.userName,
      exchange: getCookie("exchange"),
    },
    validationSchema: validationHandler,
    onSubmit: (values) => {
      const dateTime = new Date();
      dateTime.setFullYear(dateTime.getFullYear() + 10);
      setCookies("exchange", values.exchange, { expires: dateTime });
      dispatch(toggleLoading({ show: true, isGlobal: true }));
      postHandeled(
        "/user/edite",
        values,
        () => {
          dispatch(
            toggleSnackBar({
              message: "حساب کاربری شما به روز رسانی شد",
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
  const handleChangeExchange = (e) => {
    const dateTime = new Date();
    dateTime.setFullYear(dateTime.getFullYear() + 10);
    setCookies("exchange", e.target.value, { expires: dateTime });
  };
  // let coinbasepro = new ccxt[formik.values.exchange]();
  return (
    <Paper sx={{ padding: "20px" }}>
      <Head>
        <title>کریپتو ققنوس | ویرایش حساب کاربری</title>
      </Head>
      <Loading />
      {formik.values.exchange && open ? (
        <EditeProfileDialogBox url={nexUrl} />
      ) : (
        ""
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>ویرایش حساب کاربری</Typography>
        {formik.values.exchange && (
          <Button
            variant="contained"
            onClick={() => dispatch(toggleDialog(true))}
          >
            احراز هویت صرافی
          </Button>
        )}
      </Box>
      <Box sx={{ margin: "35px 0" }} as="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          {items.map((el, idx) => (
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} key={idx}>
              <InputForm
                {...el}
                sx={{ width: "100%" }}
                value={formik.values[el.id]}
                error={formik.errors[el.id]}
                touched={formik.touched[el.id]}
                change={formik.handleChange}
              />
            </Grid>
          ))}
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <FormControl
              fullWidth
              variant="filled"
              error={formik.touched.exchange && formik.errors.exchange}
            >
              <InputLabel>صرافی</InputLabel>
              <Select
                value={formik.values.exchange}
                defaultValue={formik.values.exchange}
                error={formik.touched.exchange && formik.errors.exchange}
                id="exchange"
                name="exchange"
                label="صرافی"
                onChange={(e) => {
                  formik.handleChange(e), handleChangeExchange(e);
                }}
              >
                {list.map((e, idx) => (
                  <MenuItem key={idx} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.touched.exchange && formik.errors.exchange}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          sx={{ marginTop: "15px" }}
          variant="contained"
          type="submit"
          color="warning"
        >
          ویرایش
        </Button>
      </Box>
    </Paper>
  );
};
export async function getServerSideProps({ req, res }) {
  try {
    const cookie = getCookie("authentication_scanner", { req, res });
    if (!cookie) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
    const { data } = await axios.post(`${process.env.NEXT_JS_URI_API}/user`, {
      cookieValue: cookie,
    });
    if (data.data) {
      return {
        props: {
          user: JSON.stringify(data.data),
          nexUrl: process.env.NEXT_JS_URI_API,
          list: ccxt.exchanges,
        },
      };
    } else {
      removeCookies("authentication_scanner", { req, res });
      return {
        redirect: {
          permanent: false,
          destination: "/login?notif=true",
        },
      };
    }
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: "/badRequest",
      },
    };
  }
}

export default Edite;
