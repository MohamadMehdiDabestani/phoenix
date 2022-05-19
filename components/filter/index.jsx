import useLocalStorage from "@/hooks/useLocalStorage";
import { setCustomCoin, setCoinFilterList } from "@/redux/action/panel/Actions";
import { Alert, Box, Grid, Paper } from "@mui/material";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Input } from "./input";
import { List } from "./list";
import { GridAnalysis } from "@/components/common/GridAnalysis";
import { SelectCoinList } from "./select";
import { FilterButton } from "./button";

export const FilterComponent = ({ apiUrl, nexUrl }) => {
  const dispatch = useDispatch();
  const [coins, _] = useLocalStorage("coins", {}); // eslint-disable-line
  if (Object.keys(coins).length > 0) {
    dispatch(setCoinFilterList(Object.keys(coins)[0]));
    coins[Object.keys(coins)[0]].value.split(",").map((e) => {
      dispatch(setCustomCoin(e.replace(" ", "")));
    });
  }
  return (
    <Fragment>
      <Paper sx={{ padding: "20px" }}>
        <Grid container spacing={4}>
          {Object.keys(coins).length === 0 ? (
            <FilterButton />
          ) : (
            <Fragment>
              <Input />
              <SelectCoinList />
              <FilterButton />
              <List />
            </Fragment>
          )}
        </Grid>
      </Paper>
      {Object.keys(coins).length == 0 ? (
        <Paper sx={{ marginTop: "20px", padding: "20px" }}>
          <Alert severity="info">
            ابتدا ارز هایی برای فیلتر کردن انتخاب کنید .
          </Alert>
        </Paper>
      ) : (
        <Box marginTop="20px">
          <GridAnalysis apiUrl={apiUrl} nexUrl={nexUrl} isCustomCoins={true} />
        </Box>
      )}
    </Fragment>
  );
};
