import { toggleAdxFilter } from "@/redux/action/bot/Actions";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export const AdxFilter = () => {
  const { adxFilter } = useSelector((state) => state.bot);
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(toggleAdxFilter(!adxFilter));
  };
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
      <FormControlLabel
        control={
          <Checkbox
            checked={adxFilter}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="استفاده از فیلتر adx"
      />
    </Grid>
  );
};
