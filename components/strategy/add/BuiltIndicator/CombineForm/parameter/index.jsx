import { Grid } from "@mui/material";
import { Fragment } from "react";
import { IndicatorInput } from "@/components";
import { useIndicator } from "@/hooks/useIndicator";
import { useDispatch } from "react-redux";
import { updateCombineIndicatorParameter } from "@/redux/action/strategy/Actions";
export const Parameter = () => {
  const { currentCombine } = useIndicator();
  const dispatch = useDispatch();
  if (
    currentCombine.parametersCombine === undefined ||
    currentCombine.parametersCombine === null
  )
    return <Fragment></Fragment>;
  const handleChange = (e) => {
    dispatch(
      updateCombineIndicatorParameter({
        name: e.target.name,
        value: Number.parseInt(e.target.value),
      })
    );
  };
  return (
    <Fragment>
      {currentCombine.parametersCombine.map((el, idx) => (
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={idx}>
          <IndicatorInput change={handleChange} {...el} />
        </Grid>
      ))}
    </Fragment>
  );
};
