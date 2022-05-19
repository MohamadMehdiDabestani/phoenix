import { useSelector } from "react-redux";
import { indicators, botStrategy } from "@/indicatorsConfig";

export const useIndicator = () => {
  const state = useSelector((state) => state.strategy);

  const getCurrent = (list) => {
    return list.find((el) => el.completed === false);
  };
  const currentStrategy = getCurrent(state.indicators);
  const currentCombine = getCurrent(state.combine);
  const getInidcatorById = (id) => {
    return indicators.find((el) => el.id === id);
  };
  const getMovingName = () => {
    let names = [];
    indicators
      .filter((el) => el.type === "moving")
      .map((el) => {
        names.push({ title: el.displayName, id: el.id });
      });
    return names;
  };
  const getNames = () => {
    let names = [];
    indicators.map((el) => {
      names.push({ title: el.displayName, id: el.id });
    });
    return names;
  };
  const getBotStrategyName = () => {
    let names = [];
    botStrategy.map((el) => {
      names.push({ title: el.displayName, id: el.id });
    });
    return names;
  };
  const getStrategyById = (id) => {
    return botStrategy.find((el) => el.id === id);
  };
  return {
    getStrategyById,
    getNames,
    getInidcatorById,
    currentStrategy,
    currentCombine,
    getMovingName,
    getBotStrategyName,
  };
};
