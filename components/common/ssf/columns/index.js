export const SsfColumn = (strategy) => {
    const names = [];
    if (strategy.breake.side === "both") {
      names.push({
        field: `ssf_break_${strategy.breake.type}_upwards`,
        label: `شکست ${strategy.displayName} رو به بالا`,
        tooltip: strategy.parameters.find((e) => e.name === "length").value,
        customCell: false,
      });
      names.push({
        field: `ssf_break_${strategy.breake.type}_downwards`,
        label: `شکست ${strategy.displayName} رو به پایین`,
        tooltip: strategy.parameters.find((e) => e.name === "length").value,
        customCell: false,
      });
    } else {
      const sideCheck = strategy.breake.side === "downwards";
      if (sideCheck) {
        names.push({
          field: `ssf_break_${strategy.breake.type}_downwards`,
          label: `شکست ${strategy.displayName} رو به پایین`,
          tooltip: strategy.parameters.find((e) => e.name === "length").value,
          customCell: false,
        });
      } else {
        names.push({
          field: `ssf_break_${strategy.breake.type}_upwards`,
          label: `شکست ${strategy.displayName} رو به بالا`,
          tooltip: strategy.parameters.find((e) => e.name === "length").value,
          customCell: false,
        });
      }
    }
    if (
      strategy.settings.find((i) => i.name === "precentageDifferent").value > 0
    ) {
      names.push({
        field: `ssf_precentage`,
        label: `درصد اختلاف با قیمت`,
        tooltip: `SSF (${
          strategy.parameters.find((e) => e.name === "length").value
        }) - ${
          strategy.settings.find((i) => i.name === "precentageDifferent").value
        }%`,
        customCell: false,
      });
    }
    return names;
  };
  