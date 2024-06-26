import { Supports } from "./components/common/Supports";
import { SandRColumn } from "./components/common/Supports/column";
import { Bbands } from "./components/common/bbands";
import { BbandsColumn } from "./components/common/bbands/column";
import { EmaColumns } from "./components/common/ema/column";
import { TrendLineColumn } from "./components/common/trendline/column";
import { EmaComponent } from "./components/common/ema";
import { SuperTrendColumn } from "./components/common/supertrend/columns";
import { SsfColumn } from "./components/common/ssf/columns";
import { BbandTsi } from "./components/common/builtStrategy/bbandTsi/columns";
import { ThreeSuperTrend } from "./components/common/builtStrategy/threeSupertrend/columns";
import { ThreeEma } from "./components/common/builtStrategy/threeEma/columns";
import { DMI_OBV } from "./components/common/builtStrategy/DMI_OBV/columns";
import { DMI } from "./components/common/DMI/columns";
import { VwapComponent } from "./components/common/vwap";
import { Base } from "./components/common/base";
import { VwapColumns } from "./components/common/vwap/column";
import { Volume } from "./components/common/volume/columns";
import { VWAP_DMI } from "./components/common/builtStrategy/VWAP_DMI/columns";
import { BaseColumn } from "./components/common/base/column";

export const indicators = [
  {
    id: 23,
    name: "volume",
    type: "",
    displayName: "حجم",
    isBinding: false,
    isCross: false,
    isBreake: false,
    isEnableCross: false,
    isEnableBreake: false,
    parameters: [],
    settingsFunc: (strategy) => Volume(strategy),
    settings: true,
  },
  {
    id: 1,
    name: "macd",
    type: "",
    displayName: "مکدی",
    isBinding: false,
    isCross: true,
    isBreake: true,
    isEnableCross: true,
    isEnableBreake: true,
    breake: {
      type: "line",
      line: 0,
      area: [30, 35],
      offset: 0,
      side: "upwards",
    },
    cross: {
      side: "upwards",
      offset: 0,
    },
    parameters: [
      {
        value: 12,
        defaultCrossing: true,
        defaultBreaking: true,
        defaultCrossed: false,
        cross: true,
        breake: true,
        label: "خط سریع",
        name: "MACD",
      },
      {
        value: 26,
        defaultCrossing: false,
        defaultBreaking: false,
        defaultCrossed: true,
        breake: true,
        cross: true,
        label: "خط کند",
        name: "MACDs",
      },
      {
        value: 9,
        defaultCrossing: false,
        defaultBreaking: false,
        defaultCrossed: false,
        breake: false,
        cross: false,
        label: "سیگنال",
        name: "signal",
      },
    ],
  },
  {
    id: 2,
    name: "rsi",
    isBinding: true,
    type: "",
    displayName: "ار اس ای",
    isBreake: true,
    isEnableBreake: true,
    isEnableCross: false,
    isCross: false,
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
    breake: {
      type: "area",
      area: [30, 35],
      line: 30,
      offset: 0,
      side: "upwards",
    },
    parameters: [
      {
        name: "length",
        value: 14,
        label: "خط ار اس ای",
        defaultBreaking: true,
        breake: true,
      },
    ],
  },
  {
    id: 3,
    isBinding: false,
    name: "bbands",
    type: "",
    displayName: "بولینگر باند",
    isCross: false,
    isBreake: false,
    isEnableBreake: false,
    isEnableCross: false,
    component: <Bbands />,
    settingsFunc: (strategy) => BbandsColumn(strategy),
    settings: [
      {
        name: "sensitivity",
        value: 0.7,
        label: "حساسیت بولینجر",
      },
    ],
    parameters: [
      {
        name: "length",
        value: 20,
        label: "طول",
      },
    ],
  },
  {
    id: 5,
    type: "",
    name: "ichimoku",
    isBinding: false,
    displayName: "ایچی موکو",
    isBreake: false,
    isCross: true,
    isEnableCross: true,
    isEnableBreake: false,
    cross: {
      side: "upwards",
      offset: 0,
    },
    parameters: [
      {
        name: "senku",
        value: 52,
        label: "سنکو",
        defaultCrossing: false,
        defaultCrossed: false,
        cross: false,
      },
      {
        name: "ISA",
        value: 26,
        label: "Span A",
        defaultCrossing: true,
        defaultCrossed: false,
        cross: true,
        static: true,
      },
      {
        name: "ISB",
        value: 14,
        label: "Span B",
        defaultCrossing: false,
        defaultCrossed: true,
        cross: true,
        static: true,
      },
      {
        name: "ITS",
        value: 9,
        label: "تنکنسن",
        defaultCrossing: false,
        defaultCrossed: true,
        cross: true,
      },
      {
        name: "IKS",
        value: 26,
        label: "کی جن سن",
        defaultCrossing: true,
        defaultCrossed: true,
        cross: true,
      },
    ],
  },
  {
    type: "",
    id: 6,
    isBinding: false,
    name: "S&R",
    component: <Supports />,
    displayName: "حمایت و مقاومت",
    isBreake: false,
    isCross: false,
    isCustom: true,
    outside: true,
    settingsFunc: (strategy) => SandRColumn(strategy),
    settings: [
      {
        name: "precentage",
        value: 3,
        label: "فاصله ی قیمت تا محدوده (درصد)",
      },
      {
        name: "type",
        value: "default",
        label: "",
      },
      {
        name: "timeFrames",
        value: ["1d"],
        label: "تایم فریم",
      },
    ],
    parameters: [
      {
        name: "difficult",
        value: 3,
        label: "سختی",
      },
    ],
  },
  {
    id: 7,
    type: "moving",
    isBinding: true,
    component: <EmaComponent />,
    name: "EMA",
    displayName: "ای ام آی",
    isBreake: true,
    isCross: false,
    isEnableCross: false,
    isEnableBreake: true,
    settings: [
      {
        name: "precentageDifferent",
        value: 2,
        label: "درصد اختلاف با قیمت",
      },
    ],
    settingsFunc: (strategy) => EmaColumns(strategy),
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
    breake: {
      type: "line",
      line: 0,
      area: [0, 0],
      offset: 0,
      side: "upwards",
    },
    parameters: [
      {
        name: "length",
        value: 20,
        label: "طول",
      },
    ],
  },
  {
    id: 8,
    type: "",
    isBinding: false,
    name: "supertrend",
    displayName: "سوپر ترند",
    isBreake: false,
    isCross: false,
    isEnableCross: false,
    isEnableBreake: false,
    settings: true,
    settingsFunc: (strategy) => SuperTrendColumn(strategy),
    parameters: [
      {
        name: "length",
        value: 10,
        label: "ATR length",
      },
      {
        name: "factor",
        value: 3,
        label: "Factor",
      },
    ],
  },
  {
    type: "",
    id: 9,
    isBinding: false,
    name: "tsi",
    displayName: "تی اس ای",
    isBreake: true,
    isCross: true,
    isEnableBreake: true,
    isEnableCross: true,
    breake: {
      type: "line",
      line: 0,
      area: [30, 35],
      offset: 0,
      side: "upwards",
    },
    cross: {
      offset: 0,
      side: "upwards",
    },
    parameters: [
      {
        name: "TSI",
        value: 25,
        label: "بلند",
        defaultBreaking: true,
        breake: true,
        defaultCrossing: true,
        defaultCrossed: false,
        cross: true,
      },
      {
        name: "TSIs",
        value: 13,
        label: "کوتاه",
        defaultBreaking: false,
        breake: true,
        cross: true,
        defaultCrossing: false,
        defaultCrossed: true,
      },
      {
        name: "signal",
        value: 13,
        label: "سیگنال",
        defaultBreaking: false,
        breake: false,
        cross: false,
      },
    ],
  },
  {
    type: "",
    id: 10,
    isBinding: false,
    name: "trendline",
    displayName: "خط روند",
    isBreake: false,
    isCross: false,
    isCustom: true,
    both: true,
    settingsFunc: (strategy) => TrendLineColumn(strategy),
    settings: true,
    parameters: [],
  },
  {
    id: 11,
    type: "",
    isBinding: false,
    name: "cti",
    displayName: "سی تی ای",
    isBreake: true,
    isCross: false,
    isEnableCross: false,
    isEnableBreake: true,
    breake: {
      type: "line",
      line: 0.5,
      area: [0, 0],
      offset: 0,
      side: "upwards",
    },
    parameters: [
      {
        name: "length",
        value: 12,
        label: "طول",
      },
    ],
  },
  {
    id: 12,
    type: "",
    isBinding: false,
    name: "cci",
    displayName: "سی سی ای",
    isBreake: true,
    isCross: false,
    isEnableCross: false,
    isEnableBreake: true,
    breake: {
      type: "line",
      line: 0,
      area: [0, 0],
      offset: 0,
      side: "upwards",
    },
    parameters: [
      {
        name: "length",
        value: 20,
        label: "طول",
      },
    ],
  },
  {
    id: 14,
    type: "",
    isBinding: false,
    name: "ssf",
    component: <EmaComponent />,
    displayName: "اس اس اف",
    isBreake: true,
    isCross: false,
    isEnableCross: false,
    isEnableBreake: true,
    breake: {
      type: "line",
      line: 0,
      area: [0, 0],
      offset: 0,
      side: "upwards",
    },
    settings: [
      {
        name: "precentageDifferent",
        value: 2,
        label: "درصد اختلاف با قیمت",
      },
    ],
    settingsFunc: (strategy) => SsfColumn(strategy),
    parameters: [
      {
        name: "length",
        value: 21,
        label: "طول",
      },
      {
        name: "poles",
        value: 2,
        label: "قطب ها",
      },
    ],
  },
  {
    id: 15,
    name: "DMI",
    displayName: "دی ام ای",
    parameters: [
      {
        name: "length",
        value: 14,
        label: "طول",
      },
    ],
    type: "",
    isBinding: false,
    isBreake: false,
    isCross: false,
    settings: true,
    isEnableCross: true,
    settingsFunc: (strategy) => DMI(strategy),
  },
  {
    id: 16,
    type: "moving",
    isBinding: true,
    component: <VwapComponent />,
    name: "vwap",
    displayName: "Vwap",
    isBreake: true,
    isCross: false,
    isEnableCross: false,
    isEnableBreake: true,
    settings: [
      {
        name: "precentageDifferent",
        value: 2,
        label: "درصد اختلاف با قیمت",
      },
    ],
    settingsFunc: (strategy) => VwapColumns(strategy),
    breake: {
      type: "line",
      line: 0,
      area: [0, 0],
      offset: 0,
      side: "upwards",
    },
    parameters: [
      {
        name: "length",
        value: 25,
        label: "طول",
      },
    ],
  },
  {
    id: 22,
    type: "",
    isBinding: false,
    component: <Base />,
    name: "base",
    displayName: "عرضه و تقاضا",
    isBreake: false,
    isCross: false,
    isEnableCross: false,
    isEnableBreake: false,
    both: true,
    settings: true,
    settingsFunc: (strategy) => BaseColumn(strategy),
    parameters: [],
  },
  {
    id: 17,
    type: "",
    isBinding: false,
    name: "bband_tsi",
    displayName: "استراتژی بولینجر و تی اس ای",
    isBreake: false,
    isCross: false,
    settings: true,
    settingsFunc: (strategy) => BbandTsi(strategy),
    parameters: [],
  },
  {
    id: 18,
    type: "",
    isBinding: false,
    name: "threeSupertrend",
    displayName: "استراتژی 3 سوپرترند",
    isBreake: false,
    isCross: false,
    settings: true,
    settingsFunc: (strategy) => ThreeSuperTrend(strategy),
    parameters: [],
  },
  {
    id: 19,
    type: "",
    isBinding: false,
    name: "threeEma",
    displayName: "استراتژی 2 ای ام ای",
    isBreake: false,
    isCross: false,
    settings: true,
    settingsFunc: (strategy) => ThreeEma(strategy),
    parameters: [],
  },
  {
    id: 20,
    name: "DMI_OBV",
    displayName: "استراتژی دی ام ای و obv",
    parameters: [],
    type: "",
    isBinding: false,
    isBreake: false,
    isCross: false,
    settings: true,
    settingsFunc: (strategy) => DMI_OBV(strategy),
  },
  {
    id: 21,
    name: "VWAP_DMI",
    displayName: "استراتژی VWAP و دی ام آی",
    parameters: [],
    type: "",
    isBinding: false,
    isBreake: false,
    isCross: false,
    settings: true,
    settingsFunc: (strategy) => VWAP_DMI(strategy),
  },
];
export const botStrategy = [
  {
    id: 1,
    name: "supertrend",
    displayName: "سوپرترند",
    stopOptions: [
      {
        name: "atr",
        label: "Atr",
        isActive: true,
      },
      {
        name: "supertrend",
        label: "خط سوپرترند",
        isActive: false,
      },
      {
        name: "supertrendSwitch",
        label: "سوئیچ سوپرترند",
        isActive: false,
      },
    ],
    parameters: [
      {
        name: "length",
        value: 10,
        label: "ATR length",
      },
      {
        name: "factor",
        value: 3,
        label: "Factor",
      },
    ],
  },
  {
    id: 2,
    name: "three_supertrend",
    displayName: "استراتژی 3 سوپرترند",
    parameters: [],
    stopOptions: [
      {
        name: "atr",
        label: "Atr",
        isActive: true,
      },
      {
        name: "midline",
        label: "سوپرترند وسطی",
        isActive: false,
      },
    ],
  },
  {
    id: 3,
    name: "DMI_OBV",
    displayName: "استراتژی دی ام ای",
    parameters: [],
    stopOptions: [
      {
        name: "atr",
        label: "Atr",
        isActive: true,
      },
    ],
  },
  {
    id: 4,
    name: "EMA",
    displayName: "استراتژی ای ام ای",
    parameters: [
      {
        name: "length",
        value: 20,
        label: "طول",
      },
    ],
    stopOptions: [
      {
        name: "atr",
        label: "Atr",
        isActive: true,
      },
    ],
  },
];
