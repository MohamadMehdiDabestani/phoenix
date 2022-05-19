import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateMarket } from "@/redux/action/bot/Actions";

export const Market = () => {
  const dispatch = useDispatch();
  const { market } = useSelector((state) => state.bot);
  const handleChange = (e) => {
    dispatch(updateMarket(e.target.value));
  };
  return (
    <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel>نوع بازار</InputLabel>
        <Select onChange={handleChange} value={market}>
          {["Spot","Future" , "Margin"].map((el, idx) => (
            <MenuItem value={el} key={idx}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
