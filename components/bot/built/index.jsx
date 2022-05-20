import { Item } from "./item";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Fragment } from "react";
export const Built = () => {
  const [botStrategy, setBotStrategy] = useLocalStorage("botStrategy", {}); // eslint-disable-line
  console.log("botStrategy.listTypes" , botStrategy.listTypes.filter((l) => l.isActive == true));
  return (
    <Item label="استراتژی">
      <Item label={`وضعیت : ${botStrategy.status ? "فعال" : "غیر فعال"}`} />
      <Item label={`تایم فریم : ${botStrategy.timeFrame}`} />
      <Item
        label={`درصد سرمایه در هر معامله : %${botStrategy.precentage.value}`}
      />
      <Item label={`نسب سود/ضرر : ${botStrategy.reward.value}`} />
      <Item
        label={`طریقه ی تنظیم استاپ لاس : ${
          botStrategy.strategy.stopOptions.find((e) => e.isActive).label
        }`}
      />
      <Item
        label={`طریقه ی مدیریت معاملات : ${
          botStrategy.orderManagment.find((e) => e.isActive).label
        }`}
      />
      <Item label={`نوع چارت : ${botStrategy.chartType}`} />
      <Item label={`بازا : ${botStrategy.market}`} />
      <Item label={`اهرم : ${botStrategy.leverage}`} />
      <Item
        label={`بررسی بیت کوین برای معاملات : ${
          botStrategy.checkBtc ? "فعال" : "غیر فعال"
        }`}
      />
      <Item
        label={`استفاده از فیلتر adx : ${
          botStrategy.adxFilter ? "فعال" : "غیر فعال"
        }`}
      />
      <Item label={`نوع خرید ها: ${botStrategy.orderType}`} />
      {botStrategy.filterCoin.length > 0 && (
        <Fragment>
          <Item
            label={`نوع لیست : ${
              botStrategy.listTypes.find((l) => l.isActive == true).label
            }`}
          />
          <Item label={`لیست : ${botStrategy.filterCoin.join(" , ")}`} />
        </Fragment>
      )}

      <Item label={botStrategy.strategy.displayName}>
        <Item label="تنظیمات">
          {botStrategy.strategy.parameters.map((parametr, idxp) => (
            <Item key={idxp} label={`${parametr.label} : ${parametr.value}`} />
          ))}
        </Item>
      </Item>
    </Item>
  );
};
