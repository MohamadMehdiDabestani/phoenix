import fa from "apexcharts/dist/locales/fa.json";
import dynamic from "next/dynamic";
const ChartComponent = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const Chart = (props) => {
  return (
    <ChartComponent
      options={{
        chart: {
          type: "line",
          height: 350,
          locales: [fa],
          defaultLocale: "fa",
          toolbar: {
            show: true,
            tools: {
              download: false,
            },
          },
          ...props.options?.chart,
        },
        tooltip: {
          enabled:false
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#26a69a",
              downward: "#ef5350",
            },
          },
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
        stroke: {
          width: [1, 1],
        },
        ...props.options,
      }}
      width={props.width}
      series={props.series}
      {...props.rest}
    />
  );
};
