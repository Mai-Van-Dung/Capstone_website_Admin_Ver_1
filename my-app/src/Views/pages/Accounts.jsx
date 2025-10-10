import React, { useState } from "react";
import { FiSearch, FiEye, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
export default function Accounts() {
  const [users] = useState([
    { id: 1, name: "Livia Bator", email: "livia@domain.com", phone: "+84 912 345 678", status: "Active" },
    { id: 2, name: "Randy Press", email: "randy@domain.com", phone: "+84 912 345 678", status: "Active" },
    { id: 3, name: "Livia Bator", email: "livia@domain.com", phone: "+84 912 345 678", status: "Active" },
    { id: 4, name: "Workman", email: "livia@domain.com", phone: "+84 912 345 678", status: "Active" },
  ]);

  return (
    <div className="flex flex-col p-6 gap-6 bg-gray-50 min-h-screen">
      {/* === Header cards === */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 shadow flex flex-col justify-between">
          <span className="text-gray-500">Total Users</span>
          <span className="text-2xl font-bold">4,209</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow flex flex-col justify-between">
          <span className="text-gray-500">Active Users</span>
          <span className="text-2xl font-bold text-green-500">3,200</span>
        </div>
        <div className="bg-white rounded-xl p-4 shadow flex flex-col justify-between">
          <span className="text-gray-500">Non-active Users</span>
          <span className="text-2xl font-bold text-red-500">1,009</span>
        </div>
      </div>

      {/* === Search & Add button === */}
      <div className="flex justify-between items-center">
        <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow w-80">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search name, email..."
            className="ml-2 flex-1 outline-none text-sm"
          />
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
          <FiPlus /> Add User
        </button>
      </div>

      {/* === Table === */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{user.id}</td>
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={`https://i.pravatar.cc/40?img=${user.id}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  {user.name}
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                    {user.status}
                  </span>
                </td>
                <td className="p-3 text-center flex justify-center gap-3">
                  <FiEye className="text-gray-500 hover:text-blue-500 cursor-pointer" />
                  <FiEdit2 className="text-gray-500 hover:text-yellow-500 cursor-pointer" />
                  <FiTrash2 className="text-gray-500 hover:text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end items-center p-3 text-sm text-gray-500">
          <span className="mr-2">Rows per page:</span>
          <select className="border rounded px-2 py-1 text-sm">
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
          <div className="ml-4 flex items-center gap-2">
            <button className="text-gray-400 hover:text-gray-600">1</button>
            <button className="text-gray-400 hover:text-gray-600">2</button>
            <button className="text-gray-400 hover:text-gray-600">3</button>
            <span>Next ›</span>
          </div>
        </div>
      </div>

      {/* === Edit account form === */}
      <div className="bg-white rounded-xl shadow p-6 mt-4">
        <h2 className="text-gray-700 font-medium mb-4">Edit account</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Full name</label>
            <input
              type="text"
              placeholder="Nhập họ tên"
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Phone</label>
            <input
              type="text"
              placeholder="+84 ..."
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="email@domain.com"
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password (Reset)</label>
            <input
              type="password"
              placeholder="********"
              className="w-full border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Status</label>
            <select className="w-full border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-blue-200">
              <option>Active</option>
              <option>Inactive</option>
            </select>
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
