import { Paper} from "@mui/material";
import { Fragment } from "react";
import { useSelector } from "react-redux";
// import Link from "next/link";
// import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Submit } from "./submit";
import { CombineForm } from "./CombineForm";
import { Text } from "./text";
export const BuiltIndicator = () => {
  const state = useSelector((state) => state.strategy);

  if (state.indicators.filter((el) => el.completed === true).length === 0)
    return <Fragment></Fragment>;
  return (
    <Paper
      sx={{
        marginTop: "20px",
        padding: "20px",
      }}
    >
      <CombineForm />
      <Text timeFrame={state.timeFrame} />
      <Submit />
      {/* <Alert
        icon={<ProductionQuantityLimitsIcon />}
        sx={{
          a: { color: "rgb(30, 58, 102)", fontWeight: "bold" },
          marginTop: "20px",
        }}
        severity="error"
      >
        <Typography variant="body2">
          شما توانایی تنظیم بیش از 1 اندیکاتور در یک استراتژی را ندارید . در
          صورت نیاز می توانید اقدام به خرید <Link href="/plane">پلن</Link> کنید
        </Typography>
      </Alert> */}
    </Paper>
  );
};
