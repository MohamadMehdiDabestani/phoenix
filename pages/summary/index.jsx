import ConstructionIcon from "@mui/icons-material/Construction";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import AddTaskIcon from "@mui/icons-material/AddTask";
import HelpIcon from "@mui/icons-material/Help";
import DnsIcon from "@mui/icons-material/Dns";
import { Alert, Paper, Typography } from "@mui/material";
const Summary = () => {
  return (
    <Paper sx={{ padding: "20px" }}>
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
        icon={<ConstructionIcon fontSize="inherit" />}
        severity="info"
      >
        قسمت بلاگ سایت در دست توسعه می باشد
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
      <Alert
        sx={{ margin: "15px 0" }}
        icon={<ManageAccountsIcon fontSize="inherit" />}
        severity="info"
      >
        اهراز هویت سایت در دست توسعه می باشد و تا تکمیل پروسه ی توسعه استفاده ی
        از سایت بلامانع میباشد
      </Alert>
      <Alert
        sx={{ margin: "15px 0" }}
        icon={<AddTaskIcon fontSize="inherit" />}
        severity="info"
      >
        بخش های تکمیل شده ی سایت تست شده و قابل استفاده می باشند . بخش های تکمیل
        شده : افزودن استراتژی , تحلیل بازار , انتخاب صرافی , فیلتر بازار
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
        شوید
        برای شروع می توانید از قسمت اندیکاتور مکدی را انتخاب کنید . از قسمت تایم
        فریم نیز میتوانید تایم فریم مورد نظر خود را انتخاب کنید . بر روی ذخیره
        کلیک کنید . اکنون میتوانید خلاصه ای از استراتژی ساخته شده ی فعلی را
        بررسی کنید . سپس در صورت نیاز میتوانید اندیکاتور جدیدی برای استراتژی خود
        تعریف کنید . در صورت تکمیل شدن استراتژی شما می بایس بر روی ارسال کلیک
        کنید .
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

export default Summary;
