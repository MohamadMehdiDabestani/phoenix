import * as type from "./Types";
export const botUpdateTimeFrame = (state) => {
  return {
    type: type.UPDATE_BOT_TIMEFRAME,
    payload: state,
  };
};
export const updateBotStrategy = (state) => {
  return {
    type: type.UPDATE_BOT_STRATEGY,
    payload: state,
  };
};
export const updatePerecentage = (state) => {
  return {
    type: type.UPDATE_PERECENTAGE,
    payload: state,
  };
};
export const updateBotStrategyParameter = (state) => {
  return {
    type: type.UPDATE_PARAMETER,
    payload: state,
  };
};
export const updateReward = (state) => {
  return {
    type: type.UPDATE_REWARD,
    payload: state,
  };
};
export const updateStopLoss = (state) => {
  return {
    type: type.UPDATE_STOPLOSS,
    payload: state,
  };
};
export const updateOrderManagment = (state) => {
  return {
    type: type.UPDATE_ORDER_MANAGMENT,
    payload: state,
  };
};
export const updateChartType = (state) => {
  return {
    type: type.UPDATE_CHART_TYPE,
    payload: state,
  };
};

export const updateMarket = (state) => {
  return {
    type: type.UPDATE_MARKET,
    payload: state,
  };
};
export const toggleCheckBtc = (state) => {
  return {
    type: type.TOGGLE_CHECK_BTC,
    payload: state,
  };
};
export const updateOrderType = (state) => {
  return {
    type: type.UPDATE_ORDER_TYPE,
    payload: state,
  };
};
export const toggleAdxFilter = (state) => {
  return {
    type: type.TOGGLE_ADX_FILTER,
    payload: state,
  };
};
export const updateBotList = (state) => {
  return {
    type: type.UPDATE_BOT_LIST,
    payload: state,
  };
};
export const removeItemBotkList = (state) => {
  return {
    type: type.REMOVE_ITEM_BOT_LIST,
    payload: state,
  };
};
export const updateLeverage = (state) => {
  return {
    type: type.UPDATE_LEVERAGE,
    payload: state,
  };
};
export const updateListType = (state) => {
  return {
    type: type.UPDATE_LIST_TYPE,
    payload: state,
  };
};
export const toggleStatus = (state) => {
  return {
    type: type.TOGGLE_STATUS,
    payload: state,
  };
};
