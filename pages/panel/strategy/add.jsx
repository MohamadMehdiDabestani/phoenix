import { AddStrategyComponent } from "@/components";
import { getCookie } from "cookies-next";
import ccxt from "ccxt";
import { Fragment } from "react";
import Head from "next/head";
const Add = (props) => {
  return (
    <Fragment>
      <Head>
        <title>کریپتو ققنوس | تعریف استراتژی تحلیل گر</title>
      </Head>
      <AddStrategyComponent timeFrames={props.timeFrames} />
    </Fragment>
  );
};
export async function getServerSideProps({ res, req }) {
  const exchangeClient = getCookie("exchange", { req, res });
  if (!exchangeClient) {
    return {
      redirect: {
        destination: "/panel/profile/edite?notif=true",
        permanent: false,
      },
    };
  }
  const exchange = new ccxt[exchangeClient]();
  const times = JSON.stringify(exchange.timeframes);
  return { props: { timeFrames: times } };
}
export default Add;
