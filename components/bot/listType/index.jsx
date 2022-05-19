import { updateListType } from "@/redux/action/bot/Actions";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export const ListType = () => {
  const dispatch = useDispatch();
  const { listTypes } = useSelector((state) => state.bot);
  const handleChange = (e) => {
    dispatch(updateListType(e.target.value));
  };
  return (
    <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel>لیست</InputLabel>
        <Select
          onChange={handleChange}
          value={listTypes.find((e) => e.isActive).name}
        >
          {listTypes.map((e, idx) => (
            <MenuItem value={e.name} key={idx}>
              {e.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
