import { InputForm, Loading } from "@/components";
import * as yup from "yup";
import ccxt from "ccxt";
import { DialogBox } from "@/components";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import KeyIcon from "@mui/icons-material/Key";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "@/redux/action/Actions";
import { Box, Button } from "@mui/material";
import { useApi } from "@/hooks/useApi";
const items = [];
export const EditeProfileDialogBox = ({ url }) => {
  const { postHandeled } = useApi({ base: url });
  const dispatch = useDispatch();
  const { show } = useSelector((state) => state.loading);
  const open = useSelector((state) => state.dialog);
  const cookie = getCookie("exchange");
  const [exchange, setExchange] = useState(cookie);
  const [formSchema, setFormSchema] = useState({});
  useEffect(() => {
    if (!open) {
      setFormSchema({});
      // dispatch(toggleLoading({ show: true, isGlobal: false }));
    }
  }, [open]);
  useEffect(() => {
    if (!cookie) return;
    dispatch(toggleLoading({ show: true, isGlobal: false }));
    setExchange(cookie);

    const exchangeObj = new ccxt[cookie]();
    const objs = {};
    Object.keys(exchangeObj.requiredCredentials).map((e) => {
      if (exchangeObj.requiredCredentials[e] === true) {
        objs[e] = yup.string().required(`لطفا ${e} را وارد کنید`);
        items.push({
          label: e,
          icon: <KeyIcon />,
          id: e,
          type: "text",
        });
      }
    });
    setFormSchema(objs);
    dispatch(toggleLoading({ show: false, isGlobal: false }));
  }, [cookie]);
  const validationHandler = yup.object(formSchema);
  const formik = useFormik({
    initialValues: {},
    validationSchema: validationHandler,
    onSubmit: (values) => {
      postHandeled("/api/user/verifyExchange", { exchange, auth: values });
    },
  });
  console.log("formik", formik);
  return (
    <DialogBox title={`احراز هویت صرافی ${exchange}`}>
      <Box
        sx={{
          position: "relative",
        }}
      >
        {show ? (
          <Loading />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            {items.map((el, idx) => (
              <InputForm
                {...el}
                sx={{ width: "100%", marginBottom: "20px" }}
                value={formik.values[el.id]}
                error={formik.errors[el.id]}
                touched={formik.touched[el.id]}
                change={formik.handleChange}
                key={idx}
              />
            ))}
            <Button variant="contained" type="submit">
              بررسی
            </Button>
          </form>
        )}
      </Box>
    </DialogBox>
  );
};
