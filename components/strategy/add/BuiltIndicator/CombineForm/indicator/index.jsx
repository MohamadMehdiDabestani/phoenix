import { Select, InputLabel, MenuItem, FormControl, Grid } from "@mui/material";
import { useIndicator } from "@/hooks/useIndicator";
import { useDispatch } from "react-redux";
import { setCombineIndicator } from "@/redux/action/strategy/Actions";

export const Indicator = () => {
  const { getMovingName, getInidcatorById } = useIndicator();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    console.log("changed" , getInidcatorById(e.target.value));
    dispatch(setCombineIndicator(getInidcatorById(e.target.value)));
  };
  return (
    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel id="indicator-label-combine">اندیکاتور</InputLabel>
        <Select
          onChange={handleChange}
          labelId="indicator-label-combine"
          label="اندیکاتور"
        >
          {getMovingName().map((el, idx) => (
            <MenuItem value={el.id} key={idx}>
              {el.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
