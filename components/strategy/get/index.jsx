import { Button, Paper } from "@mui/material";
import Link from "next/link";
export const StrategyComponent = () => {
  return (
    <Paper sx={{ padding: "20px", position: "relative" }}>
      <Link href="/strategy/add">
        <Button sx={{ display: "block" }} variant="contained">
          تعریف استراتژی
        </Button>
      </Link>
    </Paper>
  );
};
