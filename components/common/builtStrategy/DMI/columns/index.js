export const DMI = (indicator) => {
    return [
      {
        field: `DMI_cross_upwards`,
        label: `تقاطع رو به بالا`,
        tooltip: `${indicator.parameters[0].value}`,
        customCell: false,
      },
      {
        field: `DMI_cross_downwards`,
        label: `تقاطع رو به پایین`,
        tooltip: `${indicator.parameters[0].value}`,
        customCell: false,
      },
    ];
  };
  