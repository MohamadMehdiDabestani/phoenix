import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import HelpIcon from "@mui/icons-material/Help";
import DnsIcon from "@mui/icons-material/Dns";
import { Alert, Paper, Typography } from "@mui/material";
import Head from "next/head";
const GetStart = () => {
  return (
    <Paper sx={{ padding: "20px" }}>
      <Head>
        <title>کریپتو ققنوس | شروع کار در کریپتو ققنوس</title>
        <meta name="description" content="ربات معامله گر و سود آور قدرتمند ایرانی در بازار جهانی رمزارز ها" />
      </Head>
      <Typography variant="h5">نکات قابل توجه :</Typography>
      <Alert
        sx={{ margin: "15px 0" }}
        icon={<DnsIcon fontSize="inherit" />}
        severity="info"
      >
        با آی پی غیر ایرانی از سایت استفاده کنید.
      </Alert>
      <Alert
        sx={{ margin: "15px 0" }}
        icon={<CandlestickChartIcon fontSize="inherit" />}
        severity="info"
      >
        شما برای استفاده از سایت می بایس ابتدا صرافی و استراتژی خود در بازار را
        تعریف کنید. برای انتخاب صرافی وارد قسمت حساب کاربری و سپس وارد ویرایش
        شوید و برای استراتژی وارد قسمت بازار و سپس استراتژی شوید
      </Alert>
      <Alert sx={{ margin: "15px 0" }} icon={<HelpIcon fontSize="inherit" />}>
        راهنمای شروع :
        <br />
        در قسمت منو وارد{" "}
        <Typography variant="subtitle1" sx={{ display: "inline" }}>
          حساب کاربری {">"} ویرایش
        </Typography>{" "}
        شوید و صرافی مورد نظر خود را انتخاب کنید.
        <br />
        پس از آن در قسمت منو وارد{" "}
        <Typography variant="subtitle1" sx={{ display: "inline" }}>
          بازار {">"} استراتژی
        </Typography>{" "}
        شوید برای شروع می توانید از قسمت اندیکاتور مکدی را انتخاب کنید . از قسمت
        تایم فریم نیز میتوانید تایم فریم مورد نظر خود را انتخاب کنید . بر روی
        ذخیره کلیک کنید . اکنون میتوانید خلاصه ای از استراتژی ساخته شده ی فعلی
        را بررسی کنید . سپس در صورت نیاز میتوانید اندیکاتور جدیدی برای استراتژی
        خود تعریف کنید . در صورت تکمیل شدن استراتژی شما می بایس بر روی ارسال
        کلیک کنید .
        <br />
        هم اکنون میتوانید وارد قسمت{" "}
        <Typography variant="subtitle1" sx={{ display: "inline" }}>
          بازار {">"} تحلیل ها
        </Typography>{" "}
        شوید و با توجه به استراتژی ساخته شده تمامی ارز هایی که در صرافی انتخابی
        شما موجود هستند را در کمتر از 1 ثانیه (به ازای هر ارز) وضعیت خرید یا
        فروش آنها را بررسی کنید.
      </Alert>
    </Paper>
  );
};

export default GetStart;
