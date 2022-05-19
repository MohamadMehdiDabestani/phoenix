import { AccordionDetails, Accordion, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Child } from "./Child";

export const EmaComponent = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        تنظیمات
      </AccordionSummary>
      <AccordionDetails>
        <Child />
      </AccordionDetails>
    </Accordion>
  );
};
