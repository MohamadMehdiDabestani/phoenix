import { Fragment, useEffect } from "react";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Backdrop, Box, Divider, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenuDashboard } from "../../redux/action/Actions";
import MenuItem from "./MenuItem";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  ".MuiDrawer-paper": {
    background: `#051e34`,
  },
  "& *": {
    color: "white !important",
  },
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export const Menu = () => {
  const open = useSelector((state) => state.menuDashboard);
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    if (matches) {
      dispatch(toggleMenuDashboard(false));
    } else {
      dispatch(toggleMenuDashboard(true));
    }
  }, [matches]);
  return (
    <Fragment>
      <Drawer
        open={open}
        variant="permanent"
        sx={{
          "& > div > span": {
            zIndex: "5",
            width: "100% !important",
            height: " 100% !important",
            img: {
              objectFit: "cover !important",
              width: "100% !important",
              height: " 100% !important",
            },
          },
        }}
      >
        <Box
          sx={{
            zIndex: "6",
          }}
        >
          <DrawerHeader>
            <IconButton onClick={() => dispatch(toggleMenuDashboard(!open))}>
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ marginBottom: "10%", backgroundColor: "#ffffff3b" }} />
          <MenuItem />
        </Box>
        <Image className="img" src="/image/Nav.svg" layout="fill" />
      </Drawer>
      {matches && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer - 1 }}
          open={open}
          onClick={() => dispatch(toggleMenuDashboard(false))}
        />
      )}
    </Fragment>
  );
};
