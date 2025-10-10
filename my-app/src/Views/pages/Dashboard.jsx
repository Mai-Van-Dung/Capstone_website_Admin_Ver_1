import React from "react";
import { ArrowRight, Calendar, Send } from "lucide-react";
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

const Dashboard = () => {
  const pieData = [
    { name: "New", value: 62, color: "#2563EB" },
    { name: "Active", value: 13, color: "#60A5FA" },
    { name: "Inactive", value: 23, color: "#CBD5E1" },
  ];

  const barData = [
    { name: "Sat", alert: 480, normal: 320 },
    { name: "Sun", alert: 300, normal: 180 },
    { name: "Mon", alert: 320, normal: 250 },
    { name: "Tue", alert: 470, normal: 300 },
    { name: "Wed", alert: 200, normal: 150 },
    { name: "Thu", alert: 400, normal: 270 },
    { name: "Fri", alert: 390, normal: 290 },
  ];

  const revenue = [
    { name: "Aug", value: 8500 },
    { name: "Sep", value: 9500 },
    { name: "Oct", value: 7000 },
    { name: "Nov", value: 9000 },
    { name: "Dec", value: 12500 },
    { name: "Jan", value: 8700 },
  ];

  const newCustomers = [
    {
      name: "Livia Bator",
      role: "CEO",
      img: "https://i.pravatar.cc/100?img=1",
    },
    {
      name: "Randy Press",
      role: "Director",
      img: "https://i.pravatar.cc/100?img=2",
    },
    {
      name: "Workman",
      role: "Designer",
      img: "https://i.pravatar.cc/100?img=3",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
      {/* LEFT SIDE */}
      <div className="col-span-2 flex flex-col gap-6">
        {/* Banner */}
        <div className="flex justify-between bg-indigo-600 text-white p-6 rounded-2xl shadow-md">
          <div>
            <h2 className="text-lg font-semibold">
              Hello <span className="font-bold">Tassy Omah</span>,
            </h2>
            <p className="text-sm opacity-90">
              Have a nice day and don’t forget to take care of your health!
            </p>
            <button className="mt-4 flex items-center gap-2 text-sm bg-white text-indigo-600 px-4 py-2 rounded-full shadow hover:bg-gray-100">
              Learn More <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4163/4163765.png"
            alt="Yoga"
            className="w-40 h-40 object-contain"
          />
        </div>

        {/* Customers + Revenue */}
        <div className="grid grid-cols-2 gap-6">
          {/* Customers */}
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h3 className="text-gray-700 font-semibold mb-3">Customers</h3>
            <p className="text-3xl font-bold text-gray-800 mb-2">4,209</p>
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex justify-around text-sm text-gray-500">
              {pieData.map((item) => (
                <li key={item.name}>
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  {item.name} {item.value}%
                </li>
              ))}
            </ul>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-gray-700 font-semibold">Increasing Revenue</h3>
              <span className="text-sm text-indigo-600 cursor-pointer hover:underline">
                See All
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={revenue}>
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Bar dataKey="value" fill="#34D399" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-right text-gray-700 mt-2 text-sm">
              Highest: $12,500 (Dec)
            </p>
          </div>
        </div>

        {/* Alert Chart */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-gray-700 font-semibold mb-3">Số lần cảnh báo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Bar dataKey="alert" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="normal" fill="#22D3EE" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2 text-sm text-gray-600">
            <span>
              <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
              Cảnh báo
            </span>
            <span>
              <span className="inline-block w-3 h-3 bg-cyan-400 rounded-full mr-2"></span>
              Không cảnh báo
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
<div className="flex flex-col gap-6">
  {/* 💠 New Customers */}
  <div className="bg-white rounded-2xl shadow-md p-5 transition hover:shadow-lg">
  <div className="flex justify-between items-center mb-3">
    <h3 className="text-base font-semibold text-gray-800">New Customers</h3>
    <span className="text-xs text-indigo-500 font-medium cursor-pointer hover:underline">
      View all
    </span>
  </div>

  {/* Customer Avatars */}
  <div className="flex justify-evenly mb-4">
    {newCustomers.map((user) => (
      <div
        key={user.name}
        className="flex flex-col items-center group w-[90px]"
      >
        <div className="relative">
          <img
            src={user.img}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm group-hover:ring-2 ring-indigo-300 transition"
          />
          <div className="absolute -bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></div>
        </div>
        <p className="font-medium text-gray-800 mt-1 text-[13px] truncate max-w-[80px] text-center group-hover:text-indigo-600">
          {user.name}
        </p>
        <p className="text-[11px] text-gray-400">{user.role}</p>
      </div>
    ))}
  </div>

  {/* Send Money Section (compact design) */}
  <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400 transition">
    <input
      type="number"
      placeholder="Enter amount..."
      className="flex-1 px-4 py-2 bg-transparent outline-none text-sm text-gray-700"
    />
    <button className="flex items-center justify-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-all">
      <Send className="w-4 h-4" />
      Send
    </button>
  </div>
</div>

  {/* 🗓️ Calendar + Reminder */}
  <div className="bg-white rounded-3xl shadow-lg p-6 transition hover:shadow-xl">
    <div className="flex justify-between items-center mb-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <Calendar className="w-5 h-5 text-indigo-500" />
        March 2025
      </h3>
      <button className="bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-indigo-200 transition">
        + Add Reminder
      </button>
    </div>

    {/* Calendar Grid */}
    <div className="grid grid-cols-7 text-center text-gray-500 text-sm gap-2 mb-4">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
        <div key={day} className="font-medium text-gray-600">
          {day}
        </div>
      ))}
      {Array.from({ length: 31 }).map((_, i) => {
        const day = i + 1;
        const isToday = day === 11;
        return (
          <div
            key={day}
            className={`py-2 rounded-full transition cursor-pointer ${
              isToday
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md"
                : "hover:bg-indigo-50 text-gray-700"
            }`}
          >
            {day}
          </div>
        );
      })}
    </div>

    {/* Upcoming Reminder Card */}
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-4 flex flex-col items-start shadow-md">
      <h4 className="font-semibold text-sm mb-1">Upcoming Reminder</h4>
      <p className="text-xs opacity-90">Team meeting at 10:00 AM</p>
      <button className="mt-3 bg-white text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-100 transition">
        View Details
      </button>
    </div>
  </div>
</div>

    </div>
  );
};

export default Dashboard;
