import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Alert, Button, Grid, Typography } from "@mui/material";
import { Strategy } from "./strategy";
import { TimeFrame } from "./timeFrame";
import { Parameter } from "./parameter";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ListType } from "./listType";
import { TreeView } from "@mui/lab";
import { Fragment } from "react";
import { useApi } from "@/hooks/useApi";
import { toggleSnackBar } from "@/redux/action/Actions";
import { Reward } from "./reward";
import { Perecentage } from "./perecentage";
import { CloseOrder } from "./closingOrder";
import { Market } from "./market";
import { ChartType } from "./chart";
import { CheckBtc } from "./checkBtc";
import { OrderType } from "./orderType";
import { AdxFilter } from "./adx";
import { BlackListInput } from "./blackList/input";
import { BlackList } from "./blackList/list";
import { Leverage } from "./leverage";
import { Built } from "./built";
import { Status } from "./status";
export const BotComponent = ({ timeframes, url }) => {
  const { postHandeled } = useApi({ base: url });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.bot);
  const [botStrategy, setBotStrategy] = useLocalStorage("botStrategy", {}); // eslint-disable-line
  const handleSave = () => {
    postHandeled("/api/bot/save", { bot: state }, () => {
      setBotStrategy(state);
      dispatch(toggleSnackBar({ message: "تنظیمات ذخیره شد", show: true }));
    });
  };
  return (
    <Fragment>
      {!botStrategy.current ? (
        <Alert severity="info" sx={{ marginBottom: "15px" }}>
          ابتدا باید یک استراتژی برای ربات خود تعریف کنید
        </Alert>
      ) : (
        <Alert sx={{ marginBottom: "15px" }}>ربات شما راه اندازی شده</Alert>
      )}

      <Grid container spacing={4}>
        <Strategy />
        <TimeFrame timeframes={timeframes} />
        <Reward />
        <Perecentage />
        <CloseOrder />
        <Market />
        <ChartType />
        <OrderType />
        <CheckBtc />
        <AdxFilter />
        <Leverage />
        <Status />
        <ListType />
        <BlackListInput />
        <BlackList />
        <Parameter />

        {state.current && (
          <Grid item>
            <Button variant="contained" onClick={handleSave}>
              ذخیره
            </Button>
          </Grid>
        )}
        {botStrategy.current && (
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6">استراتژی فعلی شما :</Typography>
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                "& > li": {
                  marginBottom: "20px",
                  ".MuiTreeItem-content": {
                    padding: "7px",
                    borderRadius: "5px",
                  },
                },
              }}
            >
              <Built />
            </TreeView>
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
};
