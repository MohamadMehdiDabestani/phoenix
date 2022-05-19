import { useIndicator } from "@/hooks/useIndicator";
import { setSettings } from "@/redux/action/strategy/Actions";
import { useDispatch } from "react-redux";
import { Box, Grid } from "@mui/material";
import { IndicatorInput } from "../../IndicatorInput";
import { Fragment } from "react";
export const Precentage = () => {
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
  if (
    currentStrategy.settings.find((e) => e.name === "type").value === "default"
  )
    return <Fragment></Fragment>;
  return (
    <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
      {currentStrategy.settings
        .filter((e) => e.name === "precentage")
        .map((el, idx) => (
          <Box key={idx}>
            <IndicatorInput
              label={el.label}
              name={el.name}
              value={el.value}
              change={handle}
            />
          </Box>
        ))}
    </Grid>
  );
};
