import React from "react";
import { Send } from "lucide-react"; // hoặc đổi thành icon bạn dùng

// Bạn có thể truyền data từ ngoài, hoặc giữ mảng mẫu bên trong
const newCustomers = [
  { name: "Alice", role: "Designer", img: "https://i.pravatar.cc/100?img=1" },
  { name: "Bob", role: "Developer", img: "https://i.pravatar.cc/100?img=2" },
  { name: "Charlie", role: "Manager", img: "https://i.pravatar.cc/100?img=3" },
];

const NewCustomersCard = () => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-md hover:shadow-lg p-5 transition">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold text-gray-800">New Customers</h3>
        <span className="text-xs text-indigo-500 font-medium cursor-pointer hover:underline">
          View all
        </span>
      </div>

      <div className="flex justify-evenly mb-4">
        {newCustomers.map((user) => (
          <div key={user.name} className="flex flex-col items-center group w-[90px]">
            <div className="relative">
              <img
                src={user.img}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm group-hover:ring-4 ring-indigo-300 transition"
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
  );
};

export default NewCustomersCard;