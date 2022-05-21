import produce from "immer";
import * as types from "@/redux/action/bot/Types";

const initialState = {
  current: false,
  chartType: "Heikin Ashi",
  orderType: "Limit Order",
  adxFilter: true,
  listTypes: [
    {
      name: "blackList",
      label: "لیست سیاه",
      isActive: true,
    },
    {
      name: "whiteList",
      label: "لیست سفید",
      isActive: false,
    },
  ],
  checkBtc: true,
  market: "Spot",
  filterCoin: [],
  leverage: 5,
  orderManagment: [
    {
      name: "freeRisk",
      label: "ذخیره ی سود در اولین حدف",
      isActive: true,
    },
    {
      name: "closingHard",
      label: "بستن کل معامله در اولین حدف",
      isActive: false,
    },
    {
      name: "off",
      label: "غیر فعال",
      isActive: false,
    },
  ],
  reward: {
    name: "reward",
    value: 2,
    label: "نسبت سود/ضرر",
  },
  precentage: {
    name: "precentage",
    value: 10,
    label: "درصد سرمایه در هر معامله",
  },
  strategy: {
    stopOptions: [
      {
        name: "",
        label: "",
        isActive: false,
      },
    ],
    id: 0,
    name: "",
    displayName: "",
    parameters: [
      {
        name: "",
        value: 0,
        label: "",
      },
    ],
  },
  timeFrame: "1h",
};
export const botReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case types.UPDATE_BOT_TIMEFRAME: {
        draft.timeFrame = action.payload;
        break;
      }
      case types.UPDATE_BOT_STRATEGY: {
        draft.strategy = action.payload;
        draft.current = true;
        break;
      }
      case types.UPDATE_ORDER_MANAGMENT:
        draft.orderManagment.find(
          (e) => e.name === action.payload
        ).isActive = true;
        draft.orderManagment.find(
          (e) => e.name !== action.payload
        ).isActive = false;
        break;
      case types.UPDATE_PARAMETER:
        draft.strategy.parameters.find(
          (el) => el.name === action.payload.name
        ).value = action.payload.value;
        break;
      case types.UPDATE_REWARD:
        draft.reward.value = action.payload;
        break;
      case types.UPDATE_LIST_TYPE:
        draft.listTypes.find((e) => e.name === action.payload).isActive = true;
        draft.listTypes.find((e) => e.name !== action.payload).isActive = false;
        break;
      case types.UPDATE_PERECENTAGE:
        draft.precentage.value = action.payload;
        break;
      case types.UPDATE_CHART_TYPE:
        draft.chartType = action.payload;
        break;
      case types.UPDATE_MARKET:
        draft.market = action.payload;
        break;
      case types.TOGGLE_CHECK_BTC:
        draft.checkBtc = action.payload;
        break;
      case types.TOGGLE_ADX_FILTER:
        draft.adxFilter = action.payload;
        break;
      case types.UPDATE_ORDER_TYPE:
        draft.orderType = action.payload;
        break;
      case types.UPDATE_STOPLOSS:
        draft.strategy.stopOptions.find(
          (e) => e.name === action.payload
        ).isActive = true;
        draft.strategy.stopOptions.find(
          (e) => e.name !== action.payload
        ).isActive = false;
        break;
      case types.UPDATE_BOT_LIST: {
        const existing = draft.filterCoin.find((e) => e === action.payload);
        if (!existing) draft.filterCoin.push(action.payload.toUpperCase());
        break;
      }
      case types.UPDATE_LEVERAGE:
        draft.leverage = action.payload;
        break;
      case types.REMOVE_ITEM_BOT_LIST: {
        const existing = draft.filterCoin.find((e) => e === action.payload);
        if (existing)
          draft.filterCoin = draft.filterCoin.filter(
            (e) => e !== action.payload
          );
        break;
      }
      default: {
        return state;
      }
    }
  });
};
