import { Alert, Grid, Paper, Typography } from "@mui/material";
import { Cross } from "./Cross";
import { Indicator } from "./indicator/Indicator";
import { IndicatorParameter } from "./InputParameter";
import Link from "next/link";
import { Breake } from "./breake";
import { TimeFrame } from "./TimeFrame";
import { useIndicator } from "@/hooks/useIndicator";

import { Fragment, useEffect } from "react";
import { Save } from "./save";
import { BuiltIndicator } from "./BuiltIndicator";
import { useDispatch } from "react-redux";
import { cleanUpState } from "@/redux/action/strategy/Actions";
import { ChartType } from "./chartType";
export const AddStrategyComponent = ({ timeFrames }) => {
  const { currentStrategy } = useIndicator();
  const dispatch = useDispatch();
  useEffect(() => {
    return function cleanUp() {
      dispatch(cleanUpState());
    };
  }, []);
  return (
    <Fragment>
      <Paper sx={{ padding: "20px", position: "relative" }}>
        <Alert
          sx={{
            a: { color: "rgb(30, 58, 102)", fontWeight: "bold" },
            marginBottom: "20px",
          }}
          severity="info"
        >
          <Typography variant="body2">
            برای استفاده ی صحیح از این بخش سایت ابتدا
            <Link href="/help"> راهنمای سایت</Link> را مطالعه کنید
          </Typography>
        </Alert>
        <Grid container spacing={4}>
          <Indicator />
          <TimeFrame timeFrames={JSON.parse(timeFrames)} />
          <ChartType />
        </Grid>
        {typeof currentStrategy !== "undefined" && currentStrategy.id > 0 && (
          <Fragment>
            <IndicatorParameter />
            <Cross />
            <Breake />
            {currentStrategy.component && currentStrategy.component}
            <Save />
          </Fragment>
        )}
      </Paper>
      <BuiltIndicator />
    </Fragment>
  );
};
