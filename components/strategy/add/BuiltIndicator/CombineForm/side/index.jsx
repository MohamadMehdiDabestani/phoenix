import { Grid } from "@mui/material";
import { RadioGroup } from "@/components/";
import { useIndicator } from "@/hooks/useIndicator";
import { useDispatch } from "react-redux";
import { updateCombineIndicatorSide } from "@/redux/action/strategy/Actions";

const items = {
  display: "جهت تقاطع",
  value: "upwards",
  list: [
    {
      label: "به سمت بالا (تقاطع طلایی)",
      value: "upwards",
    },
    {
      label: "به سمت پایین (تقاطع مرگ)",
      value: "downwards",
    },
    {
      label: "هردو",
      value: "both",
    },
  ],
};
export const Side = () => {
  const { currentCombine } = useIndicator();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(updateCombineIndicatorSide(e.target.value));
  };
  return (
    <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
      <RadioGroup
        defaultValue={currentCombine.side}
        change={handleChange}
        {...items}
      />
    </Grid>
  );
};
