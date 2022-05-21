// import TradingViewWidget from "react-tradingview-widget";
import { GridAnalysis } from "@/components";
export const ListCoins = ({ apiUrl, nexUrl }) => {
  console.log("================================", apiUrl);
  return <GridAnalysis apiUrl={apiUrl} nexUrl={nexUrl} />;
};
