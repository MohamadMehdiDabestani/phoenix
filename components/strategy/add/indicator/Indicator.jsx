import { Select, InputLabel, MenuItem, FormControl, Grid } from "@mui/material";
import { useEffect } from "react";
import { useIndicator } from "@/hooks/useIndicator";
import { useDispatch } from "react-redux";
import { setIndicator } from "@/redux/action/strategy/Actions";
export const Indicator = () => {
  const { getNames, currentStrategy, getInidcatorById } = useIndicator();
  useEffect(() => {}, [currentStrategy]);
  const dispatch = useDispatch();
  const handleIndicatorChange = (e) => {
    dispatch(
      setIndicator({ completed: false, ...getInidcatorById(e.target.value) })
    );
  };

  return (
    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel id="indicator-label">اندیکاتور</InputLabel>
        <Select
          onChange={handleIndicatorChange}
          labelId="indicator-label"
          label="اندیکاتور"
        >
          {getNames().map((el, idx) => (
            <MenuItem value={el.id} key={idx}>
              {el.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
