import React from "react";
import { ArrowRight, Send } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import CalendarUpgraded from "../../../src/Components/component_TrangChu/Calendar"
import NewCustomersCard from "../../../src/Components/component_TrangChu/New_Customer"
import CustomersRevenueSection from "../../../src/Components/component_TrangChu/CustomerAndRevenue"

const MainPages = () => {

  const barData = [
    { name: "Sat", alert: 480, normal: 320 },
    { name: "Sun", alert: 300, normal: 180 },
    { name: "Mon", alert: 320, normal: 250 },
    { name: "Tue", alert: 470, normal: 300 },
    { name: "Wed", alert: 200, normal: 150 },
    { name: "Thu", alert: 400, normal: 270 },
    { name: "Fri", alert: 390, normal: 290 },
  ];


  const pieData = [
    { name: "New", value: 62, color: "#6366F1" },
    { name: "Active", value: 13, color: "#818CF8" },
    { name: "Inactive", value: 23, color: "#CBD5E1" },
  ];
  
    const revenue = [
    { name: "Aug", value: 8500 },
    { name: "Sep", value: 9500 },
    { name: "Oct", value: 7000 },
    { name: "Nov", value: 9000 },
    { name: "Dec", value: 12500 },
    { name: "Jan", value: 8700 },
  ];


  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-gradient-to-br from-gray-50 to-indigo-50  min-h-screen">
      {/* LEFT SIDE */}
      <div className="col-span-2 flex flex-col gap-6">
        {/* Banner */}
        <div className="flex justify-between bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div>
            <h2 className="text-xl font-semibold">
              Hello <span className="font-bold">Tassy Omah</span>,
            </h2>
            <p className="text-sm opacity-90 mt-1">
              Have a nice day and don’t forget to take care of your health!
            </p>
            <button className="mt-5 flex items-center gap-2 text-sm bg-white/90 text-indigo-700 px-4 py-2 rounded-full shadow hover:bg-white transition">
              Learn More <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4163/4163765.png"
            alt="Yoga"
            className="w-40 h-40 object-contain drop-shadow-lg"
          />
        </div>

        {/* Customers + Revenue */}
     
          <CustomersRevenueSection pieData={pieData} revenue={revenue} />
       

        {/* Alert Chart */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-md hover:shadow-lg p-5 transition">
          <h3 className="text-gray-700 font-semibold mb-3">Alert Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#A1A1AA" />
              <YAxis stroke="#A1A1AA" />
              <Tooltip />
              <Bar dataKey="alert" fill="#6366F1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="normal" fill="#22D3EE" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2 text-sm text-gray-600">
            <span>
              <span className="inline-block w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
              Alert
            </span>
            <span>
              <span className="inline-block w-3 h-3 bg-cyan-400 rounded-full mr-2"></span>
              Normal
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-6">

        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-md hover:shadow-lg p-5 transition">
            <NewCustomersCard />
        </div>




        {/* Calendar */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-md hover:shadow-lg p-6 transition">
          <CalendarUpgraded />
        </div>
      </div>
    </div>
  );
};

export default MainPages;