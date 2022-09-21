import { Fragment } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import axios from "axios";
import { getCookie, removeCookies } from "cookies-next";
import { Loading, Plane } from "@/components";
import Head from "next/head";
import { useSelector } from "react-redux";

const items = [
  {
    title: "خرید پلن طلایی",
    amount: "7,000,000",
    unit: "تومان",
    dateTime: "1400/12/04 12:30:00",
  },
];

const Transaction = () => {
  const { show } = useSelector((state) => state.loading);
  return (
    <Fragment>
      {show && <Loading />}
      <Head>
        <title>کریپتو ققنوس | تراکنش ها</title>
      </Head>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>عنوان</TableCell>
              <TableCell>مقدار</TableCell>
              <TableCell>واحد</TableCell>
              <TableCell>تاریخ ثبت</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((e, idx) => (
              <TableRow key={idx}>
                <TableCell>{e.title}</TableCell>
                <TableCell>{e.amount}</TableCell>
                <TableCell>{e.unit}</TableCell>
                <TableCell>{e.dateTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: "25px" }} pa="20px">
        <Plane />
      </Box>
    </Fragment>
  );
};
export async function getServerSideProps({ req, res }) {
  try {
    const cookie = getCookie("authentication_scanner", { req, res });
    if (!cookie) {
      return {
        redirect: {
          permanent: false,
          destination: "/login?notif=true",
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
          url: process.env.NEXT_JS_URI_API,
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
export default Transaction;
