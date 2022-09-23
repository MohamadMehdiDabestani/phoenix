import { useState, Fragment, useEffect } from "react";
import { Loading } from "@/components";
import Router from "next/router";
// import TradingViewWidget from "react-tradingview-widget";
import { DataGrid, faIR } from "@mui/x-data-grid";
import { Toolbar } from "./Toolbar";
import { CustomPagination } from "./Pagination";
import { Paper } from "@mui/material";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useApi } from "@/hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading, toggleSnackBar } from "@/redux/action/Actions";
import { useIndicator } from "@/hooks/useIndicator";
import {
  setSelectedCoin,
  setColumn,
  setRow,
  setFilterCoin,
  cleanFilterCoin,
  cleanRowPanel,
} from "@/redux/action/panel/Actions";
import { getCookie } from "cookies-next";
import { toggleDialog } from "@/redux/action/Actions";
import { DialogBoxGrid } from "./DialogBox";
export const GridAnalysis = ({
  apiUrl,
  isCustomCoins,
  loadingProps,
}) => {
  const { postHandeled } = useApi({ baseUrl: apiUrl });
  const [page, setPage] = useState(0);
  const { columns, rows, coins, filterCoin, customCoin, selectedCoin } =
    useSelector((state) => state.panel);
  const { show } = useSelector((state) => state.loading);
  const [strategy, _] = useLocalStorage("strategy"); // eslint-disable-line
  const exchange = getCookie("exchange");
  const dispatch = useDispatch();
  const { getInidcatorById } = useIndicator();
  const handleSendNewRequest = (newPage) => {
    if (newPage > page) {
      if (isCustomCoins) {
        customCoin.slice(newPage * 6, (newPage + 1) * 6).map((coin) => {
          postHandeled("/analzer", { strategy, exchange, coin }, ({ data }) => {
            dispatch(setFilterCoin(JSON.parse(data)));
          });
        });
      } else {
        coins.slice(newPage * 6, (newPage + 1) * 6).map((coin) => {
          postHandeled("/analzer", { strategy, exchange, coin }, ({ data }) => {
            dispatch(setRow(JSON.parse(data)));
          });
        });
      }
    }
  };
  const handleClickShowInfo = (coinName) => {
    dispatch(toggleDialog(true));
    dispatch(setSelectedCoin({ coinName }));
  };
  const getType = (type) => {
    const list = { upwards: "به بالا", downwards: "به پایین" };
    return list[type];
  };
  const getBreakType = (type) => {
    const list = { area: "ناحیه ای", line: "خطی" };
    return list[type];
  };
  const getBreakTooltip = (breake) => {
    if (breake.type === "area") {
      return `${breake.area[0]} - ${breake.area[1]}`;
    }
    return breake.line;
  };

  useEffect(() => {
    if (!strategy) {
      dispatch(
        toggleSnackBar({
          message: "ابتدا یک استراتژی تعریف کنید",
          variant: "standard",
          severity: "error",
          show: true,
        })
      );
      Router.push("/panel/strategy/add");
    } else {
      if (loadingProps) {
        dispatch(toggleLoading(loadingProps));
      } else {
        dispatch(toggleLoading({ show: true, isGlobal: true }));
      }
      let names = [];
      strategy.indicators
        .filter((ind) => {
          if (ind.both) {
            return true;
          } else if (ind.outside) {
            return false;
          }

          return true;
        })
        .map((el) => {
          let label = `${el.displayName} `;
          if (el.settings) {
            let ind = getInidcatorById(el.id);
            ind.settingsFunc(el).map((customColumn) => {
              names.push(customColumn);
            });
          } else {
            if (el.isEnableCross) {
              if (el.cross.side === "both") {
                names.push({
                  label: `${label} تقاطع رو به بالا `,
                  field: `${el.name}_cross_upwards`,
                  tooltip: `${
                    el.parameters.find((e) => e.defaultCrossing === true).label
                  } - ${
                    el.parameters.find((e) => e.defaultCrossed === true).label
                  }`,
                });
                names.push({
                  label: `${label} تقاطع رو به پایین `,
                  field: `${el.name}_cross_downwards`,
                  tooltip: `${
                    el.parameters.find((e) => e.defaultCrossing === true).label
                  } - ${
                    el.parameters.find((e) => e.defaultCrossed === true).label
                  }`,
                });
              } else {
                names.push({
                  label: `${label} تقاطع رو  ${getType(el.cross.side)}`,
                  field: `${el.name}_cross_${el.cross.side}`,
                  tooltip: `${
                    el.parameters.find((e) => e.defaultCrossing === true).label
                  } - ${
                    el.parameters.find((e) => e.defaultCrossed === true).label
                  }`,
                });
              }
            }
            if (el.isEnableBreake) {
              let breakObj = { label: "", field: "", tooltip: "" };
              if (el.breake.side === "both") {
                breakObj = [
                  { label: "", field: "", tooltip: "" },
                  { label: "", field: "", tooltip: "" },
                ];
                breakObj[0] = {
                  label: `${label} شکست رو به بالا `,
                  field: `${el.name}_break_${el.breake.type}_upwards`,
                  tooltip: getBreakTooltip(el.breake),
                };
                breakObj[1] = {
                  label: `${label} شکست رو به پایین `,
                  field: `${el.name}_break_${el.breake.type}_downwards`,
                  tooltip: getBreakTooltip(el.breake),
                };
                names = names.concat(breakObj);
              } else {
                breakObj = {
                  label: `${label} شکست ${getBreakType(el.breake.type)}`,
                  field: `${el.name}_break_${el.breake.type}_${el.breake.side}`,
                  tooltip: getBreakTooltip(el.breake),
                };
                names.push(breakObj);
              }
            }
          }
          if (el.isBinding) {
            const combining = strategy.combine.filter(
              (e) => e.combinedIndicatorId === el.id
            );
            combining.map((combine) => {
              if (combine.side === "both") {
                names.push({
                  label: `تقاطع رو به پایین ${label} و ${combine.displayName}`,
                  field: `${el.name}_${el.parameters[0].value}_${combine.name}_${combine.parametersCombine[0].value}_cross_downwards`,
                  tooltip: `${el.displayName}(${el.parameters[0].value}) - ${combine.displayName}(${combine.parametersCombine[0].value})`,
                });
                names.push({
                  label: `تقاطع رو به بالا ${label} و ${combine.displayName}`,
                  field: `${el.name}_${el.parameters[0].value}_${combine.name}_${combine.parametersCombine[0].value}_cross_upwards`,
                  tooltip: `${el.displayName}(${el.parameters[0].value}) - ${combine.displayName}(${combine.parametersCombine[0].value})`,
                });
              } else {
                names.push({
                  label: `${label} تقاطع رو  ${getType(combine.side)}`,
                  field: `${el.name}_${el.parameters[0].value}_${combine.name}_${combine.parametersCombine[0].value}_cross_${combine.side}`,
                  tooltip: `${el.displayName}(${el.parameters[0].value}) - ${combine.displayName}(${combine.parametersCombine[0].value})`,
                });
              }
            });
          }
        });
      dispatch(
        setColumn({
          names,
          onClickShowInfo: (coinName) => handleClickShowInfo(coinName),
        })
      );
      strategy.indicators = strategy.indicators.filter((ind) => {
        if (ind.both) {
          return true;
        } else if (ind.outside) {
          return false;
        }
        return true;
      });
      if (!isCustomCoins) {
        coins.slice(0, 6).map((coin) => {
          postHandeled("/analzer", { strategy, exchange, coin }, ({ data }) => {
            dispatch(setRow(JSON.parse(data)));
            dispatch(toggleLoading({ show: false, isGlobal: false }));
          });
        });
      }
    }
    return function cleanUp() {
      dispatch(cleanFilterCoin());
      dispatch(cleanRowPanel());
    };
  }, []);
  useEffect(() => {
    if (loadingProps) {
      dispatch(toggleLoading(loadingProps));
    } else {
      dispatch(toggleLoading({ show: true, isGlobal: true }));
    }
    if (show) {
      customCoin.slice(0, 6).map((coin) => {
        console.log("send req in effect custom coin");
        postHandeled("/analzer", { strategy, exchange, coin }, ({ data }) => {
          dispatch(setFilterCoin(JSON.parse(data)));
          dispatch(toggleLoading({ show: false, isGlobal: false }));
        });
      });
    }
  }, [customCoin]);
  if (show) return <Loading />;
  return (
    <Fragment>
      {selectedCoin.coinName.length > 0 && (
        <DialogBoxGrid apiUrl={apiUrl}  />
      )}
      <Paper dir="ltr">
        <DataGrid
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              overflowX: "auto",
            },
            "& .MuiDataGrid-row > div": {
              direction: "ltr",
            },
            "& div.MuiDataGrid-toolbarContainer": {
              justifyContent: "flex-end",
              "& > button> span": {
                ml: "5px",
              },
            },
          }}
          initialState={{
            pagination: {
              page: 1,
            },
          }}
          disableColumnMenu
          rows={isCustomCoins ? filterCoin : rows}
          columns={columns}
          disableSelectionOnClick
          autoHeight
          pagination
          pageSize={5}
          page={page}
          onPageChange={(newPage) => {
            handleSendNewRequest(newPage);
            setPage(newPage);
          }}
          rowsPerPageOptions={[5]}
          components={{
            Toolbar: Toolbar,
            Pagination: CustomPagination,
          }}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Paper>
    </Fragment>
  );
};
