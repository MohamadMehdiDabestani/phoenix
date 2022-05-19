import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { toggleSnackBar } from "@/redux/action/Actions";
import useLocalStorage from "@/hooks/useLocalStorage";
export const Submit = () => {
  const strategy = useSelector((state) => state.strategy);
  const [_, setValue] = useLocalStorage("strategy"); // eslint-disable-line

  const dispatch = useDispatch();
  const handleClick = () => {
    setValue(strategy);
    dispatch(toggleSnackBar({ show: true, message: "تنظیمات ذخیره شد." }));
    Router.push("/panel");
    // postHandeled("/api/strategy/save", { strategy }, () => {
    // });
  };
  return (
    <Button
      color="success"
      variant="contained"
      onClick={handleClick}
      sx={{
        marginTop: "20px",
        color: "white",
      }}
    >
      ارسال
    </Button>
  );
};
