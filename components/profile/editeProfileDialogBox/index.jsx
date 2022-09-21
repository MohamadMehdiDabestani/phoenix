import { InputForm, Loading } from "@/components";
import * as yup from "yup";
import ccxt from "ccxt";
import { DialogBox } from "@/components";
import { getCookie } from "cookies-next";
import { Fragment, useEffect, useState } from "react";
import KeyIcon from "@mui/icons-material/Key";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialog, toggleLoading, toggleSnackBar } from "@/redux/action/Actions";
import { Box, Button } from "@mui/material";
import { useApi } from "@/hooks/useApi";

export const EditeProfileDialogBox = ({ url }) => {
  const { postHandeled } = useApi({ base: url });
  const dispatch = useDispatch();
  const { show } = useSelector((state) => state.loading);
  const open = useSelector((state) => state.dialog);
  const cookie = getCookie("exchange");
  const [formSchema, setFormSchema] = useState({});
  const [items, setItems] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  useEffect(() => {
    if (!open) {
      setFormSchema({});
      console.log("formSchema");
      // dispatch(toggleLoading({ show: true, isGlobal: false }));
    }
  }, [open]);
  useEffect(() => {
    if (!cookie) return;
    dispatch(toggleLoading({ show: true, isGlobal: false }));

    const exchangeObj = new ccxt[cookie]();
    const objs = {};
    const list = [];
    const initValues = {};
    Object.keys(exchangeObj.requiredCredentials).map((e) => {
      if (exchangeObj.requiredCredentials[e] === true) {
        objs[e] = yup.string().required(`لطفا ${e} را وارد کنید`);
        list.push({
          label: e,
          icon: <KeyIcon />,
          id: e,
          type: "password",
        });
        initValues[e] = "";
      }
    });
    setInitialValues(initValues);
    setItems(list);
    setFormSchema(yup.object(objs));
    dispatch(toggleLoading({ show: false, isGlobal: false }));
  }, [cookie]);
  return (
    <DialogBox title={`احراز هویت صرافی ${cookie}`}>
      <Box
        sx={{
          position: "relative",
        }}
      >
        {show ? (
          <Loading />
        ) : (
          <Fragment>
            <Formik
              initialValues={initialValues}
              validationSchema={formSchema}
              onSubmit={(values) => {
                postHandeled(
                  "/api/user/verifyExchange",
                  {
                    auth: values,
                    exchange: cookie,
                  },
                  () => {
                    dispatch(
                      toggleSnackBar({
                        message: "احراز هویت انجام شد",
                        show: true,
                      })
                    );
                    dispatch(toggleDialog(false))
                  }
                );
                
              }}
            >
              {({ errors, touched, values, handleChange }) => (
                <Form>
                  {items.map((el, idx) => (
                    <InputForm
                      {...el}
                      sx={{ width: "100%", marginBottom: "20px" }}
                      value={values[el.id]}
                      error={errors[el.id]}
                      touched={touched[el.id]}
                      change={handleChange}
                      key={idx}
                    />
                  ))}

                  <Button variant="contained" type="submit">
                    بررسی
                  </Button>
                </Form>
              )}
            </Formik>
          </Fragment>
        )}
      </Box>
    </DialogBox>
  );
};
