import { Fragment } from "react";
import { Menu } from "../../";

import { useSelector } from "react-redux";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
export const DashboardLayout = (props) => {
  console.log("DashboardLayout rendred");
  const open = useSelector((state) => state.menuDashboard);
  const withOutLayout = useSelector((state) => state.withoutLayout);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  if (withOutLayout) return <Fragment>{props.children}</Fragment>;
  return (
    <Fragment>
      <Menu />
      <Box
        sx={(theme) => ({
          marginLeft: open ? (matches ? "0px" : "215px") :   "50px",
          padding: "20px 0",
          transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        })}
      >
        <Container maxWidth="xl">{props.children}</Container>
      </Box>
    </Fragment>
  );
};
