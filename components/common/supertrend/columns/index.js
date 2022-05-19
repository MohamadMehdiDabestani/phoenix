export const SuperTrendColumn = (strategy) => {
  return [
    {
      field: `supertrend_long`,
      label: `خرید`,
      tooltip: `ATR : ${
        strategy.parameters.find((e) => e.name === "length").value
      } - Factor : ${
        strategy.parameters.find((e) => e.name === "factor").value
      }`,
      customCell: false,
      id: 8,
    },
    {
      field: `supertrend_short`,
      label: `فروش`,
      tooltip: `ATR : ${
        strategy.parameters.find((e) => e.name === "length").value
      } - Factor : ${
        strategy.parameters.find((e) => e.name === "factor").value
      }`,
      customCell: false,
      id: 8,
    },
  ];
};
