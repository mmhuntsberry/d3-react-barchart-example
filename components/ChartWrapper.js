import React, { useState, useRef, useEffect } from "react";
import D3Chart from "./D3Chart";

export const ChartWrapper = () => {
  const [chart, setChart] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    if (!chart) {
      setChart(new D3Chart(chart));
    } else {
      chart.update();
    }
  }, [chart]);

  return <div ref={chartContainer}></div>;
};
