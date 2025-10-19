import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FiSearch, FiEye, FiTrash2, FiRefreshCcw, FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp } from "react-icons/fi";

const STATUS_LABEL = {
  active: { text: "Online", color: "green" },
  inactive: { text: "Offline", color: "red" },
  pending: { text: "Pending", color: "amber" },
  rejected: { text: "Rejected", color: "slate" },
};

export default function DeviceManager() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ serial: "", type: "", location: "", status: "" });

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/devices");
      setDevices(res.data || []);
    } catch (err) {
      setError(err);
      console.error("Fetch devices error:", err);
    } finally {
      setLoading(false);
    }
  };

  const totals = useMemo(() => {
    const total = devices.length;
    const online = devices.filter((d) => d.status === "active").length;
    const pending = devices.filter((d) => d.status === "pending").length;
    const offline = devices.filter((d) => d.status === "inactive").length;
    return { total, online, pending, offline };
  }, [devices]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = devices.filter((d) => {
      const label = STATUS_LABEL[d.status]?.text || d.status || "";
      if (statusFilter !== "All" && label !== statusFilter) return false;
      if (!q) return true;
      return `${d.serial || ""} ${d.type || ""} ${d.location || ""} ${d.id || ""}`.toLowerCase().includes(q);
    });

    if (sortKey) {
      list = [...list].sort((a, b) => {
        const va = String(a[sortKey] ?? "").toLowerCase();
        const vb = String(b[sortKey] ?? "").toLowerCase();
        if (va < vb) return sortDir === "asc" ? -1 : 1;
        if (va > vb) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [devices, query, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    }
  };

  const onView = (d) => {
    setSelected(d);
    setForm({
      serial: d.serial || "",
      type: d.type || "",
      location: d.location || "",
      status: d.status || "active",
    });
    setTimeout(() => document.getElementById("device-detail")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const handleSave = async () => {
    if (!selected) return;
    try {
      await axios.put(`http://localhost:5000/api/devices/${selected.id}`, { serial: form.serial, status: form.status });
      await fetchDevices();
      alert("Updated");
      setSelected(null);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleDelete = async (d) => {
    if (!confirm(`Delete device ${d.serial || d.id}?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/devices/${d.id}`);
      await fetchDevices();
      if (selected?.id === d.id) setSelected(null);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-slate-50">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Device Manager</h1>
          <p className="text-sm text-slate-500">Devices, assignments and statuses (data from API)</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchDevices} className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-sm hover:bg-slate-50">
            <FiRefreshCcw /> Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="text-sm text-slate-500">Total</div>
          <div className="text-2xl font-bold">{totals.total}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="text-sm text-slate-500">Online</div>
          <div className="text-2xl font-bold text-green-600">{totals.online}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="text-sm text-slate-500">Pending</div>
          <div className="text-2xl font-bold text-amber-600">{totals.pending}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-sm w-full md:w-1/2">
          <FiSearch className="text-slate-400" />
          <input value={query} onChange={(e) => { setPage(1); setQuery(e.target.value); }} placeholder="Search serial, id, type, location..." className="w-full bg-transparent outline-none text-sm" />
        </div>

        <select value={statusFilter} onChange={(e) => { setPage(1); setStatusFilter(e.target.value); }} className="border rounded-md px-3 py-2 text-sm bg-white shadow-sm">
          <option>All</option>
          <option>Online</option>
          <option>Pending</option>
          <option>Offline</option>
        </select>

        <div className="ml-auto text-sm text-slate-500">{loading ? "Loading..." : `${filtered.length} results`}</div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-3 text-left cursor-pointer" onClick={() => toggleSort("serial")}>
                Serial {sortKey === "serial" ? (sortDir === "asc" ? <FiChevronUp className="inline" /> : <FiChevronDown className="inline" />) : null}
              </th>
              <th className="p-3 text-left cursor-pointer" onClick={() => toggleSort("type")}>
                Type {sortKey === "type" ? (sortDir === "asc" ? <FiChevronUp className="inline" /> : <FiChevronDown className="inline" />) : null}
              </th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Last Active</th>
              <th className="p-3 text-left cursor-pointer" onClick={() => toggleSort("status")}>
                Status {sortKey === "status" ? (sortDir === "asc" ? <FiChevronUp className="inline" /> : <FiChevronDown className="inline" />) : null}
              </th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paged.map((d) => (
              <tr key={d.id} className="border-t hover:bg-slate-50">
                <td className="p-3">
                  <div className="font-medium">{d.serial}</div>
                  <div className="text-xs text-slate-400">{d.id}</div>
                </td>
                <td className="p-3">{d.type}</td>
                <td className="p-3">{d.owner_user_id ?? "—"}</td>
                <td className="p-3">{d.location ?? "—"}</td>
                <td className="p-3">{d.assigned_at ? new Date(d.assigned_at).toLocaleString() : "—"}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${d.status === "active" ? "bg-green-100 text-green-700" : d.status === "inactive" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                    {STATUS_LABEL[d.status]?.text || d.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <div className="inline-flex items-center gap-2">
                    <button onClick={() => onView(d)} title="View" className="p-2 rounded-md hover:bg-slate-100 text-sky-600"><FiEye /></button>
                    <button onClick={() => handleDelete(d)} title="Delete" className="p-2 rounded-md hover:bg-red-50 text-rose-600"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr><td colSpan={7} className="p-6 text-center text-slate-500">No devices found</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination footer */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-t bg-slate-50">
          <div className="text-sm text-slate-600">
            Showing <span className="font-semibold">{paged.length === 0 ? 0 : (page - 1) * pageSize + 1}</span>
            –<span className="font-semibold">{(page - 1) * pageSize + paged.length}</span> of <span className="font-semibold">{filtered.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-md bg-white shadow-sm disabled:opacity-50">
              <FiChevronLeft />
            </button>
            <div className="text-sm">
              Page <span className="font-semibold">{page}</span> / {totalPages}
            </div>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-md bg-white shadow-sm disabled:opacity-50">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Detail panel (slide-in style) */}
      {selected && (
        <aside id="device-detail" className="mt-6 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Device • <span className="font-medium text-slate-700">{selected.serial}</span></h2>
              <div className="text-xs text-slate-400 mt-1">{selected.id}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setSelected(null); setForm({ serial: "", type: "", location: "", status: "" }); }} className="px-3 py-1 rounded-md bg-gray-100">Close</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-xs text-slate-600">Device Name</label>
              <input value={form.serial} onChange={(e) => setForm(s => ({ ...s, serial: e.target.value }))} className="w-full border rounded-md px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-xs text-slate-600">Device Type</label>
              <input value={form.type} readOnly className="w-full border rounded-md px-3 py-2 mt-1 bg-slate-50" />
            </div>
            <div>
              <label className="text-xs text-slate-600">Location</label>
              <input value={form.location} onChange={(e) => setForm(s => ({ ...s, location: e.target.value }))} className="w-full border rounded-md px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-xs text-slate-600">Status</label>
              <select value={form.status} onChange={(e) => setForm(s => ({ ...s, status: e.target.value }))} className="w-full border rounded-md px-3 py-2 mt-1">
                <option value="active">Online</option>
                <option value="pending">Pending</option>
                <option value="inactive">Offline</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-600">Last Active</label>
              <input value={selected.assigned_at ? new Date(selected.assigned_at).toLocaleString() : ""} readOnly className="w-full border rounded-md px-3 py-2 mt-1 bg-slate-50" />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={handleSave} className="bg-blue-600 text-white px-5 py-2 rounded-md">Save</button>
            <button onClick={() => { setSelected(null); setForm({ serial: "", type: "", location: "", status: "" }); }} className="bg-gray-100 px-5 py-2 rounded-md">Cancel</button>
          </div>
        </aside>
      )}

      {error && <div className="mt-4 text-sm text-red-600">Error loading devices. Check backend.</div>}
    </div>
  );
}
