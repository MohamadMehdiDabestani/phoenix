import produce from "immer";
import * as types from "@/redux/action/strategy/Types";

const strategyInitialState = {
  timeFrame: "1d",
  limit: {
    type: "default",
    value: [{ timeFrame: "1d", day: 0, hours: 0, minutes: 0 }],
  },
  chartType: "Candle Stick",
  indicators: [
    {
      id: 0,
      name: "",
      displayName: "",
      isEnableCross: false,
      isEnableBreake: false,
      isCross: false,
      isBreake: false,
      parameters: null,
      cross: {},
      breake: {},
      completed: false,
      isBinding: false,
      type: "",
      settings: [],
    },
  ],
  combine: [
    {
      id: 0,
      combinedIndicatorId: 0,
      side: "both",
      completed: false,
      offset: 0,
      parametersCombine: null,
      displayName: "",
      name: "",
    },
  ],
};

export const strategyReducer = (state = strategyInitialState, action) => {
  return produce(state, (draft) => {
    const currentIndicatorId = draft.indicators.findIndex(
      (el) => el.completed === false
    );
    const currentCombine = draft.combine.findIndex(
      (el) => el.completed === false
    );
    switch (action.type) {
      case types.STRATEGY_BUILT:
        draft.indicators[currentIndicatorId].completed = true;
        break;
      case types.UPDATE_PARAMETERS:
        draft.indicators[currentIndicatorId].parameters.find(
          (el) => el.name === action.payload.name
        ).value = action.payload.value;
        break;
      case types.SET_INDICATOR: {
        const indicator = draft.indicators.findIndex(
          (el) => el.completed === false
        );
        if (indicator < 0) {
          draft.indicators.push(action.payload);
        } else {
          draft.indicators[indicator] = action.payload;
        }
        break;
      }
      case types.UPDATE_TIME_FRAME:
        draft.timeFrame = action.payload;
        draft.limit.value = [
          {
            timeFrame: action.payload,
            day: 0,
            hours: 0,
            minutes: 0,
          },
        ];
        break;

      // CROSS ACTION START
      case types.UPDATE_CROSS_SIDE:
        draft.indicators[currentIndicatorId].cross.side = action.payload;
        break;
      case types.UPDATE_CROSS_OFFSET:
        draft.indicators[currentIndicatorId].cross.offset = action.payload;
        break;
      case types.TOGGLE_CROSS_STATUS:
        draft.indicators[currentIndicatorId].isEnableCross = action.payload;
        break;
      case types.UPDATE_CROSS_CROSSING_LINE: {
        const crossingLine = draft.indicators[
          currentIndicatorId
        ].parameters.find((el) => el.name === action.payload.name);
        if (action.payload.type === "crossing") {
          crossingLine.defaultCrossing = true;
          draft.indicators[currentIndicatorId].parameters
            .filter((el) => el.name !== action.payload.name)
            .map((el) => (el.defaultCrossing = false));
        } else {
          crossingLine.defaultCrossed = true;
          draft.indicators[currentIndicatorId].parameters
            .filter((el) => el.name !== action.payload.name)
            .map((el) => (el.defaultCrossed = false));
        }
        break;
      }
      // CROSS ACTION END
      // BREAKE ACTION START
      case types.TOGGLE_BREAKE_STATUS:
        draft.indicators[currentIndicatorId].isEnableBreake = action.payload;
        break;
      case types.UPDATE_BREAKE_CROSSING_LINE: {
        const line = draft.indicators[currentIndicatorId].parameters.find(
          (el) => el.name === action.payload
        );
        line.defaultBreaking = true;
        draft.indicators[currentIndicatorId].parameters
          .filter((el) => el.name !== action.payload)
          .map((el) => (el.defaultBreaking = false));
        break;
      }
      case types.UPDATE_BREAKE_OFFSET:
        draft.indicators[currentIndicatorId].breake.offset = action.payload;
        break;
      case types.UPDATE_BREAKE_SIDE:
        draft.indicators[currentIndicatorId].breake.side = action.payload;
        break;
      case types.UPDATE_BREAKE_TYPE:
        draft.indicators[currentIndicatorId].breake.type = action.payload;
        break;
      case types.UPDATE_BREAKE_VALUE: {
        const currentBreakeType =
          draft.indicators[currentIndicatorId].breake.type;
        if (currentBreakeType === "line") {
          draft.indicators[currentIndicatorId].breake.line = Number.parseFloat(
            action.payload.value
          );
        } else {
          draft.indicators[currentIndicatorId].breake.area = [
            action.payload.name === "start"
              ? Number.parseFloat(action.payload.value)
              : draft.indicators[currentIndicatorId].breake.area[0],
            action.payload.name === "end"
              ? Number.parseFloat(action.payload.value)
              : draft.indicators[currentIndicatorId].breake.area[1],
          ];
        }
        break;
      }
      // BREAKE ACTION END
      // COMBINE ACTION START
      case types.SET_COMBINE_INDICATOR_ID:
        if (currentCombine < 0) {
          draft.combine.push({
            id: draft.combine.find((el) => el.completed === true).id + 1,
            combinedIndicatorId: action.payload.combinedIndicatorId,
            side: "both",
            completed: false,
            offset: 0,
            parametersCombine: null,
            name: action.payload.name,
            displayName: action.payload.displayName,
          });
        } else {
          draft.combine[currentCombine].combinedIndicatorId =
            action.payload.combinedIndicatorId;
          draft.combine[currentCombine].name = action.payload.name;
          draft.combine[currentCombine].displayName =
            action.payload.displayName;
        }
        break;
      case types.BUILT_COMBINE:
        draft.combine[currentCombine].completed = true;
        break;
      case types.UPDATE_COMBINE_INDICATOR_SIDE:
        draft.combine[currentCombine].side = action.payload;
        break;
      case types.UPDATE_COMBINE_INDICATOR_OFFSET:
        draft.combine[currentCombine].offset = action.payload;
        break;
      case types.SET_COMBINE_INDICATOR: {
        const existing = draft.combine.find((el) => el.completed === true);
        draft.combine[currentCombine].parametersCombine =
          action.payload.parameters;
        draft.combine[currentCombine].name = action.payload.name;
        draft.combine[currentCombine].displayName = action.payload.displayName;
        if (typeof existing === "undefined") {
          draft.combine[currentCombine].id = 1;
        } else {
          draft.combine[currentCombine].id = existing.id + 1;
        }
        break;
      }
      case types.UPDATE_COMBINE_INDICATOR_PARAMETER:
        draft.combine[currentCombine].parametersCombine.find(
          (el) => el.name === action.payload.name
        ).value = action.payload.value;
        break;
      // COMBINE ACTION END

      // LIMIT ACTION START
      case types.SET_LIMIT_TYPE:
        draft.limit.type = action.payload;
        break;
      case types.SET_LIMIT_VALUE: {
        const limitValueIndex = draft.limit.value.findIndex(
          (el) => el.timeFrame === action.payload.timeFrame
        );
        draft.limit.value[limitValueIndex][action.payload.type] =
          action.payload.value;
        break;
      }

      // SETTINGS ACTION START
      case types.SET_SETTINGS:
        draft.indicators[currentIndicatorId].settings.find(
          (e) => e.name === action.payload.name
        ).value = action.payload.value;
        break;
      // SETTINGS ACTION END
      case types.UPDATE_CHART_TYPE:
        draft.chartType = action.payload;
        break;
      case types.CLEAN_UP:
        draft = strategyInitialState;
        break;
      default:
        return state;
    }
  });
};
