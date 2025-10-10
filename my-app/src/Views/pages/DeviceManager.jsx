import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function DeviceManager() {
  const [devices] = useState([
    {
      id: "CAM-001",
      name: "Camera Living Room",
      type: "Camera",
      model: "Hikvision DS-2CD2T",
      mac: "A4:5E:60:1B:2C:3D",
      location: "Room 101 – Tòa A",
      status: "Online",
      lastActive: "2025-09-19",
    },
    {
      id: "ACC-202",
      name: "Door Sensor",
      type: "Sensor",
      model: "ADXL345",
      mac: "N/A",
      location: "Room 202 – Tòa A",
      status: "Offline",
      lastActive: "2025-09-10",
    },
    {
      id: "SVR-001",
      name: "Central Server",
      type: "Server",
      model: "Dell R240",
      mac: "00:1A:2B:3C:4D:5E",
      location: "Data Center",
      status: "Maintenance",
      lastActive: "2025-09-17",
    },
  ]);

  return (
    <div className="flex flex-col p-6 gap-6 bg-gray-50 min-h-screen">
      {/* === Header cards === */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 shadow flex flex-col justify-between">
          <span className="text-gray-500">Total Devices</span>
          <span className="text-2xl font-bold">128</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow flex flex-col justify-between">
          <span className="text-gray-500">Online</span>
          <span className="text-2xl font-bold text-green-500">104</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow flex flex-col justify-between">
          <span className="text-gray-500">Offline</span>
          <span className="text-2xl font-bold text-red-500">24</span>
        </div>
      </div>

      {/* === Filter/Search Bar === */}
      <div className="bg-white flex items-center gap-4 p-3 rounded-xl shadow">
        {/* Search box */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-64">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search devices..."
            className="ml-2 flex-1 outline-none bg-transparent text-sm"
          />
        </div>

        {/* Dropdown filters */}
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
          <option>Type: All</option>
          <option>Camera</option>
          <option>Sensor</option>
          <option>Server</option>
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
          <option>Status: Any</option>
          <option>Online</option>
          <option>Offline</option>
          <option>Maintenance</option>
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
          <option>Location: All</option>
          <option>Room 101 – Tòa A</option>
          <option>Room 202 – Tòa A</option>
          <option>Data Center</option>
        </select>

        <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">
          Reset
        </button>
      </div>

      {/* === Devices Table === */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Device ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Model</th>
              <th className="p-3">MAC</th>
              <th className="p-3">Location</th>
              <th className="p-3">Status</th>
              <th className="p-3">Last Active</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {devices.map((device, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">{device.id}</td>
                <td className="p-3">{device.name}</td>
                <td className="p-3">{device.type}</td>
                <td className="p-3">{device.model}</td>
                <td className="p-3">{device.mac}</td>
                <td className="p-3">{device.location}</td>
                <td className="p-3">
                  {device.status === "Online" && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                      Online
                    </span>
                  )}
                  {device.status === "Offline" && (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                      Offline
                    </span>
                  )}
                  {device.status === "Maintenance" && (
                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">
                      Maintenance
                    </span>
                  )}
                </td>
                <td className="p-3">{device.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-3 text-sm text-gray-500">
          <span>Rows per page: </span>
          <select className="border rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>20</option>
          </select>
          <div className="ml-auto flex items-center gap-2">
            <button className="text-gray-400 hover:text-gray-600">1</button>
            <button className="text-gray-400 hover:text-gray-600">2</button>
            <button className="text-gray-400 hover:text-gray-600">3</button>
            <span>Next ›</span>
          </div>
        </div>
      </div>

      {/* === View/Edit Device Form === */}
      <div className="bg-white rounded-xl shadow p-6 mt-4">
        <h2 className="text-gray-700 font-medium mb-4">
          View / Edit Device • <span className="font-semibold">CAM-001</span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Device Name
            </label>
            <input
              type="text"
              defaultValue="Camera Living Room"
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Model</label>
            <input
              type="text"
              defaultValue="Hikvision DS-2CD2T"
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Device Type</label>
            <input
              type="text"
              defaultValue="Camera"
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">MAC Address</label>
            <input
              type="text"
              defaultValue="A4:5E:60:1B:2C:3D"
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Location</label>
            <input
              type="text"
              defaultValue="Room 101 – Tòa A"
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Status</label>
            <select className="w-full border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-blue-200">
              <option>Online</option>
              <option>Offline</option>
              <option>Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Last Active</label>
            <input
              type="text"
              defaultValue="2025-09-19 14:32"
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Save
          </button>
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
