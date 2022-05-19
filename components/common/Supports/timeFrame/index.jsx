import { Grid } from "@mui/material";
import { MultipleSelect } from "@/components";
import { useIndicator } from "@/hooks/useIndicator";
import { useDispatch } from "react-redux";
import { setSettings } from "@/redux/action/strategy/Actions";
export const TimeFrame = () => {
  const { currentStrategy, timeFrames } = useIndicator();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(
      setSettings({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };
  return (
    <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
      <MultipleSelect
        value={
          currentStrategy.settings.find((e) => e.name === "timeFrames").value
        }
        values={timeFrames}
        change={handleChange}
        restSelect={{ name: "timeFrames" }}
      />
    </Grid>
  );
};
