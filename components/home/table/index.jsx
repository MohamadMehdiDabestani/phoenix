// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";
import { Fragment } from "react";
// const columns = [
//   { id: "name", label: "پلن", minWidth: 100 },
//   {
//     id: "price",
//     label: "قیمت",
//     minWidth: 100,
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   { id: "limit", label: "تعداد ارز", minWidth: 100 },
//   {
//     id: "auto",
//     label: "تحلیل گر خودکار",
//     minWidth: 100,
//   },
//   {
//     id: "bot",
//     label: "ربات تریدر",
//     minWidth: 100,
//   },
//   {
//     id: "goldrenSignal",
//     label: "پیش بینی با هوش مصنوعی",
//     minWidth: 100,
//   },
// ];
// const rows = [
//   {
//     key: 1,
//     name: "پیش فرض",
//     price: "رایگان",
//     limit: "12",
//     bot: "در دست توسعه",
//     goldrenSignal: "در دست توسعه",
//     auto: <CloseIcon color="error" />,
//   },
//   {
//     key: 2,
//     name: "نقره ای",
//     price: 2000000,
//     limit: <AllInclusiveIcon color="success" />,

//     bot: "در دست توسعه",
//     auto: <CheckIcon color="success" />,
//     goldrenSignal: "در دست توسعه",
//   },
//   {
//     key: 3,
//     name: "برنزی",
//     price: 5000000,
//     limit: <AllInclusiveIcon color="success" />,

//     bot: "در دست توسعه",
//     auto: <CheckIcon color="success" />,
//     goldrenSignal: "در دست توسعه",
//   },
//   {
//     key: 3,
//     name: "طلایی",
//     price: "با توجه به درخواست",
//     limit: <AllInclusiveIcon color="success" />,
//     bot: "در دست توسعه",
//     auto: <CheckIcon color="success" />,
//     goldrenSignal: "در دست توسعه",
//   },
// ];
export const HomeTable = () => {
  // const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  return (
    <Fragment>
      <Alert severity="warning" variant="filled" sx={{width: "100%" ,margin:"20px 0"}}>
        تا اطلاعات ثانویه استفاده از سایت کاملا رایگان و بلامانع می باشد .
      </Alert>
      {/* <Paper
        sx={{
          margin: "20px 0",
          marginBottom: matches ? "20px" : "30px",
          width: "100%",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column, idx) => (
                  <TableCell key={idx} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => {
                return (
                  <TableRow hover tabIndex={-1} key={idx}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper> */}
    </Fragment>
  );
};
