import * as type from "./Types";

export const updateTimeFrame = (state) => {
  return {
    type: type.UPDATE_TIME_FRAME,
    payload: state,
  };
};

export const strategyBuilt = (state) => {
  return {
    type: type.STRATEGY_BUILT,
    payload: state,
  };
};
export const updateParameters = (state) => {
  return {
    type: type.UPDATE_PARAMETERS,
    payload: state,
  };
};
export const setIndicator = (state) => {
  return {
    type: type.SET_INDICATOR,
    payload: state,
  };
};
export const updateCrossSide = (state) => {
  return {
    type: type.UPDATE_CROSS_SIDE,
    payload: state,
  };
};
export const updateCrossOffset = (state) => {
  return {
    type: type.UPDATE_CROSS_OFFSET,
    payload: state,
  };
};
export const toggleCrossStatus = (state) => {
  return {
    type: type.TOGGLE_CROSS_STATUS,
    payload: state,
  };
};
export const toggleBreakeStatus = (state) => {
  return {
    type: type.TOGGLE_BREAKE_STATUS,
    payload: state,
  };
};

export const updateBreakingLine = (state) => {
  return {
    type: type.UPDATE_BREAKE_CROSSING_LINE,
    payload: state,
  };
};

export const updateCrossingLine = (state) => {
  return {
    type: type.UPDATE_CROSS_CROSSING_LINE,
    payload: state,
  };
};

export const updateBreakeOffset = (state) => {
  return {
    type: type.UPDATE_BREAKE_OFFSET,
    payload: state,
  };
};
export const updateBreakeSide = (state) => {
  return {
    type: type.UPDATE_BREAKE_SIDE,
    payload: state,
  };
};
export const updateBreakeType = (state) => {
  return {
    type: type.UPDATE_BREAKE_TYPE,
    payload: state,
  };
};
export const updateBreakeValue = (state) => {
  return {
    type: type.UPDATE_BREAKE_VALUE,
    payload: state,
  };
};

export const setCombineIndicatorId = (state) => {
  return {
    type: type.SET_COMBINE_INDICATOR_ID,
    payload: state,
  };
};
export const setCombineIndicator = (state) => {
  return {
    type: type.SET_COMBINE_INDICATOR,
    payload: state,
  };
};
export const updateCombineIndicatorSide = (state) => {
  return {
    type: type.UPDATE_COMBINE_INDICATOR_SIDE,
    payload: state,
  };
};
export const updateCombineIndicatorParameter = (state) => {
  return {
    type: type.UPDATE_COMBINE_INDICATOR_PARAMETER,
    payload: state,
  };
};
export const updateCombineIndicatorOffset = (state) => {
  return {
    type: type.UPDATE_COMBINE_INDICATOR_OFFSET,
    payload: state,
  };
};
export const builtCombineIndicator = (state) => {
  return {
    type: type.BUILT_COMBINE,
    payload: state,
  };
};
export const setLimit = (state) => {
  return {
    type: type.SET_LIMIT_TYPE,
    payload: state,
  };
};
export const setLimitValue = (state) => {
  return {
    type: type.SET_LIMIT_VALUE,
    payload: state,
  };
};
export const setSettings = (state) => {
  return {
    type: type.SET_SETTINGS,
    payload: state,
  };
};
export const cleanUpState = () => {
  return {
    type: type.CLEAN_UP,
  };
};
export const updateChartType = (state) => {
  return {
    type: type.UPDATE_CHART_TYPE,
    payload: state,
  };
};
