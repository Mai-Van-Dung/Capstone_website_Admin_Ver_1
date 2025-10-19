import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const CustomersRevenueSection = ({ pieData, revenue }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Customers */}
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl p-6 transition-all duration-300">
        <h3 className="text-gray-800 font-semibold text-lg mb-2">Customers</h3>
        <p className="text-4xl font-extrabold text-indigo-600 tracking-tight mb-4">4,209</p>

        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <ul className="flex justify-around text-sm text-gray-600 mt-3 border-t border-gray-200 pt-2">
          {pieData.map((item) => (
            <li key={item.name} className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
              {item.name} {item.value}%
            </li>
          ))}
        </ul>
      </div>

      {/* Revenue */}
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-lg p-6 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-800 font-semibold text-lg">Revenue Growth</h3>
          <span className="text-sm text-indigo-600 cursor-pointer hover:underline">See All</span>
        </div>

        <ResponsiveContainer
          width="100%"
          height={200}
          style={{ paddingLeft: "2px", paddingRight: "4px" , paddingTop : "25px" }} // Căn đẹp hai bên
        >
          <BarChart data={revenue} margin={{ left: 0, right: 10 }}>
            <XAxis dataKey="name" stroke="#A1A1AA" />
            <YAxis stroke="#A1A1AA" />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            />
            <Bar dataKey="value" fill="#10B981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <p className="text-right text-gray-700 mt-4 text-sm border-t border-gray-200 pt-3">
          Highest: <span className="text-green-600 font-semibold">$12,500</span> (Dec)
        </p>
      </div>

    </div>
  );
};

export default CustomersRevenueSection;