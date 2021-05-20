import React, { useRef, useState, useEffect } from "react";
import D3Chart from "../Charts/D3Chart";

const ChartWrapper = ({ data, setData, query1, query2 }) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new D3Chart(chartArea.current, data));
    } else {
      chart.update(data, setData, query1, query2);
    }
  }, [chart, query1, query2]);

  return <div className="chart-area" ref={chartArea}></div>;
};

export default ChartWrapper;
