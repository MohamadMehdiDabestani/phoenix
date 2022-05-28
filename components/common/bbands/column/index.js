export const BbandsColumn = (strategy) => {
  return [
    {
      field: "sensitivity_plus",
      label: "حساسیت مثبت",
      tooltip: strategy.settings.find((e) => e.name === "sensitivity").value,
      customCell: false,
      id: 3,
    },
    {
      field: "sensitivity_minus",
      label: "حساسیت منفی",
      tooltip: 1 - strategy.settings.find((e) => e.name === "sensitivity").value,
      customCell: false,
      id: 3,
    },
  ];
};
