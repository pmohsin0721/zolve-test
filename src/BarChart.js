import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./BarChart.css";

const BarChart = () => {
  const [languagesData, setLanguagesData] = useState([]);
  const [languagesCount, setLanguagesCount] = useState([]);
  useEffect(async () => {
    const res = await fetch(
      "https://api.stackexchange.com/2.2/tags?pagesize=30&order=desc&sort=popular&site=stackoverflow"
    );
    res.json().then(({ items }) => {
      let languages = [];
      let languagesCount = [];
      items.map((item) => {
        languages.push(item.name);
        languagesCount.push(item.count);
      });
      setLanguagesData(languages);
      setLanguagesCount(languagesCount);
      console.log(languages, languagesCount);
    });
  }, []);

  return (
    <div className="chart">
      <h1>Bar Chart on Programming Languages and the count of its users.</h1>
      {languagesData.length !== 0 && languagesCount.length !== 0 && (
        <Bar
          data={{
            labels: languagesData,
            datasets: [
              {
                label: "Most  used  langauge",
                data: languagesCount,
                backgroundColor: ["red"],
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default BarChart;
