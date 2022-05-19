import { Grid } from "@mui/material";
import { DialogBox } from "@/components";
import { Indicator } from "./indicator";
import { Side } from "./side";
import { Offset } from "./offset";
import { Parameter } from "./parameter";
import { Save } from "./save";
import { useIndicator } from "@/hooks/useIndicator";
import { Fragment } from "react";
export const CombineForm = () => {
  const { currentCombine } = useIndicator();
  if (typeof currentCombine === "undefined") return <Fragment></Fragment>;
  return (
    <DialogBox
      title="ترکیب کردن اندیکاتور"
      rest={{
        maxWidth: "lg",
      }}
    >
      <Grid container spacing={4}>
        <Indicator />
        <Side />
        <Offset />
        <Parameter />
      </Grid>
      <Save />
    </DialogBox>
  );
};
