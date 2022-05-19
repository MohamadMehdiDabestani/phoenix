export const BbandsColumn = (strategy) => {
  return [
    {
      field: "sensitivity",
      label: "حساسیت بولینجر",
      tooltip: strategy.settings.find((e) => e.name === "sensitivity").value,
      customCell: false,
      id: 3,
    },
  ];
};
