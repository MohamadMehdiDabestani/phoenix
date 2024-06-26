import { Fragment } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
const MenuItemCildren = (props) => {
  const open = useSelector((state) => state.menuDashboard);
  const router = useRouter();
  return (
    <Accordion
      disableGutters={true}
      expanded={props.expand === props.el.id}
      onClick={props.onClick}
      sx={{
        background: "transparent",
        boxShadow: "none",
        width: "100%",
      }}
    >
      <AccordionSummary expandIcon={open ? <ExpandMoreIcon /> : null}>
        {open == false && (
          <Tooltip arrow title={props.el.title} placement="left-start">
            {props.el.icon}
          </Tooltip>
        )}
        {open && (
          <Fragment>
            {props.el.icon}
            <Typography sx={{ display: "flex" }}>{props.el.title}</Typography>
          </Fragment>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0px" }}>
        <List
          sx={(theme) => ({
            "& > .active": {
              background: "#ffffff26",
            },
            "& > li": {
              transition: theme.transitions.create("background", {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
            "& > li:hover:not(& > .active)": {
              background: "#a9a1e714",
            },
          })}
        >
          {props.el.list.map((el, i) => (
            <ListItem
              disablePadding
              key={i}
              className={
                el.activeRoute.split(",").includes(router.pathname)
                  ? "active"
                  : ""
              }
              onClick={() => router.push(el.href)}
            >
              <ListItemButton>
                <ListItemText primary={el.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuItemCildren;
