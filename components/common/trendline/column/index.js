export const TrendLineColumn = () => {
  return [
    {
      field: "downtrend_last_touch",
      label: "برخورد با خط پایین",
      customCell: false,
    },
    {
      field: "uptrend_last_touch",
      label: "برخورد با خط بالا",
      customCell: false,
    },
  ];
};
