import DoneAllIcon from "@mui/icons-material/DoneAll";
// import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import produce from "immer";
import * as types from "@/redux/action/panel/Types";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { Fragment } from "react";
import CloseIcon from "@mui/icons-material/Close";
const initialState = {
  columns: [],
  rows: [],
  coins: [],
  selectedCoin: { coinName: "" },
  filterCoin: [],
  customCoin: [],
  currentCoinList: "",
};
const calculateDateTimeDiff = (d1) => {
  const date1 = new Date(d1);
  const date2 = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Atlantic/Reykjavik" })
  );
  const miltosec = 1000;
  const miltomin = miltosec * 60;
  const miltohour = miltomin * 60;
  const miltoday = miltohour * 24;
  const days = Math.floor((date2 - date1) / miltoday);
  const daysDuration = days * miltoday;
  const hours = Math.floor((date2 - date1 - daysDuration) / miltohour);
  const hoursDuration = hours * miltohour;
  const minutes = Math.floor(
    (date2 - date1 - (daysDuration + hoursDuration)) / miltomin
  );
  return {
    days,
    hours,
    minutes,
  };
};

export const panelReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case types.SET_COLUMN: {
        const columns = [];
        action.payload.names.map((el) => {
          columns.push({
            headerClassName: "rtl-column",
            field: el.field,
            headerName: el.label,
            width: 250,
            tooltip: el.tooltip,
            renderCell: (paramas) => {
              if (el.customCell) {
                return el.renderCell(paramas);
              }
              return (
                <Fragment>
                  {typeof paramas.row[el.field] === "string" ? (
                    <Fragment>
                      <DoneAllIcon color="success" />
                      <Typography sx={{ marginLeft: "5px" }}>
                        روز:
                        {calculateDateTimeDiff(paramas.row[el.field]).days} -
                        ساعت:
                        {calculateDateTimeDiff(paramas.row[el.field]).hours} -
                        دقیقه:
                        {calculateDateTimeDiff(paramas.row[el.field]).minutes}
                      </Typography>
                    </Fragment>
                  ) : (
                    <CloseIcon color="error" />
                  )}
                </Fragment>
              );
            },
            renderHeader: (paramas) => (
              <Tooltip
                title={paramas.colDef.tooltip}
                disableInteractive
                placement="top"
                arrow
              >
                <Box sx={{ width: "100%", height: "100%" }}>
                  {paramas.colDef.headerName}
                </Box>
              </Tooltip>
            ),
          });
        });
        columns.push({
          field: "action",
          headerClassName: "rtl-column",
          headerName: "عملیات",
          width: 170,
          sortable: false,
          filterable: false,
          renderCell: (paramas) => (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              {/* <Tooltip title="حذف" disableInteractive placement="top" arrow>
                <Button className="icon-btn" color="error" variant="contained">
                  <DeleteIcon fontSize="small" />
                </Button>
              </Tooltip> */}
              <Tooltip title="مشاهده" disableInteractive placement="top" arrow>
                <Button
                  onClick={() =>
                    action.payload.onClickShowInfo(paramas.row.coinName)
                  }
                  className="icon-btn"
                  variant="contained"
                >
                  <VisibilityIcon fontSize="small" />
                </Button>
              </Tooltip>
              {/* <Tooltip
                title="افزودن به علاقه مندی ها"
                disableInteractive
                placement="top"
                arrow
              >
                <Button
                  className="icon-btn"
                  variant="contained"
                  color="inherit"
                >
                  <PlaylistAddIcon fontSize="small" />
                </Button>
              </Tooltip> */}
              {/* <Tooltip
                title="حذف از علاقه مندی ها"
                disableInteractive
                placement="top"
                arrow
              >
                <Button className="icon-btn" variant="contained" color="inherit">
                  <PlaylistRemoveIcon fontSize="small" />
                </Button>
              </Tooltip> */}
            </Box>
          ),
        });
        draft.columns = [
          { field: "id", hide: true, filterable: false, hideable: false },
          {
            field: "coinName",
            headerClassName: "rtl-column",
            headerName: "نام ارز",
            width: 120,
          },
        ].concat(columns);
        break;
      }
      case types.SET_ROW: {
        console.log("set row", action.payload);
        const existing = draft.rows.find(
          (e) => e.coinName === action.payload.coinName
        );
        if (!existing) {
          draft.rows.push({
            id: draft.rows.length,

            ...action.payload,
          });
        }
        break;
      }
      case types.CLEAN_ROW_PANEL: {
        draft.rows = [];
        break;
      }
      case types.SET_COINS:
        draft.coins = action.payload;
        break;
      case types.SET_CUSTOM_COIN:
        {
          action.payload.split(",").map((coin) => {
            const existing = draft.customCoin.find(
              (e) => e === coin.toUpperCase()
            );
            if (!existing) {
              draft.customCoin.push(coin.toUpperCase());
            }
          });
        }
        break;
      case types.FILTER_COIN:
        {
          const existing = draft.filterCoin.find(
            (e) => e.coinName === action.payload.coinName
          );
          if (!existing) {
            draft.filterCoin.push({
              id: draft.filterCoin.length,
              ...action.payload,
            });
          }
        }
        break;
      case types.SELECTED_COIN:
        draft.selectedCoin = action.payload;
        break;
      case types.REMOVE_CUSTOM_COIN:
        draft.customCoin = draft.customCoin.filter(
          (c) => c !== draft.customCoin[action.payload]
        );
        break;
      case types.SET_COIN_FILTER_LIST:
        draft.currentCoinList = action.payload;
        break;
      case types.CLEAN_FILTER_COIN:
        draft.filterCoin = [];
        break;
      case types.CLEAN_FILTER_COIN_LIST:
        draft.customCoin = [];
        break;
      default:
        return draft;
    }
  });
};
