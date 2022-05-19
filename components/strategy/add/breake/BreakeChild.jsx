import { Grid } from "@mui/material";
import { BreakingLine } from "./BreakingLine";
import { Offset } from "./offset";
import { Type } from "./type";
import { Value } from "./value";
import { Side } from "./side";
import { Status } from "./status";

export const BreakeChild = () => {
  return (
    <Grid container>
      <Status />
      <Offset />
      <Side />
      <Type />
      <Value />
      <BreakingLine />
    </Grid>
  );
};
