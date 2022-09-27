import { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogBox } from "@/components";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getCookie } from "cookies-next";
import { RenderCellSandR } from "@/components";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Chart } from "@/components";
import { useIndicator } from "@/hooks/useIndicator";
import { toggleDialog } from "@/redux/action/Actions";
import { v4 as uuidv4 } from "uuid";
import { setSelectedCoin } from "@/redux/action/panel/Actions";
import ccxt from "ccxt";
export const DialogBoxGrid = ({ apiUrl }) => {
  const components = {
    "S&R": RenderCellSandR,
  };
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [analys, setAnalys] = useState(); // this is for series props in apex chart
  const [candles, setCandles] = useState();
  const [loading, setLoading] = useState(false);
  const [annotations, setAnnotations] = useState();
  const [onylAnalys, setOnylAnalys] = useState();
  const [timeFrames, setTimeFrames] = useState();
  const [currentTimeFrame, setCurrentTimeFrame] = useState();
  const { postHandeled } = useApi({ baseUrl: apiUrl });
  const [strategy, _s] = useLocalStorage("strategy"); // eslint-disable-line
  const exchange = getCookie("exchange");
  const { selectedCoin } = useSelector((state) => state.panel);
  const { getInidcatorById } = useIndicator();
  const handleStates = (res) => {
    let finallyAnnotaion = [];
    if (res.trendline) {
      const keys = Object.keys(res.trendline);
      const trendObjs = [];
      keys.map((el) => {
        trendObjs.push({
          type: "line",
          name: "ترندلاین",
          data: [
            res.trendline[el][0],
            res.trendline[el][res.trendline[el].length - 1],
          ],
        });
      });
      setAnalys(trendObjs);
    }
    const bases = [];
    if (res["S&R"]) {
      const SandR = [];
      const keys = Object.keys(res["S&R"]);
      keys.map((t) => {
        res["S&R"][t].map((a) => {
          if (a > 0) {
            SandR.push({
              id: uuidv4(),
              name: "حمایت و مقاومت",
              y: a,
              strokeDashArray: 0,
              borderColor: "black",
              borderWidth: "4px",
              label: {
                borderColor: "black",
                style: {
                  color: "#fff",
                  background: "black",
                  fontSize: "12px",
                },
                position: "left",
                text: `${t}(${a})`,
              },
            });
          }
        });
      });
      finallyAnnotaion = finallyAnnotaion.concat(SandR);
    }
    if (res["base"]) {
      if (res.base.base_sup_precent) {
        bases.push({
          id: uuidv4(),
          name: "تقاضا",
          y: res.base.base_sup_range[0],
          y2: res.base.base_sup_range[1],
          fillColor: "#4b94f3",
          label: {
            text: "تقاضا",
            offsetY: 0,
            position: "end",
          },
        });
      }
      if (res.base.base_res_precent) {
        bases.push({
          id: uuidv4(),
          name: "عرضه",
          y2: res.base.base_res_range[1],
          y: res.base.base_res_range[0],
          fillColor: "#faa84a",
          label: {
            text: "عرضه",
            offsetY: 0,
            position: "end",
          },
        });
      }
      finallyAnnotaion = finallyAnnotaion.concat(bases);
    }
    setAnnotations({ yaxis: finallyAnnotaion });
    setLoading(false);
  };

  useEffect(() => {
    if (strategy.indicators && selectedCoin.coinName !== "") {
      setLoading(true);
      const ex = new ccxt[exchange]();
      const times = ex.timeframes;
      setTimeFrames(Object.keys(times));
      setCurrentTimeFrame(strategy.timeFrame);

      postHandeled(
        "/coin",
        {
          timeFrame: strategy.timeFrame,
          coin: selectedCoin.coinName,
          exchange,
        },
        ({ data }) => {
          const candles = data.map((e) => {
            return { x: e.slice(0, 1)[0], y: e.slice(1, 5) };
          });
          setCandles(candles);
        }
      );
      strategy.indicators = strategy.indicators.filter(
        (i) => i.outside || i.both
      );

      postHandeled(
        "/analzer",
        { strategy, exchange, coin: selectedCoin.coinName },
        ({ data }) => {
          const res = JSON.parse(data);
          console.log("res ============", res);
          setOnylAnalys(res);
          handleStates(res);
        }
      );
    }
  }, [selectedCoin.coinName]);

  useEffect(() => {
    if (!loading && typeof currentTimeFrame !== "undefined") {
      setLoading(true);
      postHandeled(
        "/coin",
        {
          timeFrame: currentTimeFrame,
          coin: selectedCoin.coinName,
          exchange,
        },
        ({ data }) => {
          const candles = data.map((e) => {
            return { x: e.slice(0, 1)[0], y: e.slice(1, 5) };
          });
          setCandles(candles);
        }
      );
      strategy.indicators = strategy.indicators.filter(
        (i) => i.outside || i.both
      );

      postHandeled(
        "/analzer",
        {
          strategy: { ...strategy, timeFrame: currentTimeFrame },
          exchange,
          coin: selectedCoin.coinName,
        },
        ({ data }) => {
          const res = JSON.parse(data);
          console.log("res ============", res);
          setOnylAnalys(res);
          handleStates(res);
        }
      );
    }
  }, [currentTimeFrame]);
  const handleClose = () => {
    dispatch(setSelectedCoin({ coinName: "" }));
    dispatch(toggleDialog(false));
  };
  const handleChangeTimeFrame = (e) => {
    setCurrentTimeFrame(e.target.value);
  };
  console.log("annotations", annotations);
  console.log(
    "series=",
    [
      {
        name: "کندل",
        type: "candlestick",
        data: candles,
      },
    ].concat(analys ? analys : [])
  );
  return (
    <DialogBox
      title={`سایر اطلاعات تحلیل ارز : ${selectedCoin.coinName}`}
      rest={{
        maxWidth: "lg",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "70px",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        {loading ? (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              position: "absolute",
            }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Fragment>
            <FormControl variant="filled" sx={{ width: "20%", mb: "15px" }}>
              <InputLabel id="indicator-label">تایم فریم</InputLabel>
              <Select
                value={currentTimeFrame}
                onChange={handleChangeTimeFrame}
                labelId="indicator-label"
                label="اندیکاتور"
              >
                {timeFrames?.map((e, idx) => (
                  <MenuItem value={e} key={idx}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {strategy.indicators.filter((ind) => {
              if (ind.outside || ind.both) {
                return true;
              }
              return false;
            }).length > 0 ? (
              <Fragment>
                <Chart
                  options={{
                    annotations,
                  }}
                  width={matches ? "1200" : "800"}
                  series={[
                    {
                      name: "کندل",
                      type: "candlestick",
                      data: candles,
                    },
                  ].concat(analys ? analys : [])}
                />
                {strategy.indicators
                  .filter((ind) => ind.isCustom)
                  .map((ind, idx) => {
                    const Component = components[getInidcatorById(ind.id).name];
                    if (Component)
                      return (
                        <Fragment key={idx}>
                          <Component {...onylAnalys} />
                        </Fragment>
                      );
                  })}
              </Fragment>
            ) : (
              <Typography>موردی برای نمایش وجود ندارد</Typography>
            )}
          </Fragment>
        )}
      </Box>
      <Button
        variant="contained"
        color="error"
        sx={{ display: "block", margin: "10px 0" }}
        onClick={handleClose}
      >
        خروج
      </Button>
    </DialogBox>
  );
};
