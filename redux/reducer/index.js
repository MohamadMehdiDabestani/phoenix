import { combineReducers } from "redux";
import * as types from "../action/Types";
import { botReducer } from "./bot";
import { panelReducer } from "./panel";
import { strategyReducer } from "./strategy";
const menuDashboardReducer = (state = true, action) => {
  switch (action.type) {
    case types.TOGGLE_MENU_DASHBOARD:
      return action.payload;
    default:
      return state;
  }
};
const withoutLayoutReducer = (state = false, action) => {
  switch (action.type) {
    case types.WITHOUT_LAYOUT:
      return action.payload;
    default:
      return state;
  }
};
const dialogReducer = (state = false, action) => {
  switch (action.type) {
    case types.TOGGLE_DIALOG:
      return action.payload;
    default:
      return state;
  }
};
const initialStateToggleSnackBar = {
  severity: "success",
  variant: "standard",
  message: "",
  show: false,
};
const toggleSnackBarReducer = (state = initialStateToggleSnackBar, action) => {
  switch (action.type) {
    case types.TOGGLE_SNACKBAR:
      return action.payload;
    default:
      return state;
  }
};

const loadingInitialState = {
  show: false,
  isGlobal: false,
};
const loadingReducer = (state = loadingInitialState, action) => {
  switch (action.type) {
    case types.TOGGLE_IS_LOADING:
      return action.payload;
    default:
      return state;
  }
};
const languageReducer = (state = "fn", action) => {
  switch (action.type) {
    case types.TOGGLE_LANGUAGE:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  menuDashboard: menuDashboardReducer,
  toggleSnackBar: toggleSnackBarReducer,
  withoutLayout: withoutLayoutReducer,
  loading: loadingReducer,
  dialog: dialogReducer,
  strategy: strategyReducer,
  panel: panelReducer,
  bot : botReducer,
  language: languageReducer,
});
export default rootReducer;
