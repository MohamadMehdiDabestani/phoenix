import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useIndicator } from "@/hooks/useIndicator";
import { useDispatch } from "react-redux";
import { updateBreakingLine } from "@/redux/action/strategy/Actions";

export const BreakingLine = () => {
  const { currentStrategy } = useIndicator();
  const dispatch = useDispatch();
  const getBreakeLine = () => {
    return currentStrategy.parameters.filter((el) => el.breake === true);
  };
  const getDefaultBreakeLine = () => {
    return currentStrategy.parameters.filter(
      (el) => el.defaultBreaking === true
    )[0];
  };
  const handleChange = (e) => {
    dispatch(updateBreakingLine(e.target.value));
  };
  if (getBreakeLine().length === 0) {
    return <></>;
  }
  return (
    <Grid
      item
      xl={4}
      lg={4}
      md={4}
      sm={6}
      xs={12}
      sx={(theme) => ({
        marginTop: "25px",
        [theme.breakpoints.down("md")]: {
          padding: "0 3%",
        },
        [theme.breakpoints.down("sm")]: {
          padding: "unset",
        },
      })}
    >
      <FormControl fullWidth variant="filled">
        <InputLabel>خط شکننده</InputLabel>
        <Select
          label="خط شکننده"
          value={getDefaultBreakeLine().name}
          onChange={handleChange}
        >
          {getBreakeLine().map((el, idx) => (
            <MenuItem value={el.name} key={idx}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
