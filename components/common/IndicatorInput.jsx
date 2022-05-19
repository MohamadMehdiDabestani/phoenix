import { TextField } from "@mui/material";
export const IndicatorInput = ({ value, name, label, change, rest }) => {
  return (
    <TextField
      type="number"
      name={name}
      value={value}
      fullWidth
      label={label}
      {...rest}
      variant="filled"
      onChange={change}
    />
  );
};
