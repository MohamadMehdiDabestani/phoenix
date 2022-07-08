export const SlopeADX = (props) => {
  return <div>{props.row.ADX_way === "downside" ? "رو به پایین": props.row.ADX_way === "upside" ? "رو به بالا": "خنثی"}</div>;
};
