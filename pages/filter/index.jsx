import { FilterComponent } from "@/components";
import { getCookie } from "cookies-next";
const Filter = ({ apiUrl, nexUrl }) => {
  return <FilterComponent apiUrl={apiUrl} nexUrl={nexUrl} />;
};

export async function getServerSideProps({req , res}) {
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
