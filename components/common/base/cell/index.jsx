import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";

export const CellRes = (props) => {
  return (
    <Typography>
      {props.row.base?.base_res_precent
        ? ` ${props.row.base.base_res_precent.toFixed(3)}%`
        : <CloseIcon color="error" />}
    </Typography>
  );
};

export const CellSup = (props) => {
  return (
    <Typography>
      {props.row.base?.base_sup_precent
        ? `${props.row.base.base_sup_precent.toFixed(3)}%`
        : <CloseIcon color="error" />}
    </Typography>
  );
};
