import * as type from "./Types";
export const setColumn = (state) => {
  return {
    type: type.SET_COLUMN,
    payload: state,
  };
};
export const setRow = (state) => {
  console.log("setRow", state);
  return {
    type: type.SET_ROW,
    payload: state,
  };
};
export const setCoins = (state) => {
  return {
    type: type.SET_COINS,
    payload: state,
  };
};
export const setSelectedCoin = (state) => {
  return {
    type: type.SELECTED_COIN,
    payload: state,
  };
};
export const setFilterCoin = (state) => {
  return {
    type: type.FILTER_COIN,
    payload: state,
  };
};
export const setCustomCoin = (state) => {
  return {
    type: type.SET_CUSTOM_COIN,
    payload: state,
  };
};
export const removeCustomCoin = (state) => {
  return {
    type: type.REMOVE_CUSTOM_COIN,
    payload: state,
  };
};
export const setCoinFilterList = (state) => {
  return {
    type: type.SET_COIN_FILTER_LIST,
    payload: state,
  };
};
export const cleanFilterCoin = () => {
  return {
    type: type.CLEAN_FILTER_COIN,
  };
};
export const cleanFilterCoinList = () => {
  return {
    type: type.CLEAN_FILTER_COIN_LIST,
  };
};
export const cleanRowPanel = () => {
  return {
    type: type.CLEAN_ROW_PANEL,
  };
};
