import React from "react";
import { Doughnut } from "react-chartjs-2";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  doughnutStyle: {
    width: 200,
    height: 200,
    position: "relative",
    // [theme.breakpoints.down("sm")]: {
    //   width: 100,
    //   height: 100,
    // },
  },
}));

const HalfDoughnutChart = (props) => {
  const classes = useStyles();
  const data = {
    datasets: [
      {
        data: props.data,
        borderWidth: 0.5,
        backgroundColor: ["#08B1E2", "#FFFFFF"],
        borderColor: "#3d7ebc",
        //borderWidth: 1,
      },
    ],
  };

  const options = {
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          ticks: { display: false },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: { display: false },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
    },
  };

  return (
    <div className={classes.doughnutStyle}>
      <p
        style={{
          position: "absolute",
          left: "55%",
          transform: "translate(-50%, 0)",
          fontSize: "12px",
          bottom: 30,
        }}
      >
        {(props.data ? props.data[0] / 10 : "").toString()}
      </p>
      <Doughnut data={data} options={options} height={0} />
    </div>
  );
};

export default HalfDoughnutChart;
