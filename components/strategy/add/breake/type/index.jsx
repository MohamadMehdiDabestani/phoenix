import { Grid } from "@mui/material";
import { RadioGroup } from "@/components";
import { useIndicator } from "@/hooks/useIndicator";
import { useDispatch } from "react-redux";
import { updateBreakeType } from "@/redux/action/strategy/Actions";
const items = {
  display: "نوع",
  list: [
    {
      value: "line",
      label: "خطی",
    },
    {
      value: "area",
      label: "ناحیه ای",
    },
  ],
};
export const Type = () => {
  const { currentStrategy } = useIndicator();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(updateBreakeType(e.target.value));
  };
  return (
    <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
      <RadioGroup
        {...items}
        defaultValue={currentStrategy.breake.type}
        change={handleChange}
      />
    </Grid>
  );
};
