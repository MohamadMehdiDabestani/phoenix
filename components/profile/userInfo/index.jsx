import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { Fragment } from "react";
import { getCookie } from "cookies-next";
const items = [
  "تاریخ ثبت نام : 1400/01/12",
  "ایمیل : email@gmail.com",
  "تاریخ  خرید پنل : 1400/02/11",
  "باقی مانده : 50 روز",
  "نوع پنل : برنزی ",
];
export const UserInfo = () => {
  return (
    <Fragment>
      <List sx={{ marginTop: "15px" }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={`صرافی : ${getCookie("exchange")}`} />
          </ListItemButton>
        </ListItem>
        {items.map((el, idx) => (
          <ListItem disablePadding key={idx}>
            <ListItemButton>
              <ListItemText primary={el} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Link href="/profile/edite">
        <Button variant="contained">ویرایش</Button>
      </Link>
    </Fragment>
  );
};
