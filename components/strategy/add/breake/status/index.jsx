import { Switch, Typography, Grid, Box } from "@mui/material";
import { useIndicator } from "@/hooks/useIndicator";
import { useDispatch } from "react-redux";
import { toggleBreakeStatus } from "@/redux/action/strategy/Actions";

export const Status = () => {
  const { currentStrategy } = useIndicator();
  const dispatch = useDispatch();
  const handleChange = () => {
    dispatch(toggleBreakeStatus(!currentStrategy.isEnableBreake));
  };
  return (
    <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>غیر فعال</Typography>
        <Switch
          onChange={handleChange}
          defaultChecked={currentStrategy.isEnableBreake}
        />
        <Typography>فعال</Typography>
      </Box>
    </Grid>
  );
};
