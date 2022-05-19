import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateChartType } from "@/redux/action/strategy/Actions";

export const ChartType = () => {
  const dispatch = useDispatch();
  const { chartType } = useSelector((state) => state.strategy);
  const handleChange = (e) => {
    dispatch(updateChartType(e.target.value));
  };
  return (
    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel>نوع چارت</InputLabel>
        <Select onChange={handleChange} value={chartType}>
          {["Heikin Ashi", "Candle Stick"].map((el, idx) => (
            <MenuItem value={el} key={idx}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
