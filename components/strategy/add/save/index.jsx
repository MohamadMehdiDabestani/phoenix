import { Button } from "@mui/material";
import { strategyBuilt } from "@/redux/action/strategy/Actions";
import { useDispatch } from "react-redux";
export const Save = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(strategyBuilt());
    
  };
  return (
    <Button
      variant="contained"
      sx={{ marginTop: "20px" }}
      onClick={handleClick}
    >
      ذخیره
    </Button>
  );
};
