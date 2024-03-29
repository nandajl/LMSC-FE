import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

const DoughnutChart = (chartData) => {
  // const { data } = chartData.chartData;
  // console.log(data);
  return (
    <>
      <Doughnut
        datasetIdKey='id'
        data={chartData.chartData} />
    </>
  )
}

export default DoughnutChart