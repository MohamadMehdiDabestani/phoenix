import { ListCoins } from "@/components";
import { setCoins } from "@/redux/action/panel/Actions";
import ccxt from "ccxt";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import Router from "next/router";
import { toggleSnackBar } from "@/redux/action/Actions";

const Panel = ({ apiUrl, coins, nexUrl, error }) => {
  const dispatch = useDispatch();
  if (error) {
    dispatch(
      toggleSnackBar({
        message: "ابتدا یک صرافی انتخاب کنید",
        variant: "standard",
        severity: "error",
        show: true,
      })
    );
    Router.push("/profile/edite");
  }
  dispatch(setCoins(coins));
  return <ListCoins apiUrl={apiUrl} nexUrl={nexUrl} />;
};

export async function getServerSideProps({ req, res }) {
  try {
    const exchangeClient = getCookie("exchange", { req, res });
    if (!exchangeClient) {
      return {
        redirect: {
          destination: "/profile/edite?notif=true",
          permanent: false,
        },
      };
    }
    const usdt = /^\w+\/USDT/;
    const down = /^\w+DOWN+\/USDT/;
    const up = /^\w+UP+\/USDT/;
    const bear = /^\w+BEAR+\/USDT/;
    const bull = /^\w+BULL+\/USDT/;
    const exchange = new ccxt[exchangeClient]();
    const data = await exchange.loadMarkets();
    const coins = Object.keys(data).filter((e) => {
      if (
        usdt.test(e) &&
        !down.test(e) &&
        !up.test(e) &&
        !bear.test(e) &&
        !bull.test(e)
      )
        return e;
    });
    if (exchangeClient == "bybit") {
      coins.map((c) => `${c}:USDT`);
    }
    return {
      props: {
        apiUrl: process.env.analyzer,
        nexUrl: process.env.NEXT_JS_URI_API,
        coins,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { error: true },
    };
  }
}
export default Panel;
