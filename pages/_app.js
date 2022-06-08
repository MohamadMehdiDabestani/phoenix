import { DashboardLayout, Notification } from "../components";
import { Provider } from "react-redux";
import { store } from "../redux/";
import { StyleManagment } from "../components";
import { Box } from "@mui/material";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <StyleManagment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
        dir="rtl"
      >
        <Provider store={store}>
          <DashboardLayout>
            <Notification />
            <Component {...pageProps} />
          </DashboardLayout>
        </Provider>
      </Box>
    </StyleManagment>
  );
}
export default MyApp;
