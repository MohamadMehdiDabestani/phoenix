import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useIndicator } from "@/hooks/useIndicator";
import { IndicatorInput } from "@/components";
import { useDispatch } from "react-redux";
import { updateBreakeValue } from "@/redux/action/strategy/Actions";

export const Value = () => {
  const { currentStrategy } = useIndicator();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(updateBreakeValue({ value: e.target.value, name: e.target.name }));
  };
  return (
    <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
      <Box
        sx={(theme) => ({
          margin: "0 auto",
          [theme.breakpoints.down("lg")]: {
            marginTop: "25px",
          },
          [theme.breakpoints.down("md")]: {
            padding: "0 5%",
          },
          [theme.breakpoints.down("sm")]: {
            padding: "unset",
          },
        })}
      >
        {currentStrategy.breake.type === "line" ? (
          <IndicatorInput
            value={currentStrategy.breake.line}
            change={handleChange}
            label="شکست خط"
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              "& > div": {
                width: "35%",
              },
            }}
          >
            <Typography>ناحیه</Typography>
            <IndicatorInput
              change={handleChange}
              name="start"
              label="شروع"
              value={currentStrategy.breake.area[0]}
            />
            <Typography>تا</Typography>
            <IndicatorInput
              change={handleChange}
              name="end"
              label="پایان"
              value={currentStrategy.breake.area[1]}
            />
          </Box>
        )}
      </Box>
    </Grid>
  );
};
