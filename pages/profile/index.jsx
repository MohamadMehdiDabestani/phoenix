import { Profile } from "@/components";
import { useApi } from "@/hooks/useApi";
import { toggleLoading } from "@/redux/action/Actions";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Panel = ({ cookie, url }) => {
  console.log(cookie);
  const dispatch = useDispatch();
  const { getHandeled } = useApi({ baseUrl: url });
  useEffect(() => {
    dispatch(toggleLoading({ show: true, isGlobal: true }));
    getHandeled(
      "/api/user/",
      () => {},
      () => {
        dispatch(toggleLoading({ show: false, isGlobal: false }));
      }
    );
  }, []);
  return <Profile />;
};
export async function getServerSideProps({ req, res }) {
  const cookie = getCookie("authentication_scanner", { req, res });
  if (!cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  return {
    props: { cookie: JSON.stringify(cookie), url: process.env.NEXT_JS_URI_API },
  };
}
export default Panel;
