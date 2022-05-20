import { Box, Grid, Switch, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleStatus } from "@/redux/action/bot/Actions";

export const Status = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.bot);
  const handleChange = () => {
    dispatch(toggleStatus(!status));
  };
  return (
    <Grid
      item
      xl={3}
      lg={3}
      md={3}
      sm={6}
      xs={6}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>غیر فعال</Typography>
        <Switch onChange={handleChange} defaultChecked={status} />
        <Typography>فعال</Typography>
      </Box>
    </Grid>
  );
};
