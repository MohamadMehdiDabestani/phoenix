import useLocalStorage from "@/hooks/useLocalStorage";
import {
  cleanFilterCoin,
  cleanFilterCoinList,
  setCoinFilterList,
  setCustomCoin,
} from "@/redux/action/panel/Actions";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const SelectCoinList = () => {
  const [coins, _] = useLocalStorage("coins", {}); // eslint-disable-line
  const { currentCoinList } = useSelector((state) => state.panel);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setCoinFilterList(e.target.value));
  };
  useEffect(() => {
    dispatch(cleanFilterCoin());
    dispatch(cleanFilterCoinList());
    coins[currentCoinList].value.split(",").map((e) => {
      dispatch(setCustomCoin(e.replace(" ", "")));
    });
  }, [currentCoinList]);
  return (
    <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
      <FormControl variant="filled" fullWidth>
        <InputLabel id="selectlist-label">لیست</InputLabel>
        <Select
          labelId="selectlist-label"
          value={currentCoinList}
          onChange={handleChange}
        >
          {Object.keys(coins).map((el, idx) => (
            <MenuItem value={el} key={idx}>
              {coins[el].label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
