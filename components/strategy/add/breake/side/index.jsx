import { Grid } from "@mui/material";
import { RadioGroup } from "@/components";
import { useIndicator } from "@/hooks/useIndicator";
import { useDispatch } from "react-redux";
import { updateBreakeSide } from "@/redux/action/strategy/Actions";
const items = {
  display: "جهت شکست",
  list: [
    {
      value: "upwards",
      label: "به سمت بالا",
    },
    {
      value: "downwards",
      label: "به سمت پایین",
    },
    {
      value: "both",
      label: "هردو",
    },
  ],
};
export const Side = () => {
  const { currentStrategy } = useIndicator();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(updateBreakeSide(e.target.value));
  };
  return (
    <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
      <RadioGroup
        {...items}
        defaultValue={currentStrategy.breake.side}
        change={handleChange}
      />
    </Grid>
  );
};
