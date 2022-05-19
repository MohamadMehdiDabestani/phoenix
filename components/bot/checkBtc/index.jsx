import { toggleCheckBtc } from "@/redux/action/bot/Actions";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export const CheckBtc = () => {
  const { checkBtc } = useSelector((state) => state.bot);
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(toggleCheckBtc(!checkBtc));
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
            checked={checkBtc}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="بررسی بیت کوین برای معاملات"
      />
    </Grid>
  );
};
