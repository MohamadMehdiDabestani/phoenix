import Link from "next/link";
import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { grey } from "@mui/material/colors";
export const HomeIconTopLeft = (props) => {
  return (
    <Link href="/">
      <Box
        sx={(theme) => ({
          cursor: "pointer",
          position: "fixed",
          top: "5%",
          right: props.left ? "5%" : "unset",
          left: props.right ? "5%" : "unset",

          backgroundColor: theme.palette.primary.main,
          boxShadow: theme.shadows[20],
          borderRadius: "5px",
          padding: "15px",
          paddingBottom: "8px",
        })}
      >
        <HomeIcon sx={{ color: grey[100] }} />
      </Box>
    </Link>
  );
};
