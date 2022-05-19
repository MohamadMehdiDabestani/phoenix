import { FormControlLabel, FormLabel, Radio } from "@mui/material";
import Group from "@mui/material/RadioGroup";
import { Fragment } from "react";

export const RadioGroup = ({ display, list, change, defaultValue , rest}) => {
  return (
    <Fragment>
      <FormLabel>{display}</FormLabel>
      <Group row onChange={change} value={defaultValue} sx={{flexDirection:"column"}} {...rest}>
        {list.map((el, idx) => (
          <FormControlLabel
            key={idx}
            value={el.value}
            control={<Radio />}
            label={el.label}
          />
        ))}
      </Group>
    </Fragment>
  );
};
