import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { IndicatorInput } from "@/components";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBotStrategyParameter, updateStopLoss } from "@/redux/action/bot/Actions";
export const Parameter = () => {
  const { current, strategy } = useSelector((state) => state.bot);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(
      updateBotStrategyParameter({
        name: e.target.name,
        value: Number.parseFloat(e.target.value),
      })
    );
  };
  const handleChangeStopLoss = (e) => {
    dispatch(updateStopLoss(e.target.value));
  };
  if (!current) {
    return <Fragment></Fragment>;
  }
  return (
    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
      <Grid container spacing={4}>
        {strategy.parameters.map((el, idx) => (
          <Fragment key={idx}>
            {typeof el.static === "undefined" && (
              <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                <IndicatorInput change={handleChange} {...el} />
              </Grid>
            )}
          </Fragment>
        ))}
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel>طریقه ی تنظیم استاپ لاس</InputLabel>
            <Select
              onChange={handleChangeStopLoss}
              defaultValue={strategy.stopOptions.find((e) => e.isActive).name}
            >
              {strategy.stopOptions.map((el, idx) => (
                <MenuItem value={el.name} name="asd" key={idx}>
                  {el.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};
