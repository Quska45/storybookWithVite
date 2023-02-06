import moment from 'moment'
import { currentTime, getRandomIntInclusive } from './FlowBiteSvelteLineChart'

export const data = {
  labels: [
    // newDate(0),
    // newDate(1),
    // newDate(2),
    // newDate(3),
    // newDate(4),
    // newDate(5),
    // newDate(6)
    currentTime()
  ],
  datasets: [
    {
      label: 'My First dataset',
      fill: true,
      lineTension: 0.3,
      backgroundColor: 'rgba(225, 204,230, .3)',
      borderColor: 'rgb(205, 130, 158)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgb(205, 130,1 58)',
      pointBackgroundColor: 'rgb(255, 255, 255)',
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgb(0, 0, 0)',
      pointHoverBorderColor: 'rgba(220, 220, 220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        // randomScalingFactor(),
        // randomScalingFactor(),
        // randomScalingFactor(),
        // randomScalingFactor(),
        // randomScalingFactor(),
        // randomScalingFactor(),
        // randomScalingFactor()
        getRandomIntInclusive(0,101)
      ],
    },
    {
      label: 'My Second dataset',
      fill: true,
      lineTension: 0.3,
      backgroundColor: 'rgba(184, 185, 210, .3)',
      borderColor: 'rgb(35, 26, 136)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgb(35, 26, 136)',
      pointBackgroundColor: 'rgb(255, 255, 255)',
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgb(0, 0, 0)',
      pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        // randomScalingFactor(),
        // randomScalingFactor(),
        // randomScalingFactor(),
        // randomScalingFactor(),
        // randomScalingFactor(),
        // randomScalingFactor(),
        // randomScalingFactor()
        getRandomIntInclusive(0,101)
      ],
    },
  ],
};

export let zoomOption = {
  zoom: {
    zoom: {
      wheel: {
        enabled: true
      },
      pinch: {
        enabled: true
      },
      mode: "xy"
    },
    pan: {
      enabled: true
    }
  }
}

export let options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
        ticks: {
            beginAtZero: true
        }
    }]
  },
  plugins: zoomOption
}

export function newDate(days) {
  return moment().add(days, "d").toDate();
}

export function randomScalingFactor() {
  return Math.floor(Math.random() * 101);
}