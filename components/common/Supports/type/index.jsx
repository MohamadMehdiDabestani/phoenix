import { Grid } from "@mui/material";
import { RadioGroup } from "@/components";
import { useIndicator } from "@/hooks/useIndicator";
import { setSettings } from "@/redux/action/strategy/Actions";
import { useDispatch } from "react-redux";
const items = {
  display: "نوع",
  list: [
    {
      value: "default",
      label: "نزدیک ترین",
    },
    {
      value: "precentage",
      label: "درصدی",
    },
  ],
};

export const Type = () => {
  const { currentStrategy } = useIndicator();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setSettings({ value: e.target.value, name: e.target.name }));
  };
  return (
    <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
      <RadioGroup
        {...items}
        defaultValue={
          currentStrategy.settings.find((e) => e.name === "type").value
        }
        rest={{
          name: currentStrategy.settings.find((e) => e.name === "type").name,
        }}
        change={handleChange}
      />
    </Grid>
  );
};
