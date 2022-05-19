import { TreeView } from "@mui/lab";
import { Grid, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { List } from "../list";

export const Info = ({ timeFrame }) => {
  return (
    <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
      <Typography variant="h6">جزئیات استراتژی ساخته شده : </Typography>
      <Typography sx={{ marginTop: "15px" }} variant="subtitle1">
        تایم فریم :{timeFrame}
      </Typography>
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
        <List />
      </TreeView>
    </Grid>
  );
};
