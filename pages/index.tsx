import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import EditableTimeline from "../components/chart/EditableTimeline";
import TimelineChart from "../components/chart/TimelineChart";

const ChartNoSSR = dynamic(() => import("react-apexcharts"), { ssr: false });

const Home: NextPage = () => {
  const [options] = useState<ApexCharts.ApexOptions>({
    colors: ["#008FFB"],
    chart: {
      height: 200,
      type: "rangeBar",
      zoom: {
        type: "y",
        autoScaleYaxis: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
        // borderRadius: 4,
      },
    },
    grid: {
      // show: false,
    },
    xaxis: {
      // tickAmount: 1,
      type: "datetime",
      axisTicks: {
        // show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: ["#ffffff"],
        },
      },
    },
    yaxis: {
      // tickAmount: 1,
      // min: 3,
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: ["#ffffff"],
        },
      },
    },
    stroke: {
      width: 1,
    },
    fill: {
      type: "solid",
      opacity: 0.6,
    },
  });
  const [series] = useState(() => {
    const data = [];
    for (let i = 0; i < 5; i++) {
      data.push({
        x: "Design " + i,
        y: [new Date("2019-03-05").getTime(), new Date("2019-03-08").getTime() + Math.random() * 10000],
      });
      data.push({
        x: "Design " + i,
        y: [new Date("2019-03-06").getTime() + Math.random() * 1000000, new Date("2019-03-08").getTime() + Math.random() * 10000],
      });
    }

    return [
      {
        name: "Free",
        data,
      },
    ];
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-3/4 max-h-72 overflow-y-auto">
        <ChartNoSSR options={options} series={series} type="rangeBar" height="100%" />
      </div>
      <EditableTimeline />
      {/* <div className="w-3/4">
        <TimelineChart />
      </div> */}
      {/* <EditableTimeline /> */}
      {/* <svg>
        <rect x="100" y="0" width="100" height="100" className="fill-primary" />
      </svg> */}
      {/* <svg width="80%" height={400}>
        <g transform="translate(100, 100)">
          <rect x={120} y={25} width="90%" height={100} className="fill-primary" />
        </g>
      </svg> */}
    </div>
  );
};

export default Home;
