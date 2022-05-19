import { useIndicator } from "@/hooks/useIndicator";
import { setSettings } from "@/redux/action/strategy/Actions";
import { Box, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { IndicatorInput } from "../../IndicatorInput";

export const Sensitivity = () => {
  const dispatch = useDispatch();
  const { currentStrategy } = useIndicator();
  const handle = (e) => {
    dispatch(
      setSettings({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };
  return (
    <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
      {currentStrategy.settings.map((el, idx) => (
        <Box
          sx={(theme) => ({
            width: "80%",
            margin: "0 auto",
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          })}
          key={idx}
        >
          <IndicatorInput
            label={el.label}
            name={el.name}
            value={el.value}
            change={handle}
            rest={{ helperText: "از صفر تا یک" }}
          />
        </Box>
      ))}
    </Grid>
  );
};
