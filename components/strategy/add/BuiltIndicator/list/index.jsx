import Link from "next/link";
import { Alert, Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toggleDialog } from "@/redux/action/Actions";
import { setCombineIndicatorId } from "@/redux/action/strategy/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "./item";
import { Fragment } from "react";
export const List = () => {
  const state = useSelector((state) => state.strategy);
  const indicatorList = state.indicators.filter((el) => el.completed === true);
  const combineList = state.combine.filter((el) => el.completed === true);
  const dispatch = useDispatch();
  const handleDialog = (id) => {
    dispatch(
      setCombineIndicatorId({
        combinedIndicatorId: id,
      })
    );
    dispatch(toggleDialog(true));
  };
  return (
    <Item label="اندیکاتور ها">
      {indicatorList.map((el, idx) => (
        <Item label={el.displayName} key={idx}>
          <Item label="تنظیمات">
            {el.parameters
              .filter(
                (el) => el.static == false || typeof el.static == "undefined"
              )
              .map((parametr, idxp) => (
                <Item
                  key={idxp}
                  label={`${parametr.label} : ${parametr.value}`}
                />
              ))}
          </Item>

          {el.isBinding && (
            <Item label="اندیکاتور(ها) مکمل">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5%",
                  marginTop: "25px",
                }}
              >
                <Alert
                  sx={{ flexGrow: 1 }}
                  severity={combineList.length === 0 ? "info" : "error"}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      a: { color: "rgb(30, 58, 102)", fontWeight: "bold" },
                    }}
                  >
                    {combineList.length === 0 ? (
                      <Fragment>
                        شما تا کنون هیچ اندیکاتور مکملی تعریف نکرده اید
                      </Fragment>
                    ) : (
                      <Fragment>
                        شما توانایی تنظیم بیش از 1 اندیکاتور در یک استراتژی را
                        ندارید . در صورت نیاز می توانید اقدام به خرید {""}
                        <Link href="/plane">پلن</Link> کنید
                      </Fragment>
                    )}
                  </Typography>
                </Alert>
                <Button
                  onClick={() => handleDialog(el.id)}
                  variant="contained"
                  color="info"
                  className="icon-btn"
                >
                  <AddIcon />
                </Button>
              </Box>
              {combineList.length > 0 && (
                <Fragment>
                  {combineList.map((combine, index) => (
                    <Item key={index} label={combine.displayName}>
                      {combine.parametersCombine.map(
                        (combineParams, indexParams) => (
                          <Item
                            key={indexParams}
                            label={`${combineParams.label} : ${combineParams.value}`}
                          />
                        )
                      )}
                    </Item>
                  ))}
                </Fragment>
              )}
            </Item>
          )}
        </Item>
      ))}
    </Item>
  );
};
