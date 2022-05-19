import { useDispatch } from "react-redux";
import { Chip, Grid, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { removeItemBotkList } from "@/redux/action/bot/Actions";
export const BlackList = () => {
  const { filterCoin } = useSelector((state) => state.bot);
  const dispatch = useDispatch();

  const handle = (coinName) => {
    dispatch(removeItemBotkList(coinName));
  };
  return (
    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
      {filterCoin.map((e, idx) => (
        <Tooltip key={idx} title="حذف" arrow placement="top">
          <Chip
            icon={<HighlightOffIcon />}
            sx={{ margin: "5px 5px", cursor: "pointer" }}
            size="small"
            label={e.replaceAll(" ", "")}
            onClick={() => handle(e.replaceAll(" ", ""))}
          />
        </Tooltip>
      ))}
    </Grid>
  );
};
