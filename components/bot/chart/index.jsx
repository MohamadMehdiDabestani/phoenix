import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateChartType } from "@/redux/action/bot/Actions";

export const ChartType = () => {
  const dispatch = useDispatch();
  const { chartType } = useSelector((state) => state.bot);
  const handleChange = (e) => {
    dispatch(updateChartType(e.target.value));
  };
  return (
    <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel>نوع چارت</InputLabel>
        <Select onChange={handleChange} value={chartType}>
          {["Heikin Ashi" , "Candle Stick"].map((el, idx) => (
            <MenuItem value={el} key={idx}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
