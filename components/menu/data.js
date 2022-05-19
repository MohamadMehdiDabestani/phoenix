import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
const list = [
  {
    id: "1",
    codeName: "",
    routes: "/home,/strategy,/strategy/add,/panel,/filter,/bot",
    title: "بازار",
    icon: <AttachMoneyIcon sx={{ marginRight: "5%" }} />,
    list: [
      {
        href: "/panel",
        activeRoute: "/panel",
        title: "تحلیل ها",
      },
      {
        href: "/filter",
        activeRoute: "/filter",
        title: "فیلتر",
      },
      {
        href: "/bot",
        activeRoute: "/bot",
        title: "ربات",
      },
      {
        href: "/strategy",
        activeRoute: "/strategy,/strategy/add",
        title: "استراتژی",
      },
    ],
  },
  {
    id: "2",
    routes: "/profile,/profile/edite",
    title: "حساب کاربری",
    icon: <AccountCircleIcon sx={{ marginRight: "5%" }} />,
    list: [
      {
        href: "/profile",
        activeRoute: "/profile",
        title: "پروفایل",
      },
      {
        href: "/profile/edite",
        activeRoute: "/profile/edite",
        title: "ویرایش",
      },
      {
        href: "/ticket",
        activeRoute: "/ticket",
        title: "ارسال تیکت",
      },
    ],
  },
  {
    id: "3",
    routes: "/blog",
    title: "بلاگ",
    icon: <RssFeedIcon sx={{ marginRight: "5%" }} />,
    list: [
      {
        href: "/story",
        title: "کوتاه و مفید",
        activeRoute: "/story",
      },
      {
        href: "/tutorial",
        activeRoute: "/tutorial",
        title: "آموزش",
      },
    ],
  },
];
export { list };
