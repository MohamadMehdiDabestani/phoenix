import * as yup from "yup";
import { useFormik } from "formik";

import { InputForm } from "@/components/common/InputForm";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { updateBotList } from "@/redux/action/bot/Actions";

const items = [
  {
    label: "فیلتر کوین ها",
    id: "coin",
    type: "text",
  },
];
export const BlackListInput = () => {
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
      dispatch(updateBotList(value.coin));
    },
  });
  return (
    <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
      <form onSubmit={formik.handleSubmit}>
        {items.map((el, idx) => (
          <InputForm
            {...el}
            sx={{ width: "100%" }}
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
