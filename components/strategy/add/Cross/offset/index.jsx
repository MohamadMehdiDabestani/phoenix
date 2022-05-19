import { Box, Grid } from "@mui/material";
import { IndicatorInput } from "@/components";
import { useIndicator } from "@/hooks/useIndicator";
import { useDispatch } from "react-redux";
import { updateCrossOffset } from "@/redux/action/strategy/Actions";
export const Offset = () => {
  const { currentStrategy } = useIndicator();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(updateCrossOffset(Number.parseInt(e.target.value)));
  };
  return (
    <Grid
      item
      xl={3}
      lg={3}
      md={4}
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
          change={handleChange}
          label="تثبیت (تعدا کندل)"
          value={currentStrategy.cross.offset}
        />
      </Box>
    </Grid>
  );
};
