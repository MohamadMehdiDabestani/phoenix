import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Child } from './Child';


export const Bbands = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        تنظیمات
      </AccordionSummary>
      <AccordionDetails>
          <Child />
      </AccordionDetails>
    </Accordion>
  )
}
