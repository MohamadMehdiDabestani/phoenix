import TreeItem from "@mui/lab/TreeItem";
export const Item = (props) => {
  return (
    <TreeItem nodeId={`${Math.random()}`} label={props.label}>
      {props.children}
    </TreeItem>
  );
};
