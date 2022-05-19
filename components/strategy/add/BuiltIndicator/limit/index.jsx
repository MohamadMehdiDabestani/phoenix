import { useSelector, useDispatch } from "react-redux";
import { setLimit } from "@/redux/action/strategy/Actions";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Item } from "./item";
const items = [
  {
    value: "default",
    label: "جدید ترین",
  },
  {
    value: "time",
    label: "زمان",
  },
];
export const Limit = () => {
  const { timeFrame, limit } = useSelector((state) => state.strategy);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setLimit(e.target.value));
  };
  return (
    <Grid item xl={6} lg={6} md={10} sm={12} xs={12} sx={{ margin: "0 auto" }}>
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "row",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "stretch",
          },
        })}
      >
        <Typography
          variant="h6"
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              marginBottom: "15px",
            },
          })}
        >
          نمایش دادن سیگنال بر اساس :
        </Typography>
        <FormControl variant="filled" sx={{ flexGrow: "0.7" }}>
          <InputLabel>محدودیت</InputLabel>
          <Select onChange={handleChange} value={limit.type}>
            {items.map((el, idx) => (
              <MenuItem value={el.value} key={idx}>
                {el.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {limit.type === "time" && (
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          <Item timeFrame={timeFrame} />
        </Grid>
      )}
    </Grid>
  );
};
