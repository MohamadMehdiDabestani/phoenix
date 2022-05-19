import { removeCustomCoin } from "@/redux/action/panel/Actions";
import { useDispatch } from "react-redux";
import { Chip, Grid, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import useLocalStorage from "@/hooks/useLocalStorage";
export const List = () => {
  const { customCoin , currentCoinList } = useSelector((state) => state.panel);
  const dispatch = useDispatch();
  const [coins, setCoins] = useLocalStorage("coins", []); // eslint-disable-line

  const handle = (index,coinName) => {
    const list = coins[currentCoinList].value.split(',').filter((c) => c !== coinName).join(',');
    setCoins(coins[currentCoinList].value = list);
    dispatch(removeCustomCoin(index));
  };
  console.log("customCoin" , customCoin);
  return (
    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
      {customCoin.map((e, idx) => (
        <Tooltip key={idx} title="حذف" arrow placement="top">
          <Chip
            icon={<HighlightOffIcon />}
            sx={{ margin: "5px 5px", cursor: "pointer" }}
            size="small"
            label={e.replaceAll(" " , '')}
            onClick={() => handle(idx , e.replaceAll(" " , ''))}
          />
        </Tooltip>
      ))}
    </Grid>
  );
};
