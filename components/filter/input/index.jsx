import useLocalStorage from "@/hooks/useLocalStorage";
import * as yup from "yup";
import { useFormik } from "formik";
import { CurrencyExchangeOutlined } from "@mui/icons-material";
import { InputForm } from "@/components/common/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { setCustomCoin } from "@/redux/action/panel/Actions";
import { Grid } from "@mui/material";

const items = [
  {
    label: "نام سکه",
    icon: <CurrencyExchangeOutlined />,
    id: "coin",
    type: "text",
  },
];
export const Input = () => {
  const [coins, setCoin] = useLocalStorage("coins", {});
  const { currentCoinList } = useSelector((state) => state.panel);
  const dispatch = useDispatch();
  const validationHandler = yup.object({
    coin: yup.string().required("نام سکه را وارد کنید"),
  });
  const formik = useFormik({
    initialValues: {
      coin: "",
    },
    validationSchema: validationHandler,
    onSubmit: (value) => {
      const newList = `${coins[currentCoinList].value},${value.coin}`;
      dispatch(setCustomCoin(newList));
      coins[currentCoinList].value = newList;
      setCoin(coins);
    },
  });
  return (
    <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
      <form onSubmit={formik.handleSubmit}>
        {items.map((el, idx) => (
          <InputForm
            {...el}
            sx={{ marginBottom: "15px", marginRight: "10px" }}
            value={formik.values[el.id]}
            error={formik.errors[el.id]}
            touched={formik.touched[el.id]}
            change={formik.handleChange}
            key={idx}
          />
        ))}
      </form>
    </Grid>
  );
};
