import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export const Loading = () => {
  const { show, isGlobal } = useSelector((state) => state.loading);
  console.log("isGlobal" , isGlobal);
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: isGlobal ? "fixed" : "absolute",
      }}
      open={show}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
