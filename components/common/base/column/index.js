import { CellRes, CellSup } from "../cell";
export const BaseColumn = () => {
  return [
    {
      field: "base_res_precent",
      label: "درصد اختلاف با عرضه",
      renderCell: (params) => <CellRes {...params} />,
      customCell: true,
    },
    {
      field: "base_sup_precent",
      label: "درصد اختلاف با تقاضا",
      renderCell: (params) => <CellSup {...params} />,
      customCell: true,
    },
  ];
};
