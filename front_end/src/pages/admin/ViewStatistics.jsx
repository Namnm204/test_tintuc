import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết cho biểu đồ
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ViewStatistics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://my-worker.namdaynay001.workers.dev/tintucs"
        );
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Tính tổng số lượt xem
  const totalViews = data.reduce((acc, item) => acc + item.view, 0);

  // Dữ liệu cho biểu đồ
  const chartData = {
    labels: data.map((item) => item.title), // Tên tin tức
    datasets: [
      {
        label: "Views",
        data: data.map((item) => item.view), // Số lượt xem
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false, // Tắt tiêu đề
      },
      tooltip: {
        enabled: true, // Giữ hover hiển thị tooltip
      },
    },
    scales: {
      x: {
        display: false, // Tắt trục x
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Thống kê lượt xem tin tức</h1>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">
          Tổng lượt xem hôm nay: {totalViews}
        </h2>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ViewStatistics;
