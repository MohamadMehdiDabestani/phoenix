import { Grid, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";

export const ImageSection = ({ image, altImage , gridId}) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} id={gridId}>
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
        <Image src={image} alt={altImage} className="img" layout="fill" />
      </Box>
    </Grid>
  );
};
