import { toggleSnackBar } from "@/redux/action/Actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
const useLocalStorage = (key, initialValue) => {
  const dispatch = useDispatch();
  const showSnack = () => {
    dispatch(
      toggleSnackBar({
        message: "مشکلی پیش آمده لطفا کنسول خود را بررسی کنید",
        variant: "standard",
        severity: "error",
        show: true,
      })
    );
  };
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      showSnack();
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      showSnack();
      console.log(error);
    }
  };
  return [storedValue, setValue];
};
export default useLocalStorage;
