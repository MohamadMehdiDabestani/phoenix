import { Grid } from "@mui/material";
import { IndicatorInput } from "@/components";
import { useIndicator } from "@/hooks/useIndicator";
import { useDispatch } from "react-redux";
import { updateCombineIndicatorOffset } from "@/redux/action/strategy/Actions";

export const Offset = () => {
  const dispatch = useDispatch();
  const { currentCombine } = useIndicator();
  const handleChange = (e) => {
    dispatch(updateCombineIndicatorOffset(Number.parseInt(e.target.value)));
  };
  return (
    <Grid
      item
      xl={4}
      lg={4}
      md={4}
      sm={12}
      xs={12}
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          marginBottom: "20px",
          marginTop: "20px",
        },
      })}
    >
      <IndicatorInput
        change={handleChange}
        label="تثبیت (تعدا کندل)"
        value={currentCombine.offset}
      />
    </Grid>
  );
};
