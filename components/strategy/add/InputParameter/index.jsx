import { Grid } from "@mui/material";
import { IndicatorInput } from "@/components";
import { useIndicator } from "@/hooks/useIndicator";
import { Fragment } from "react";
import { updateParameters } from "@/redux/action/strategy/Actions";
import { useDispatch } from "react-redux";
export const IndicatorParameter = () => {
  const { currentStrategy } = useIndicator();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(
      updateParameters({
        name: e.target.name,
        value: Number.parseInt(e.target.value),
      })
    );
  };
  if (currentStrategy.parameters === null) {
    return <Fragment></Fragment>;
  }
  return (
    <Grid container sx={{ margin: "20px 0" }}>
      {currentStrategy.parameters.map((el, idx) => (
        <Fragment key={idx}>
          {typeof el.static === "undefined" && (
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={6}
              xs={12}
              sx={{ padding: "0 10px", margin: "10px 0" }}
            >
              <IndicatorInput change={handleChange} {...el} />
            </Grid>
          )}
        </Fragment>
      ))}
    </Grid>
  );
};
