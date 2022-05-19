import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateTimeFrame } from "@/redux/action/strategy/Actions";

export const TimeFrame = ({ timeFrames }) => {
  const dispatch = useDispatch();
  const { timeFrame } = useSelector((state) => state.strategy);
  const handleChange = (e) => {
    dispatch(updateTimeFrame(e.target.value));
  };
  return (
    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel>تایم فریم</InputLabel>
        <Select onChange={handleChange} value={timeFrame}>
          {Object.keys(timeFrames).map((el, idx) => (
            <MenuItem value={el} key={idx}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
