import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material"


export const MultipleSelect = ({change , value , values , restSelect}) => {
  return (
    <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel>تایم فریم</InputLabel>
        <Select
          onChange={change}
          renderValue={(selected) => selected.join(", ")}
          value={value}
          multiple
          {...restSelect}
        >
          {values.map((el, idx) => (
            <MenuItem value={el} key={idx}>
              <Checkbox checked={value.indexOf(el) > -1} />
              <ListItemText primary={el} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  )
}

