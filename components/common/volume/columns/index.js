import { SlopeDisplay } from "../../SlopeDisplay";
export const Volume = () => {
  console.log("volume custom cell");
  return [
    {
      field: `volume_way`,
      label: `روند حجم`,
      tooltip: ``,
      renderCell: (params) => <SlopeDisplay {...params} field="volume_way" />,
      customCell: true,
    },
  ];
};
