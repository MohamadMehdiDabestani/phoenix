export const SlopeVWAP = (props) => {
    return <div>{props.row.vwap_way === "downside" ? "رو به پایین": props.row.vwap_way === "upside" ? "رو به بالا": "خنثی"}</div>;
  };
  