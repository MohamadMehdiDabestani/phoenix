export const SlopeDisplay = (props) => {
    return <div>{props.row[props.field] === "downside" ? "رو به پایین": props.row[props.field] === "upside" ? "رو به بالا": "خنثی"}</div>;
  };
  