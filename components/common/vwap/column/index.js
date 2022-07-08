import { SlopeVWAP } from "../cell/SlopeVWAP";

export const VwapColumns = (strategy) => {
  const names = [];
  if (strategy.breake.side === "both") {
    names.push({
      field: `vwap_break_${strategy.breake.type}_upwards`,
      label: `شکست ${strategy.displayName} رو به بالا`,
      tooltip: strategy.parameters.find((e) => e.name === "length").value,
      customCell: false,
      id: 7,
    });
    names.push({
      field: `vwap_break_${strategy.breake.type}_downwards`,
      label: `شکست ${strategy.displayName} رو به پایین`,
      tooltip: strategy.parameters.find((e) => e.name === "length").value,
      customCell: false,
      id: 7,
    });
  } else {
    const sideCheck = strategy.breake.side === "downwards";
    if (sideCheck) {
      names.push({
        field: `vwap_break_${strategy.breake.type}_downwards`,
        label: `شکست ${strategy.displayName} رو به پایین`,
        tooltip: strategy.parameters.find((e) => e.name === "length").value,
        customCell: false,
        id: 7,
      });
    } else {
      names.push({
        field: `vwap_break_${strategy.breake.type}_upwards`,
        label: `شکست ${strategy.displayName} رو به بالا`,
        tooltip: strategy.parameters.find((e) => e.name === "length").value,
        customCell: false,
        id: 7,
      });
    }
  }
  if (
    strategy.settings.find((i) => i.name === "precentageDifferent").value > 0
  ) {
    names.push({
      field: `vwap_precentage`,
      label: `درصد اختلاف با قیمت`,
      tooltip: `Vwap (${
        strategy.parameters.find((e) => e.name === "length").value
      }) - ${
        strategy.settings.find((i) => i.name === "precentageDifferent").value
      }%`,
      customCell: false,
    });
  }
  names.push({
    field: `vwap_way`,
    label: `شیب خط vwap`,
    tooltip: strategy.parameters.find((e) => e.name === "length").value,
    renderCell: (params) => <SlopeVWAP {...params} />,
    customCell: true,
    id: 7,
  });
  return names;
};
