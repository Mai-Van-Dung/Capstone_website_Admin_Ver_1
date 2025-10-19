import React, { useState } from "react";

export default function History() {
  const [activities] = useState([
    {
      id: "ACT-20250919-001",
      user: "Nguyễn Văn A (User)",
      device: "CAM-001 [Camera]",
      action: "Login",
      status: "Success",
      ip: "183.801.2.34",
      mac: "A4:5E:60:1B:2C:3D",
      time: "2025-09-19 14:32",
      note: "User login success at 14:32 from Chrome on Windows.",
    },
    {
      id: "ACT-20250919-002",
      user: "Trần Thị B (Admin)",
      device: "—",
      action: "Approve Registration",
      status: "Success",
      ip: "10.0.0.23",
      mac: "N/A",
      time: "2025-09-19 13:08",
      note: "Approved user registration request.",
    },
    {
      id: "ACT-20250918-014",
      user: "Phạm Minh C (User)",
      device: "ACC-202 [Sensor]",
      action: "Add Device",
      status: "Pending",
      ip: "N/A",
      mac: "N/A",
      time: "2025-09-18 09:12",
      note: "Device registration pending approval.",
    },
    {
      id: "ACT-20250917-033",
      user: "Hệ thống",
      device: "CAM-001 [Camera]",
      action: "Camera Offline",
      status: "Failed",
      ip: "183.801.2.34",
      mac: "A4:5E:60:1B:2C:3D",
      time: "2025-09-17 18:44",
      note: "Camera connection lost due to network error.",
    },
  ]);

  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-col p-6 gap-6 bg-gray-50 min-h-screen">
      {/* === Header cards === */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 shadow flex flex-col justify-between">
          <span className="text-gray-500">Total Activities</span>
          <span className="text-2xl font-bold">5,432</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow flex flex-col justify-between">
          <span className="text-gray-500">Successful</span>
          <span className="text-2xl font-bold text-green-500">5,120</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow flex flex-col justify-between">
          <span className="text-gray-500">Failed / Errors</span>
          <span className="text-2xl font-bold text-red-500">312</span>
        </div>
      </div>

      {/* === Filter bar === */}
      <div className="bg-white flex flex-wrap items-center gap-3 p-3 rounded-xl shadow">
        <input
          type="text"
          placeholder="🔍 Search activity..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 w-56"
        />
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
          <option>User: All</option>
          <option>Nguyễn Văn A</option>
          <option>Trần Thị B</option>
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
          <option>Action: Any</option>
          <option>Login</option>
          <option>Add Device</option>
          <option>Approve Registration</option>
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
          <option>Status: Any</option>
          <option>Success</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
        <input
          type="text"
          placeholder="📅 Date: 2025-09-01 → 2025-09-19"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 flex-1"
        />
      </div>

      {/* === Activity Table === */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Activity ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Camera Device</th>
              <th className="p-3">Jewelry Device</th>
              <th className="p-3">Action</th>
              <th className="p-3">Status</th>
           
              <th className="p-3">Timestamp</th>
              <th className="p-3 text-center">Detail</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {activities.map((a, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">{a.id}</td>
                <td className="p-3">{a.user}</td>
                <td className="p-3">{a.device}</td>
                <td className="p-3">{a.device}</td>
                <td className="p-3">{a.action}</td>
                <td className="p-3">
                  {a.status === "Success" && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                      Success
                    </span>
                  )}
                  {a.status === "Pending" && (
                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  )}
                  {a.status === "Failed" && (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                      Failed
                    </span>
                  )}
                </td>
                

                <td className="p-3">{a.time}</td>
                <td
                  className="p-3 text-blue-500 cursor-pointer hover:underline text-center"
                  onClick={() => setSelected(a)}
                >
                  View
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end items-center p-3 text-sm text-gray-500">
          <span className="mr-2">Rows per page:</span>
          <select className="border rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>20</option>
          </select>
          <div className="ml-4 flex items-center gap-2">
            <button className="text-gray-400 hover:text-gray-600">1</button>
            <button className="text-gray-400 hover:text-gray-600">2</button>
            <button className="text-gray-400 hover:text-gray-600">3</button>
            <span>Next ›</span>
          </div>
        </div>
      </div>

      {/* === Detail View === */}
      {selected && (
        <div className="bg-white rounded-xl shadow p-6 mt-4">
          <h2 className="text-gray-700 font-semibold mb-4">
            View Activity • <span className="text-blue-600">{selected.id}</span>
          </h2>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">User</label>
              <input
                type="text"
                value={selected.user}
                readOnly
                className="w-full border px-3 py-2 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Activity ID</label>
              <input
                type="text"
                value={selected.id}
                readOnly
                className="w-full border px-3 py-2 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Action</label>
              <input
                type="text"
                value={selected.action}
                readOnly
                className="w-full border px-3 py-2 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Timestamp</label>
              <input
                type="text"
                value={selected.time}
                readOnly
                className="w-full border px-3 py-2 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Device</label>
              <input
                type="text"
                value={selected.device}
                readOnly
                className="w-full border px-3 py-2 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">IP Address</label>
              <input
                type="text"
                value={selected.ip}
                readOnly
                className="w-full border px-3 py-2 rounded-lg bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-gray-600 text-sm mb-1">MAC Address</label>
              <input
                type="text"
                value={selected.mac}
                readOnly
                className="w-full border px-3 py-2 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Status</label>
              <input
                type="text"
                value={selected.status}
                readOnly
                className={`w-full border px-3 py-2 rounded-lg font-semibold ${
                  selected.status === "Success"
                    ? "text-green-600"
                    : selected.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                } bg-gray-50`}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Message / Notes
            </label>
            <textarea
              value={selected.note}
              readOnly
              rows="3"
              className="w-full border px-3 py-2 rounded-lg bg-gray-50"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Download Log
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}