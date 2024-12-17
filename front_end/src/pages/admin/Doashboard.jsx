import React from "react";
import ViewStatistics from "./ViewStatistics";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <ViewStatistics />
    </div>
  );
};

export default Dashboard;
