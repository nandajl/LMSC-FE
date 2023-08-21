import React from 'react'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

const PieChart = (chartData) => {
  // const { data } = chartData.chartData;
  // console.log(data);
  return (
    <>
      <Pie
        datasetIdKey='id'
        data={chartData.chartData} />
    </>
  )
}

export default PieChart