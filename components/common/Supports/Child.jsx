import { Grid } from "@mui/material";
import { Precentage } from "./precentage";
import { TimeFrame } from "./timeFrame";
import { Type } from "./type";

export const Child = () => {
  return (
    <Grid container spacing={4}>
      <Type />
      <Precentage />
      <TimeFrame />
    </Grid>
  );
};
