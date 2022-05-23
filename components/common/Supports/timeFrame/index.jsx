import { useState } from "react";
import { Grid } from "@mui/material";
import { MultipleSelect } from "@/components";
import { useIndicator } from "@/hooks/useIndicator";
import { useDispatch } from "react-redux";
import { setSettings } from "@/redux/action/strategy/Actions";
import ccxt from "ccxt";
import { getCookie } from "cookies-next";

export const TimeFrame = () => {
  const { currentStrategy } = useIndicator();
  const ex = getCookie("exchange");
  const [exchange, setExchange] = useState(new ccxt[ex]()); //eslint-disable-line
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(
      setSettings({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };
  console.log("exchange" , exchange);
  return (
    <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
      <MultipleSelect
        value={
          currentStrategy.settings.find((e) => e.name === "timeFrames").value
        }
        values={Object.keys(exchange.timeframes)}
        change={handleChange}
        restSelect={{ name: "timeFrames" }}
      />
    </Grid>
  );
};
