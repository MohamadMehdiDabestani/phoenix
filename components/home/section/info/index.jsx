import { Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

export const InfoSection = ({ title, text, children, gridId }) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  return (
    <Grid
      item
      xl={6}
      lg={6}
      md={6}
      sm={12}
      xs={12}
      id={gridId}
      sx={{
        marginBottom: matches ? "" : "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: matches ? "70vh" : "30vh",
          display: "flex",
          flexDirection: "column",
          alignItems: matches ? "baseline" : "center",
          justifyContent: matches ? "center" : "flex-start",
          marginTop: matches ? "0" : "15px",
          textAlign: matches ? "left" : "center",
        }}
      >
        <Typography variant="h4" sx={{ marginTop: matches ? "0" : "20px" }}>{title}</Typography>
        <Typography
          variant="body1"
          sx={{ marginTop: "10px" }}
        >
          {text}
        </Typography>
        {children}
      </Box>
    </Grid>
  );
};
