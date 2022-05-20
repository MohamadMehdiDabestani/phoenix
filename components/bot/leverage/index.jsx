import { updateLeverage } from "@/redux/action/bot/Actions";
import { Grid, Slider, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
export const Leverage = () => {
  const { leverage } = useSelector((state) => state.bot);
  const dispatch = useDispatch();
  return (
    <Grid
      item
      xl={3}
      lg={3}
      md={3}
      sm={6}
      xs={6}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        flexDirection: "column",
      }}
    >
      <Typography>اهرم</Typography>
      <Slider
        value={leverage}
        onChange={(e) => dispatch(updateLeverage(e.target.value))}
        valueLabelDisplay="auto"
        min={2}
        max={40}
      />
    </Grid>
  );
};
