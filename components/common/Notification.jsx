import { Alert, Snackbar } from "@mui/material";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSnackBar } from "../../redux/action/Actions";
export const Notification = () => {
  const dispatch = useDispatch();
  const { severity, variant, message, show } = useSelector(
    (state) => state.toggleSnackBar
  );
  const handle = () => {
    dispatch(toggleSnackBar(false));
  };
  if (!show) return <Fragment></Fragment>;
  return (
    <Snackbar
      open={show}
      onClose={handle}
      autoHideDuration={4000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert severity={severity} variant={variant}>
        {message}
      </Alert>
    </Snackbar>
  );
};
