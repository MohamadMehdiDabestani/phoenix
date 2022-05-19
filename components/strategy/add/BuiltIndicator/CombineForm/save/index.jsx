import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useIndicator } from "@/hooks/useIndicator";
import { toggleDialog, toggleSnackBar } from "@/redux/action/Actions";
import { builtCombineIndicator } from "@/redux/action/strategy/Actions";

export const Save = () => {
  const dispatch = useDispatch();
  const {currentCombine } = useIndicator();
  const handleCloseDialog = () => {
    dispatch(toggleDialog(false));
  };
  const handleSave = () => {
    if (currentCombine.id === 0 || currentCombine.parametersCombine === null) {
      dispatch(
        toggleSnackBar({
          message: "اندیکاتوری انتخاب کنید",
          show: true,
          severity: "error",
        })
      );
    }else{
      dispatch(builtCombineIndicator());
    }
  };
  return (
    <Box sx={{ marginTop: "30px" }}>
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{
          paddingRight: "50px",
          paddingLeft: "50px",
        }}
      >
        ذخیره
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleCloseDialog}
        sx={{
          paddingRight: "50px",
          paddingLeft: "50px",
          marginLeft: "15px",
        }}
      >
        لغو
      </Button>
    </Box>
  );
};
