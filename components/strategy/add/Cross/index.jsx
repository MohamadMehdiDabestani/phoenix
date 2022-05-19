
import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CrossChild } from "./CrossChild";
import { useIndicator } from "@/hooks/useIndicator";
export const Cross = () => {
  const { currentStrategy } = useIndicator();
  if (!currentStrategy.isCross) {
    return (
      <Alert severity="warning" sx={{ margin: "10px 0" }}>
        این اندیکاتور فاقد تقاطع (cross) می باشد
      </Alert>
    );
  }
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          "&>div:first-child": {
            alignItems: "center",
          },
        }}
      >
        تقاطع ها (cross)
      </AccordionSummary>

      <AccordionDetails>
        <CrossChild />
      </AccordionDetails>
    </Accordion>
  );
};
