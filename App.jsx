import React from "react";
import LineChart from "./src/screen/LineChartDemo/LineChartDemo";

const App = () => {
  const labels = React.useRef([]);
  const datasets = React.useRef([]);
  const timer = React.useRef(null);

  // line chart data should always start with one value.
  const [chartData, setChartData] = React.useState({
    labels: [1],
    datasets: [{ data: [10] }],
  });

  const _setChartData = () => {
    setChartData({
      labels: labels.current ?? [],
      datasets: [{ data: datasets.current ?? [] }],
    });
  };

  const updateValues = () => {
    const labelsData = [...labels.current];
    const dataSetsData = [...datasets.current];

    labelsData.push(parseInt(Math.random(), 10));
    dataSetsData.push(labelsData.length * 10);

    labels.current = labelsData;
    datasets.current = dataSetsData;

    _setChartData();
  };

  // update value in this component
  React.useEffect(() => {
    timer.current = setInterval(() => {
      updateValues();
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, [labels?.current?.length]);

  return <LineChart data={chartData} />;
};

export default App;
