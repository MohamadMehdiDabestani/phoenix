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
import { BlogCard, Faq, Nav, Plane } from "@/components";
import CopyrightIcon from "@mui/icons-material/Copyright";
import TelegramIcon from "@mui/icons-material/Telegram";
import { InfoSection } from "@/components";
import { ImageSection } from "@/components";
import { createClient } from "contentful";
import { blue } from "@mui/material/colors";
const faqItems = [
  {
    title: "وظیفه ی این ابزار چیه؟",
    description:
      "این ابزار جز فیلتر کردن بازار بر اساس استراتژی شما رو نداره . فایده اش اینه که بازار به این بزرگی رو تبدیل به چند ارز محدود بکنه تا شما تمرکز خودتون رو روی این چند ارز بکنید در نتیجه گرفتن سود از بازار راحت و بیشتر میشود",
  },
  {
    title: "چه قدر به ما سود میده؟",
    description:
      "این سوال رو کسایی میپرسن که با این سامانه کار نکرده باشن . این ابزار نه به شما سود نه ضرر بلکه فقط وظیفه داره بازار رو بر اساس استراتژی شما فیلتر کنه و بازار به این بزرگی رو تبدیل کنه به چند ارز انگشت شمار و تصمیم نهایی خرید یا فروش رو خودتون بگیرین",
  },
  {
    title: "چرا نباید با آی پی ایرانی وارد شویم؟",
    description:
      "چون که سرور های ما نسبت به آی پی ایرانی حساس هستن اما نسبت به تغییر آی پی یک کاربر حساس نیست و در ضمن چون که سرور های ما با صرافی کار میکنند پس آی پی شما به صرافی ارسال نمیشه و صرفا آی پی سرور های ما در صرافی ثبت میشود",
  },
  {
    title: "چرا استفاده ی از سایت رایگان است؟",
    description:
      "بخش هایی از سایت فعلا در دست ساخت و توسعه می باشد به همین دلیل رایگان است(البته یکم هم بازار یابی 🙂) اما بخش تحلیل کننده ی بازار تکمیل شده و قابل استفاده هست",
  },
  {
    title: "پیش نیاز های استفاده از این سامانه چیه؟",
    description:
      "اول از همه شما باید خودتان هم توان تحلیل داشته باشید چون که به هر حال تصمیم نهایی را خودتان میگیرید بعد توانایی استفاده از این سامانه را دارید",
  },
  {
    title: "از چه صرافی هایی می توانم استفاده کنم؟",
    description:
      "ما تقریبا تمامی صرافی های مطرح دنیا را پشتیبانی میکنیم . نظیر بایننس , کوکوین , اف تی ایکس , کوین بیس , کراکن , هوبی , بیت فینکس و کوینکس به همراه کلی صرافی دیگر",
  },
];
const Home = ({ list }) => {
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const matchesXS = useMediaQuery((theme) => theme.breakpoints.only("xs"));

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
                    <Link href="/panel/getstart">
                      <Button variant="contained">شروع به کار</Button>
                    </Link>
                    <Button
                      variant="outlined"
                      sx={{
                        marginLeft: "20px",
                        mt: matchesXS ? "15px" : "0",
                      }}
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
                <Plane />
                <Faq items={faqItems} />
                <InfoSection
                  gridId="strat"
                  text="شما با چند کلیک ساده میتوانید حساب کاربری ایجاد کرده و شروع به
              تحلیل و ترید کنید"
                  title="شروع به کار در کریپتو ققنوس کنید"
                >
                  <Link href="/panel/getstart">
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
                    <Link href="/panel/getstart">
                      <Button variant="contained">شروع به کار</Button>
                    </Link>
                    <Button
                      variant="outlined"
                      sx={{
                        marginLeft: "20px",
                        mt: matchesXS ? "15px" : "0",
                      }}
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
                <Plane />
                <Faq items={faqItems} />
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
                  <Link href="/panel/getstart">
                    <Button variant="contained" sx={{ marginTop: "20px" }}>
                      شروع به کار
                    </Button>
                  </Link>
                </InfoSection>
              </Fragment>
            )}
          </Grid>
          <Typography sx={{ textAlign: "center" }} variant="h4" id="blog">
            آخرین پست های بلاگ
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              margin: "25px 0",
              "& a": {
                color: blue["A400"],
              },
            }}
            variant="body1"
          >
            <Link href="/panel/blog">
              <a>بلاگ</a>
            </Link>{" "}
            ما را دنبال کنید تا دانش و آگاهی خود را نسبت به بازار افزاریش دهید
          </Typography>
          <Grid container spacing={4} sx={{ padding: "15px 0" }}>
            {list.map((el, idx) => (
              <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={idx}>
                <BlogCard post={el.fields} />
              </Grid>
            ))}
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
export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFULL_SPACEID,
    accessToken: process.env.CONTENTFULL_ACCESSKEY,
  });
  const res = await client.getEntries({
    content_type: "cryptoTool",
    select:
      "fields.title,fields.image,fields.altImage,fields.objectFit,fields.shortText,fields.slug",
    order: "-sys.createdAt",
    limit: 3,
  });
  return {
    props: {
      list: res.items,
    },
    revalidate: 1,
  };
}
export default Home;
