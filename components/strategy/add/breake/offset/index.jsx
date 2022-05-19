import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useIndicator } from "@/hooks/useIndicator";
import { IndicatorInput } from "@/components";
import { updateBreakeOffset } from "@/redux/action/strategy/Actions";
export const Offset = () => {
  const { currentStrategy } = useIndicator();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(updateBreakeOffset(Number.parseInt(e.target.value)));
  };
  return (
    <Grid
      item
      xl={3}
      lg={3}
      md={5}
      sm={6}
      xs={12}
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          marginBottom: "20px",
          marginTop: "20px",
        },
      })}
    >
      <Box
        sx={(theme) => ({
          width: "80%",
          margin: "0 auto",

          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
        })}
      >
        <IndicatorInput
          value={currentStrategy.breake.offset}
          label="تثبیت (تعداد کندل)"
          change={handleChange}
        />
      </Box>
    </Grid>
  );
};
