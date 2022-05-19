import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderManagment } from "@/redux/action/bot/Actions";

export const CloseOrder = () => {
  const dispatch = useDispatch();
  const { orderManagment } = useSelector((state) => state.bot);
  const handleChange = (e) => {
    dispatch(updateOrderManagment(e.target.value));
  };
  return (
    <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel>طریقه ی مدیریت معاملات</InputLabel>
        <Select
          onChange={handleChange}
          value={orderManagment.find((e) => e.isActive).name}
        >
          {orderManagment.map((el, idx) => (
            <MenuItem value={el.name} key={idx}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
