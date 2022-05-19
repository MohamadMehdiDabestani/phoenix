import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useIndicator } from "@/hooks/useIndicator";
import { updateCrossingLine } from "@/redux/action/strategy/Actions";
import { useDispatch } from "react-redux";
export const CrossingLine = () => {
  const dispatch = useDispatch();
  const { currentStrategy } = useIndicator();
  const getCrossingLine = () => {
    return currentStrategy.parameters.filter((el) => el.cross === true);
  };
  const getDefaultCrossingLine = () => {
    return currentStrategy.parameters.filter(
      (el) => el.defaultCrossing === true
    )[0];
  };
  const getDefaultCrossedLine = () => {
    return currentStrategy.parameters.filter(
      (el) => el.defaultCrossed === true
    )[0];
  };
  const handleChange = (e) => {
    dispatch(updateCrossingLine({ name: e.target.value, type: e.target.name }));
  };
  if (getCrossingLine().length === 0) {
    return <></>;
  }
  return (
    <Grid
      item
      xl={3}
      lg={3}
      md={4}
      sm={6}
      xs={12}
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          marginTop: "20px",
        },
      })}
    >
      <FormControl fullWidth variant="filled">
        <InputLabel>خط شکننده</InputLabel>
        <Select
          label="خط شکننده"
          name="crossing"
          value={getDefaultCrossingLine().name}
          onChange={handleChange}
        >
          {getCrossingLine().map((el, idx) => (
            <MenuItem value={el.name} key={idx}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ marginTop: "20px" }} fullWidth variant="filled">
        <InputLabel>خط شکسته شده</InputLabel>
        <Select
          label="خط شکسته شده"
          name="crossed"
          value={getDefaultCrossedLine().name}
          onChange={handleChange}
        >
          {getCrossingLine().map((el, idx) => (
            <MenuItem value={el.name} key={idx}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
