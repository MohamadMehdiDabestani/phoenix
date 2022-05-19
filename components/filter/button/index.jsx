import useLocalStorage from "@/hooks/useLocalStorage";
import { toggleDialog } from "@/redux/action/Actions";
import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { FilterDialogBox } from "../dialogBox";

export const FilterButton = () => {
  const [coins, _] = useLocalStorage("coins", {}); // eslint-disable-line
  const dispatch = useDispatch();
  return (
    <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
      <FilterDialogBox />
      <Button variant="contained" onClick={() => dispatch(toggleDialog(true))}>
        افزودن لیست
      </Button>
    </Grid>
  );
};
