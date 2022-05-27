import { withoutLayout } from "@/redux/action/Actions";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Custom404 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(withoutLayout(true));
    return function cleanUp() {
      dispatch(withoutLayout(false));
    };
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: " column",
        alignItems: " center",
        height: "100%",
        justifyContent: " space-around",
        "& >span> img": {
          width: "60% !important",
          height: "100% !important",
          position: "unset !important",
        },
        "& >span": {
          position: "unset !important",
          width: "100% !important",
          height: "80% !important",
        },
      }}
    >
      <Image
        layout="fill"
        className="img"
        src="/image/undraw_page_not_found_re_e9o6.svg"
        alt="Notfound page"
      />          
      <Typography variant="h6" component="p">
          صفه ی مورد نظر یافت نشد
      </Typography>
      <Link href="/">
        <Button variant="contained">باز گشت به خانه</Button>
      </Link>
    </Box>
  );
};
export default Custom404;
