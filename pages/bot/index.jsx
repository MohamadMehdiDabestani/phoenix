import { BotComponent } from "@/components";
import ccxt from "ccxt";
import { Paper } from "@mui/material";
import { getCookie } from "cookies-next";
import Head from "next/head";

const Bot = (props) => {
  return (
    <Paper sx={{ padding: "20px" }}>
      <Head>
        <title>کریپتو ققنوس | ربات معامله گر کریپتو ققنوس</title>
        <meta name="description" content="ربات معامله گر و سود آور قدرتمند ایرانی در بازار جهانی رمزارز ها" />
      </Head>
      <BotComponent timeframes={JSON.parse(props.timeFrames)} url={props.url} />
    </Paper>
  );
};
export async function getServerSideProps({ res, req }) {
  const exchangeClient = getCookie("exchange", { req, res });
  if (!exchangeClient) {
    return {
      redirect: {
        destination: "/profile/edite?notif=true",
        permanent: false,
      },
    };
  }
  const exchange = new ccxt[exchangeClient]();
  const times = exchange.timeframes;
  return {
    props: {
      timeFrames: JSON.stringify(times),
      url: process.env.NEXT_JS_URI_API,
    },
  };
}
export default Bot;
