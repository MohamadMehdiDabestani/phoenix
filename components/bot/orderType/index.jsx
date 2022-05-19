import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderType } from "@/redux/action/bot/Actions";

export const OrderType = () => {
  const dispatch = useDispatch();
  const { orderType } = useSelector((state) => state.bot);
  const handleChange = (e) => {
    dispatch(updateOrderType(e.target.value));
  };
  return (
    <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel>نوع خرید</InputLabel>
        <Select onChange={handleChange} value={orderType}>
          {["Limit Order", "Market Order"].map((el, idx) => (
            <MenuItem value={el} key={idx}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
