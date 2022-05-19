import * as type from "./Types";

export const toggleMenuDashboard = (state) => {
  return {
    type: type.TOGGLE_MENU_DASHBOARD,
    payload: state,
  };
};

export const toggleSnackBar = (state) => {
  return {
    type: type.TOGGLE_SNACKBAR,
    payload: state,
  };
};

export const withoutLayout = (state) => {
  return {
    type: type.WITHOUT_LAYOUT,
    payload: state,
  };
};


export const toggleLoading = (state) => {
  return {
    type: type.TOGGLE_IS_LOADING,
    payload: state,
  };
};

export const toggleLanguage = (state) => {
  return {
    type: type.TOGGLE_LANGUAGE,
    payload: state,
  };
};
export const toggleDialog = (state) => {
  return {
    type: type.TOGGLE_DIALOG,
    payload: state,
  };
};
// STRATEGY ACTIONS
