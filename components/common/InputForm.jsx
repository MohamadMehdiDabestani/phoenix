import React from "react";
import { IconButton, InputAdornment, TextField  } from "@mui/material";

export const InputForm = (props) => {
  return (
    <TextField
      label={props.label}
      variant="filled"
      sx={props.sx}
      type={props.type}
      onChange={props.change}
      //   error={}
      error={props.touched && props.error}
      helperText={props.touched && props.error}
      value={props.value}
      id={props.id}
      name={props.id}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end">{props.icon}</IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
