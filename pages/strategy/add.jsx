import { AddStrategyComponent } from "@/components";
import { getCookie } from "cookies-next";
import ccxt from "ccxt";
const Add = (props) => {
  return <AddStrategyComponent timeFrames={props.timeFrames} />;
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
  const times = JSON.stringify(exchange.timeframes);
  return { props: { timeFrames: times } };
}
export default Add;
