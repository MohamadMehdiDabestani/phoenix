import { IndicatorInput } from "@/components";
import { updateReward } from "@/redux/action/bot/Actions";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export const Reward = () => {
  const { reward } = useSelector((state) => state.bot);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(updateReward(Number.parseFloat(e.target.value)));
  };
  return (
    <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
      <IndicatorInput change={handleChange} {...reward} />
    </Grid>
  );
};
