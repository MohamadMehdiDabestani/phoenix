import { Button, Paper, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { Box } from "@mui/system";

// import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleLoading } from "@/redux/action/Actions";
import { Fragment } from "react";

import { useApi } from "@/hooks/useApi";
export const Item = ({ title, price, options, not, btnType, type }) => {
  // const router = useRouter();
  const dispatch = useDispatch();
  const { postHandeled } = useApi({
    baseUrl: process.env.NEXT_PUBLIC_NEXT_URI_API,
  });
  const handleClick = (t) => {
    if (t === "payment") {
      dispatch(
        toggleLoading({
          show: true,
          isGlobal: true,
        })
      );
      postHandeled(
        "/user/transaction",
        {
          amount: 50,
          customField: JSON.stringify({
            title: "description",
          }),
        },
        (d) => {
          console.log(d);
        },
        () => {
          dispatch(
            toggleLoading({
              show: false,
              isGlobal: false,
            })
          );
        }
      );
    }
  };

  return (
    <Fragment>
      {type == "contact" ? (
        <Paper
          sx={{
            color:"white",
            padding: "10px",
            height: "100%",
            // .css-selector {
            background:
              "linear-gradient(270deg, #01579b, #3d5afe, #8c9eff, #64b5f6)",
            backgroundSize: "800% 800%",

            // -webkit-animation: AnimationName 17s ease infinite;
            // -moz-animation: AnimationName 17s ease infinite;
            animation: "AnimationName 17s ease infinite",
            // }

            // @-webkit-keyframes AnimationName {
            //     0%{background-position:0% 50%}
            //     50%{background-position:100% 50%}
            //     100%{background-position:0% 50%}
            // }
            // @-moz-keyframes AnimationName {
            //     0%{background-position:0% 50%}
            //     50%{background-position:100% 50%}
            //     100%{background-position:0% 50%}
            // }
            "@keyframes AnimationName": {
              "0%": { backgroundPosition: "0% 50%" },
              "50%": { backgroundPosition: "100% 50%" },
              "100%": { backgroundPosition: "0% 50%" },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                component="p"
                variant="h5"
                textAlign="center"
                mb="15px"
              >
                {title}
              </Typography>
              <Typography component="p" textAlign="center" mb="15px">
                {typeof price === "number"
                  ? `${Number(price.toFixed(1)).toLocaleString()} تومان`
                  : price}
              </Typography>
              {options.map((e, idx) => (
                <Box key={idx} display="flex" alignItems="center" mb="10px">
                  <CheckCircleOutlineIcon
                    sx={{ mr: "5px" }}
                    fontSize="small"
                    color="success"
                  />
                  <Typography component="p" variant="body1" textAlign="center">
                    {e}
                  </Typography>
                </Box>
              ))}
              {not.map((e, idx) => (
                <Box key={idx} display="flex" alignItems="center" mb="10px">
                  <DoDisturbIcon
                    sx={{ mr: "5px" }}
                    fontSize="small"
                    color="error"
                  />

                  <Typography component="p" variant="body1" textAlign="center">
                    {e}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
                onClick={() => handleClick(type)}
                fullWidth
                sx={{ mt: "15px" }}
                variant="contained"
              >
                ادامه
              </Button>
          </Box>
        </Paper>
      ) : (
        <Paper
          sx={{
            padding: "10px",
            height: "100%",
            ...(type == "contact" && { background: "red" }),
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                component="p"
                variant="h5"
                textAlign="center"
                mb="15px"
              >
                {title}
              </Typography>
              <Typography component="p" textAlign="center" mb="15px">
                {typeof price === "number"
                  ? `${Number(price.toFixed(1)).toLocaleString()} تومان`
                  : price}
              </Typography>
              {options.map((e, idx) => (
                <Box key={idx} display="flex" alignItems="center" mb="10px">
                  <CheckCircleOutlineIcon
                    sx={{ mr: "5px" }}
                    fontSize="small"
                    color="success"
                  />
                  <Typography component="p" variant="body1" textAlign="center">
                    {e}
                  </Typography>
                </Box>
              ))}
              {not.map((e, idx) => (
                <Box key={idx} display="flex" alignItems="center" mb="10px">
                  <DoDisturbIcon
                    sx={{ mr: "5px" }}
                    fontSize="small"
                    color="error"
                  />

                  <Typography component="p" variant="body1" textAlign="center">
                    {e}
                  </Typography>
                </Box>
              ))}
            </Box>

            {btnType === "submit" ? (
              <Button
                onClick={() => handleClick(type)}
                fullWidth
                sx={{ mt: "15px" }}
                variant="contained"
              >
                خرید
              </Button>
            ) : (
              <Button
                onClick={() => handleClick(type)}
                fullWidth
                sx={{ mt: "15px" }}
                variant="outlined"
              >
                ثبت نام
              </Button>
            )}
          </Box>
        </Paper>
      )}
    </Fragment>
  );
};
