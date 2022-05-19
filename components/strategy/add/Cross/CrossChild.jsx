import { Side } from "./Side";
import { Offset } from "./offset";
import { Grid } from "@mui/material";
import { CrossingLine } from "./CrossingLine";
import { Status } from "./status";
export const CrossChild = () => {
  console.log("CrossChild rendred");
  return (
    <Grid container>
      <Status />
      <Offset />
      <Side />
      <CrossingLine />
    </Grid>
  );
};
