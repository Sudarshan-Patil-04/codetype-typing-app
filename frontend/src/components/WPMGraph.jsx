import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale)

const WPMGraph = ({ wpmHistory }) => {
  const data = {
    labels: wpmHistory.map((_, i) => i + 1),
    datasets: [
      {
        data: wpmHistory,
        borderColor: "#4ade80",
        tension: 0.3
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { beginAtZero: true }
    }
  }

  return <Line data={data} options={options} />
}

export default WPMGraph
