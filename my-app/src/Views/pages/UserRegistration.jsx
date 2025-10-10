import React, { useState } from "react";
import { FiEye, FiCheck, FiX } from "react-icons/fi";

export default function UserRegistration() {
  const [requests] = useState([
    { id: "REQ-20250918-001", name: "Nguyễn Văn A", email: "usera@email.com", phone: "+84 912 345 678", role: "User", date: "2025-09-18", status: "Pending" },
    { id: "REQ-20250918-002", name: "Workman", email: "userb@email.com", phone: "+84 912 345 678", role: "User", date: "2025-09-17", status: "Approved" },
    { id: "REQ-20250918-003", name: "Workman", email: "userc@email.com", phone: "+84 912 345 678", role: "User", date: "2025-09-15", status: "Rejected" },
  ]);

  const [selected, setSelected] = useState(null); // lưu yêu cầu đang xem

  const devices = [
    { id: "CAM-001", type: "Camera (IP)", model: "Hikvision DS-2CD2T", mac: "A4:5E:60:1B:2C:3D", location: "Phòng 101 – Tòa A", status: "Pending" },
    { id: "ACC-202", type: "Sensor (Accelerometer)", model: "ADXL345", mac: "N/A", location: "Phòng 202 – Tòa A", status: "Pending" },
  ];

  return (
    <div className="flex flex-col p-6 gap-6 bg-gray-50 min-h-screen">
      {/* === Header cards === */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 shadow flex flex-col justify-between">
          <span className="text-gray-500">Total Requests</span>
          <span className="text-2xl font-bold">56</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow flex flex-col justify-between">
          <span className="text-gray-500">Pending</span>
          <span className="text-2xl font-bold text-yellow-500">18</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow flex flex-col justify-between">
          <span className="text-gray-500">Approved Today</span>
          <span className="text-2xl font-bold text-green-500">4</span>
        </div>
      </div>

      {/* === Requests Table === */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Request ID</th>
              <th className="p-3">Avatar</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Reg. Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {requests.map((req, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3">{req.id}</td>
                <td className="p-3">
                  <img
                    src={`https://i.pravatar.cc/40?img=${index + 1}`}
                    alt={req.name}
                    className="w-8 h-8 rounded-full"
                  />
                </td>
                <td className="p-3">{req.name}</td>
                <td className="p-3">{req.email}</td>
                <td className="p-3">{req.role}</td>
                <td className="p-3">{req.date}</td>
                <td className="p-3">
                  {req.status === "Pending" && (
                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  )}
                  {req.status === "Approved" && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                      Approved
                    </span>
                  )}
                  {req.status === "Rejected" && (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                      Rejected
                    </span>
                  )}
                </td>
                <td className="p-3 text-center flex justify-center gap-3">
                  <FiEye
                    className="text-gray-500 hover:text-blue-500 cursor-pointer"
                    onClick={() => setSelected(req)} // 👉 khi click mở chi tiết
                  />
                  <FiCheck className="text-green-500 hover:text-green-600 cursor-pointer" />
                  <FiX className="text-red-500 hover:text-red-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === Detail View Section === */}
      {selected && (
        <div className="bg-white rounded-xl shadow p-6 mt-4 animate-fadeIn">
          <h2 className="text-gray-700 font-semibold mb-4">
            Approval Request • <span className="text-blue-600">{selected.id}</span>
          </h2>

          <div className="space-y-2 text-sm text-gray-700 mb-4">
            <p>
              <strong>Applicant:</strong> {selected.name}
            </p>
            <p>
              <strong>Email:</strong> {selected.email}
            </p>
            <p>
              <strong>Phone:</strong> {selected.phone}
            </p>
            <p>
              <strong>Role:</strong> {selected.role}
            </p>
            <p>
              <strong>Registration Date:</strong> {selected.date}
            </p>
          </div>

          <h3 className="text-gray-700 font-medium mb-2">Registered Devices</h3>
          <table className="w-full text-left border-collapse text-sm mb-6">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">Device ID</th>
                <th className="p-3">Type</th>
                <th className="p-3">Model</th>
                <th className="p-3">MAC Address</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{d.id}</td>
                  <td className="p-3">{d.type}</td>
                  <td className="p-3">{d.model}</td>
                  <td className="p-3">{d.mac}</td>
                  <td className="p-3">{d.location}</td>
                  <td className="p-3">
                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end gap-3">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Approve
            </button>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
              Reject
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
              onClick={() => setSelected(null)} // 👉 Đóng giao diện chi tiết
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
