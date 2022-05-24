import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Box } from "@mui/system";
import Image from "next/image";
import { Fragment } from "react";

export const Faq = ({ items }) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  return (
    <Fragment>
      <Grid item xl={6} lg={6} md={6} sm={12} xs={12} id="faq">
        <Box
          sx={{
            width: "100%",
            height: matches ? "70vh" : "50vh",
            "& >span> img": {
              width: "100% !important",
              height: "100% !important",
              position: "unset !important",
            },
            "& >span": {
              position: "unset !important",
              width: "100% !important",
              height: "100% !important",
            },
          }}
        >
          <Image
            src="/image/undraw_questions_re_1fy7.svg"
            alt=""
            className="img"
            layout="fill"
          />
        </Box>
      </Grid>
      <Grid
        item
        xl={6}
        lg={6}
        md={6}
        sm={12}
        xs={12}
        sx={{
          width: "100%",
          minHeight: matches ? "70vh" : "30vh",
          display: "flex",
          flexDirection: "column",
          alignItems: matches ? "baseline" : "center",
          justifyContent: "flex-start",
          marginTop: matches ? "0" : "15px",
          textAlign: matches ? "left" : "center",
          overflowX: "hidden",
          paddingLeft: "15px",
        }}
      >
        <Typography variant="h4" sx={{ margin: "25px 0" }}>
          سوالات متداول
        </Typography>
        <Box sx={{ marginBottom: "20px" }}>
          {items.map((el, idx) => (
            <Accordion key={idx}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{el.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography align="left">{el.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Grid>
    </Fragment>
  );
};
