import { Select, InputLabel, MenuItem, FormControl, Grid } from "@mui/material";

import { useIndicator } from "@/hooks/useIndicator";
import { useDispatch } from "react-redux";
import { updateBotStrategy } from "@/redux/action/bot/Actions";
export const Strategy = () => {
  const { getBotStrategyName, getStrategyById } = useIndicator();
  const dispatch = useDispatch();
  const handleIndicatorChange = (e) => {
    dispatch(updateBotStrategy(getStrategyById(e.target.value)));
  };

  return (
    <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel id="indicator-label">اندیکاتور</InputLabel>
        <Select
          onChange={handleIndicatorChange}
          labelId="indicator-label"
          label="اندیکاتور"
        >
          {getBotStrategyName().map((el, idx) => (
            <MenuItem value={el.id} key={idx}>
              {el.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
