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
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Chart } from "@/components";
import { useIndicator } from "@/hooks/useIndicator";
import { toggleDialog } from "@/redux/action/Actions";
export const DialogBoxGrid = ({ apiUrl, nexUrl }) => {
  const components = {
    "S&R": RenderCellSandR,
  };
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [analys, setAnalys] = useState();
  const [candles, setCandles] = useState();
  const [loading, setLoading] = useState(false);
  const [annotations, setAnnotations] = useState();
  const [onylAnalys, setOnylAnalys] = useState();
  const { postHandeled } = useApi({ baseUrl: apiUrl });
  const [strategy, _s] = useLocalStorage("strategy"); // eslint-disable-line
  const exchange = getCookie("exchange");
  const { selectedCoin } = useSelector((state) => state.panel);
  const { getInidcatorById } = useIndicator();
  useEffect(() => {
    if (strategy.indicators && selectedCoin.coinName !== "") {
      setLoading(true);
      postHandeled(
        `${nexUrl}/coin`,
        {
          timeFrame: strategy.timeFrame,
          coin: selectedCoin.coinName,
          exchange,
        },
        ({ result }) => {
          setCandles(result);
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
          setOnylAnalys(res);
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
          if (res["S&R"]) {
            const SandR = [];
            const keys = Object.keys(res["S&R"]);
            keys.map((t) => {
              res["S&R"][t].map((a) => {
                if (a > 0) {
                  SandR.push({
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
            setAnnotations({ yaxis: SandR });
          }
          setLoading(false);
        }
      );
    }
  }, [selectedCoin.coinName]);
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
            <Typography>ارز : </Typography>
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
                  ].concat(analys)}
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
        onClick={() => dispatch(toggleDialog(false))}
      >
        خروج
      </Button>
    </DialogBox>
  );
};
