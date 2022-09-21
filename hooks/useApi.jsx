import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleSnackBar } from "../redux/action/Actions";
export const useApi = ({ baseUrl }) => {
  const dispatch = useDispatch();
  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  });

  const showSnack = (message, severity = "error", variant = "standard") => {
    dispatch(
      toggleSnackBar({
        message,
        variant,
        severity,
        show: true,
      })
    );
  };
  const get = (request) => {
    return api.get(request);
  };
  const getHandeled = (request, callback, fn) => {
    api
      .get(request)
      .then(({ data }) => {
        if (data.success) {
          callback(data);
        } else {
          showSnack(data.text);
        }
      })
      .finally(fn())
      .catch(() => {
        showSnack("مشکی پیش آمده مجدد تلاش کنید");
      });
  };
  const postHandeled = (request, data, callback, fn) => {
    api
      .post(request, data)
      .then(({ data }) => {
        console.log("data", data);
        if (data.success) {
          callback(data);
        } else {
          if (data.isValidation) {
            showSnack(data.err[0].message);
          } else {
            showSnack("مشکی پیش آمده مجدد تلاش کنید");
          }
        }
      })
      .catch(({response}) => {
        console.log("response", response);

        if (response.data.isValidation) {
          showSnack(response.data.err[0].message);
        } else {
          showSnack("مشکی پیش آمده مجدد تلاش کنید");
        }
      })
      .finally(() => fn && fn());
  };
  return { get, getHandeled, postHandeled };
};
