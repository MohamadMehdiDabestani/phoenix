import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BreakeChild } from "./BreakeChild";
import { useIndicator } from "@/hooks/useIndicator";

export const Breake = () => {
  const { currentStrategy } = useIndicator();
  if (!currentStrategy.isBreake) {
    return (
      <Alert severity="warning" sx={{ margin: "10px 0" }}>
        این اندیکاتور فاقد شکست می باشد
      </Alert>
    );
  }
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          "& > div:first-child": {
            alignItems: "center",
          },
        }}
      >
        شکست ها
      </AccordionSummary>
      <AccordionDetails>
        <BreakeChild />
      </AccordionDetails>
    </Accordion>
  );
};
