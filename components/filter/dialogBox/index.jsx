import * as yup from "yup";
import { useFormik } from "formik";
import ListIcon from "@mui/icons-material/List";
import { InputForm } from "@/components";
import { CurrencyExchangeOutlined } from "@mui/icons-material";
import { DialogBox } from "@/components/common/DialogBox";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleDialog } from "@/redux/action/Actions";
import useLocalStorage from "@/hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
const items = [
  {
    label: "نام لیست",
    icon: <ListIcon />,
    id: "listName",
    type: "text",
  },
  {
    label: "ارز ها",
    icon: <CurrencyExchangeOutlined />,
    id: "value",
    type: "text",
  },
];
export const FilterDialogBox = () => {
  const [coins, setCoin] = useLocalStorage("coins", {});
  const dispatch = useDispatch();
  const validationHandler = yup.object({
    listName: yup.string().required("نام لیست را وارد کنید"),
    value: yup.string().required("ارزی را وارد کنید"),
  });
  const formik = useFormik({
    initialValues: {
      listName: "",
      value: "",
    },
    validationSchema: validationHandler,
    onSubmit: (value) => {
      dispatch(toggleDialog(false));
      coins[uuidv4()] = {
        value: value.value,
        label: value.listName,
      };
      setCoin(coins);
    },
  });
  return (
    <DialogBox title="افزودن لیست ">
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
        <br />
        <Button variant="contained" sx={{ marginRight: "15px" }} type="submit">
          ذخیره
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(toggleDialog(false))}
        >
          لغو
        </Button>
      </form>
    </DialogBox>
  );
};
