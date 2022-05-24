import { FilterComponent } from "@/components";
import { getCookie } from "cookies-next";
import Head from "next/head";
import { Fragment } from "react";
const Filter = ({ apiUrl, nexUrl }) => {
  return (
    <Fragment>
      <Head>
        <title>کریپتو ققنوس | فیلتر بازار</title>
        <meta
          name="description"
          content="ربات معامله گر و سود آور قدرتمند ایرانی در بازار جهانی رمزارز ها"
        />
      </Head>
      <FilterComponent apiUrl={apiUrl} nexUrl={nexUrl} />
    </Fragment>
  );
};

export async function getServerSideProps({ req, res }) {
  const exchangeClient = getCookie("exchange", { req, res });
  if (!exchangeClient) {
    return {
      redirect: {
        destination: "/profile/edite?notif=true",
        permanent: false,
      },
    };
  }
  return {
    props: {
      apiUrl: process.env.analyzer,
      nexUrl: process.env.NEXT_JS_URI_API,
    },
  };
}
export default Filter;
