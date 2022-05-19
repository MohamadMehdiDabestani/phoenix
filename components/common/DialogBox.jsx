import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialog } from "../../redux/action/Actions";
import CloseIcon from "@mui/icons-material/Close";
export const DialogBox = ({ title, children, rest, closeIcon }) => {
  const open = useSelector((state) => state.dialog);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleDialog(false));
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      fullWidth={true}
      onClose={handleClose}
      {...rest}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {title} {closeIcon && <CloseIcon fontSize="large"/>}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
