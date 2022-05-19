import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { Fragment } from "react";

const items = ["4500000", "4500000", "4500000", "4500000"];
export const Payment = () => {
  return (
    <Fragment>
      <List sx={{ marginTop: "15px" }}>
        {items.map((el, idx) => (
          <ListItem disablePadding key={idx}>
            <ListItemButton>
              <ListItemText primary={`${el} تومان`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Link href="/profile/edite">
        <Button variant="contained">واریز</Button>
      </Link>
    </Fragment>
  );
};
