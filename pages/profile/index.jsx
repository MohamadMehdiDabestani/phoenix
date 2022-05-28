import { getCookie, removeCookies } from "cookies-next";
import axios from "axios";
import {
  Button,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
const Panel = ({ user }) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const userData = JSON.parse(user);
  return (
    <Paper sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>{userData.userName} , خوش آمدید</Typography>
        <Button
          color="error"
          variant="outlined"
          size={matches ? "small" : "medium"}
          sx={{
            ...(matches && {
              padding: "7px 12px",
            }),
          }}
        >
          خروج از حساب
        </Button>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={`صرافی : ${getCookie("exchange")}`} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={`نام کاربری : ${userData.userName}`} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={`ایمیل : ${userData.email}`} />
          </ListItemButton>
        </ListItem>
      </List>
      <Link href="/profile/edite">
        <Button variant="contained">ویرایش</Button>
      </Link>
    </Paper>
  );
};
export async function getServerSideProps({ req, res }) {
  try {
    const cookie = getCookie("authentication_scanner", { req, res });
    if (!cookie) {
      return {
        redirect: {
          permanent: false,
          destination: "/login?notif=true",
        },
      };
    }
    const { data } = await axios.post(`${process.env.NEXT_JS_URI_API}/user`, {
      cookieValue: cookie,
    });
    if (data.data) {
      return {
        props: {
          user: JSON.stringify(data.data),
        },
      };
    } else {
      removeCookies("authentication_scanner", { req, res });
      return {
        redirect: {
          permanent: false,
          destination: "/login?notif=true",
        },
      };
    }
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: "/badRequest",
      },
    };
  }
}
export default Panel;
