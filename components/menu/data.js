import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
const list = [
  {
    id: "1",
    codeName: "",
    routes: "/panel,/panel/strategy/add,/panel/filter,/panel/bot",
    title: "بازار",
    icon: <AttachMoneyIcon sx={{ marginRight: "5%" }} />,
    list: [
      {
        href: "/panel",
        activeRoute: "/panel",
        title: "تحلیل ها",
      },
      {
        href: "/panel/filter",
        activeRoute: "/panel/filter",
        title: "فیلتر",
      },
      {
        href: "/panel/bot",
        activeRoute: "/panel/bot",
        title: "ربات",
      },
      {
        href: "/panel/strategy/add",
        activeRoute: "/panel/strategy/add",
        title: "استراتژی",
      },
    ],
  },
  {
    id: "2",
    routes: "/panel/profile,/panel/profile/edite",
    title: "حساب کاربری",
    icon: <AccountCircleIcon sx={{ marginRight: "5%" }} />,
    list: [
      {
        href: "/panel/profile",
        activeRoute: "/panel/profile",
        title: "پروفایل",
      },
      {
        href: "/panel/profile/edite",
        activeRoute: "/panel/profile/edite",
        title: "ویرایش",
      },
    ],
  },
  {
    id: "3",
    routes: "/panel/blog",
    title: "بلاگ",
    icon: <RssFeedIcon sx={{ marginRight: "5%" }} />,
    list: [
      {
        href: "/panel/blog",
        activeRoute: "/panel/blog",
        title: "پست ها",
      },
    ],
  },
];
export { list };
