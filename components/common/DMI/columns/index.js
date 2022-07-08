import {SlopeADX} from "../cell/SlopeADX";
export const DMI = (indicator) => {
  return [
    {
      field: `DMI_cross_upwards`,
      label: `تقاطع رو به بالا`,
      tooltip: `${indicator.parameters[0].value}`,
      customCell: false,
    },
    {
      field: `ADX_way`,
      label: `شیب خط adx`,
      tooltip: `${indicator.parameters[0].value}`,
      renderCell: (params) => <SlopeADX {...params}/> ,
      customCell: true,
    },
    {
      field: `DMI_cross_downwards`,
      label: `تقاطع رو به پایین`,
      tooltip: `${indicator.parameters[0].value}`,
      customCell: false,
    },
  ];
};
