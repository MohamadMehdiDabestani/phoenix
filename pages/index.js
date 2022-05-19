// import ccxt from "ccxt";
import { Fragment, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { withoutLayout } from "@/redux/action/Actions";
import { blueGrey } from "@mui/material/colors";

import Link from "next/link";
import { HomeTable, Nav } from "@/components";
import CopyrightIcon from "@mui/icons-material/Copyright";
import TelegramIcon from "@mui/icons-material/Telegram";
import { InfoSection } from "@/components";
import { ImageSection } from "@/components";
const Home = ({ data }) => {
  console.log(data);
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const handleClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("to");
    const location = document.querySelector(target).offsetTop;

    window.scrollTo({
      left: 0,
      top: location - 64,
    });
  };
  useEffect(() => {
    dispatch(withoutLayout(true));
    return function cleanUp() {
      dispatch(withoutLayout(false));
    };
  }, []);
  return (
    <Fragment>
      <Head>
        <title>ابزار تحلیل گر بازار</title>
        <meta name="description" content="an crypto currency scanner" />
      </Head>
      <Nav />
      <Box sx={{ backgroundColor: blueGrey[50] }}>
        <Container>
          <Grid container>
            {matches ? (
              <Fragment>
                <InfoSection
                  gridId="intro"
                  text="پشتیبانی از اکثر صرافی های جهان و دارا بودن تعداد قابل توجهی
                  از اندیکاتور ها و استراتژی"
                  title="کریپتو ققنوس سامانه جامع تحلیل گر بازار کریپتوکارنسی"
                >
                  <Box
                    sx={{
                      marginTop: "20px",
                    }}
                  >
                    <Link href="/summary">
                      <Button variant="contained">شروع به کار</Button>
                    </Link>
                    <Button
                      variant="outlined"
                      sx={{ marginLeft: "20px" }}
                      onClick={handleClick}
                      to="#planes"
                    >
                      مشاهده ی پلن ها
                    </Button>
                  </Box>
                </InfoSection>
                <ImageSection
                  image="/image/undraw_financial_data_es63.svg"
                  altImage="cryptoPhoenix"
                />
                <ImageSection
                  image="/image/undraw_real_time_analytics_re_yliv.svg"
                  altImage="cryptoPhoenixIsRealtime"
                />
                <InfoSection
                  text="تحلیل تمامی بازار در کمتر از چند ساعت با استراتژی شما"
                  title="تحلیل لحظه ای بازار با سامانه ی کریپتو ققنوس"
                />
                <InfoSection
                  text="سامانه ای مقرون به صرفه و کار آمد"
                  title="مشتری مداری در سامانه ی کریپتو ققنوس"
                />
                <ImageSection
                  image="/image/undraw_discount_d-4-bd.svg"
                  altImage=""
                />
                <ImageSection
                  image="/image/undraw_investment_data_re_sh9x.svg"
                  altImage="crypto phoenix is a trader bot"
                />
                <InfoSection
                  text="با این ربات واقعا در خواب کسب درآمد کنید"
                  title="ربات تریدر سامانه ی کریپتو ققنوس"
                />
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} id="planes">
                  <Typography sx={{ textAlign: "center" }} variant="h4">
                    پلن ها
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center", marginTop: "25px" }}
                    variant="body1"
                  >
                    امیدواریم با استفاده از استراتژی مناسب و سامانه ی کریپتو
                    ققنوس در این بازار بزرگ جهانی موفق شوید
                  </Typography>
                </Grid>
                <HomeTable />

                <InfoSection
                  gridId="strat"
                  text="شما با چند کلیک ساده میتوانید حساب کاربری ایجاد کرده و شروع به
              تحلیل و ترید کنید"
                  title="شروع به کار در کریپتو ققنوس کنید"
                >
                  <Link href="/summary">
                    <Button variant="contained" sx={{ marginTop: "20px" }}>
                      شروع به کار
                    </Button>
                  </Link>
                </InfoSection>
                <ImageSection
                  image="/image/undraw_maker_launch_re_rq81.svg"
                  altImage="get start in crypto phoenix"
                />
              </Fragment>
            ) : (
              <Fragment>
                <ImageSection
                  gridId="intro"
                  image="/image/undraw_financial_data_es63.svg"
                  altImage="cryptoPhoenix"
                />
                <InfoSection
                  text="پشتیبانی از اکثر صرافی های جهان و دارا بودن تعداد قابل توجهی
                  از اندیکاتور ها و استراتژی"
                  title="کریپتو ققنوس سامانه جامع تحلیل گر بازار کریپتوکارنسی"
                >
                  <Box sx={{ marginTop: "20px" }}>
                    <Link href="/panel">
                      <Button variant="contained">شروع به کار</Button>
                    </Link>
                    <Button
                      variant="outlined"
                      sx={{ marginLeft: "20px" }}
                      onClick={handleClick}
                      to="#planes"
                    >
                      مشاهده ی پلن ها
                    </Button>
                  </Box>
                </InfoSection>
                <ImageSection
                  image="/image/undraw_real_time_analytics_re_yliv.svg"
                  altImage="cryptoPhoenixIsRealtime"
                />
                <InfoSection
                  text="تحلیل تمامی بازار در کمتر از چند ساعت با استراتژی شما"
                  title="تحلیل لحظه ای بازار با سامانه ی کریپتو ققنوس"
                />
                <ImageSection
                  image="/image/undraw_discount_d-4-bd.svg"
                  altImage=""
                />
                <InfoSection
                  text="سامانه ای مقرون به صرفه و کار آمد"
                  title="مشتری مداری در سامانه ی کریپتو ققنوس"
                />
                <ImageSection
                  image="/image/undraw_investment_data_re_sh9x.svg"
                  altImage="crypto phoenix is a trader bot"
                />
                <InfoSection
                  text="با این ربات واقعا در خواب کسب درآمد کنید"
                  title="ربات تریدر سامانه ی کریپتو ققنوس"
                />
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} id="planes">
                  <Typography sx={{ textAlign: "center" }} variant="h4">
                    پلن ها
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center", marginTop: "25px" }}
                    variant="body1"
                  >
                    امیدواریم با استفاده از استراتژی مناسب و سامانه ی کریپتو
                    ققنوس در این بازار بزرگ جهانی موفق شوید
                  </Typography>
                </Grid>
                <HomeTable />

                <ImageSection
                  image="/image/undraw_maker_launch_re_rq81.svg"
                  altImage="get start in crypto phoenix"
                />
                <InfoSection
                  gridId="strat"
                  text="شما با چند کلیک ساده میتوانید حساب کاربری ایجاد کرده و شروع به
              تحلیل و ترید کنید"
                  title="شروع به کار در کریپتو ققنوس کنید"
                >
                  <Link href="/summary">
                    <Button variant="contained" sx={{ marginTop: "20px" }}>
                      شروع به کار
                    </Button>
                  </Link>
                </InfoSection>
              </Fragment>
            )}
          </Grid>
        </Container>
      </Box>
      <Paper
        elevation={16}
        sx={{
          borderRadius: "0",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption" sx={{ display: "flex" }}>
          <CopyrightIcon fontSize="small" sx={{ marginRight: "5px" }} />
          تمامی حقوق سایت محفوظ میباشد و پیگرد قانونی دارد
        </Typography>
        <Typography variant="caption" sx={{ display: "flex" }}>
          <TelegramIcon fontSize="small" sx={{ marginRight: "5px" }} />
          تلگرام توسعه دهنده : @MohammadMehdiDabestani
        </Typography>
      </Paper>
    </Fragment>
  );
};
export function getStaticProps() {
  return {
    props: {
      data: process.env.NEXT_JS_URI_API,
    },
  };
}
export default Home;
