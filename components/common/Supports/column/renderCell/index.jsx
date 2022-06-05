import { Chip, Tooltip, Typography } from "@mui/material";
import { Fragment } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
export const RenderCellSandR = (props) => {
  const [value, copy] = useCopyToClipboard(); // eslint-disable-line
  const [strategy, _] = useLocalStorage("strategy"); // eslint-disable-line
  return (
    <Fragment>
      <Typography>حمایت و مقاومت ها</Typography>
      {strategy.indicators
        .find((e) => e.name === "S&R")
        .settings.find((e) => e.name === "timeFrames")
        .value.map((e, idx) => (
          <Fragment key={idx}>
            {props["S&R"][e].length > 0 ? (
              <Fragment>
                {props["S&R"][e].map((line, idx) => (
                  <Tooltip
                    title="کپی"
                    key={idx}
                    disableInteractive
                    placement="top"
                    arrow
                  >
                    <Chip
                      label={`${e}:${line}`}
                      sx={{ marginLeft: "3px" }}
                      size="small"
                      onClick={() => copy(line)}
                    />
                  </Tooltip>
                ))}
              </Fragment>
            ) : (
              <CloseIcon color="error" />
            )}
          </Fragment>
        ))}
    </Fragment>
  );
};
