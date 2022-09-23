import { FilterComponent } from "@/components";
import { getCookie } from "cookies-next";
import Head from "next/head";
import ccxt from "ccxt";
import { Fragment, useEffect } from "react";
const Filter = ({ apiUrl }) => {
  useEffect(() => {
    console.log("bigone", new ccxt.bigone().has);
  }, []);
  return (
    <Fragment>
      <Head>
        <title>کریپتو ققنوس | فیلتر بازار</title>
        <meta
          name="description"
          content="ربات معامله گر و سود آور قدرتمند ایرانی در بازار جهانی رمزارز ها"
        />
      </Head>
      <FilterComponent apiUrl={apiUrl} />
    </Fragment>
  );
};

export async function getServerSideProps({ req, res }) {
  const exchangeClient = getCookie("exchange", { req, res });
  if (!exchangeClient) {
    return {
      redirect: {
        destination: "/panel/profile/edite?notif=true",
        permanent: false,
      },
    };
  }
  const ex = new ccxt[exchangeClient]();

  if (!ex.has.fetchOHLCV) {
    return {
      redirect: {
        destination: "/panel/profile/edite?ex=true",
        permanent: false,
      },
    };
  }
  return {
    props: {
      apiUrl: process.env.analyzer,
    },
  };
}
export default Filter;
