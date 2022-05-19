import { Grid } from "@mui/material";
import { Info } from "../info";
import { Limit } from "../limit";
export const Text = ({ timeFrame }) => {
  return (
    <Grid container spacing={5}>
      <Info timeFrame={timeFrame} />
      <Limit />
    </Grid>
  );
};
