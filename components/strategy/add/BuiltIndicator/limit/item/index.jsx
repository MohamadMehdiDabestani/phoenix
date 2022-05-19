import { IndicatorInput } from "@/components";
import { setLimitValue } from "@/redux/action/strategy/Actions";
import { Grid } from "@mui/material";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
const items = [
  {
    label: "روز",
    value: "day",
  },
  {
    label: "ساعت",
    value: "hours",
  },
  {
    label: "دقیقه",
    value: "minutes",
  },
];
export const Item = ({ timeFrame }) => {
  const { limit } = useSelector((state) => state.strategy);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(
      setLimitValue({
        timeFrame: e.target.name.split("_")[0],
        type: e.target.name.split("_")[1],
        value: Number.parseInt(e.target.value),
      })
    );
  };
  return (
    <Fragment>
      {items.map((el, idx) => (
        <Grid item xl={4} lg={4} md={4} sm={4} xs={12} key={idx}>
          <IndicatorInput
            label={el.label}
            name={`${timeFrame}_${el.value}`}
            change={handleChange}
            value={limit.value.find((e) => e.timeFrame === timeFrame)[el.value]}
          />
        </Grid>
      ))}
    </Fragment>
  );
};
