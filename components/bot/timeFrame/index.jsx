import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { botUpdateTimeFrame } from "@/redux/action/bot/Actions";

export const TimeFrame = ({ timeframes }) => {
    console.log("timeFrames" , timeframes);
  const dispatch = useDispatch();
  const { timeFrame } = useSelector((state) => state.bot);
  const handleChange = (e) => {
    dispatch(botUpdateTimeFrame(e.target.value));
  };
  return (
    <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel>تایم فریم</InputLabel>
        <Select onChange={handleChange} value={timeFrame}>
          {Object.keys(timeframes).map((el, idx) => (
            <MenuItem value={el} key={idx}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
