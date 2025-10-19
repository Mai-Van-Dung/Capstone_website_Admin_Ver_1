import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { FiEye, FiEdit2, FiTrash2, FiSearch, FiPlus, FiChevronDown, FiChevronUp } from "react-icons/fi";

const STATUS_STYLES = {
  Active: {
    ring: "ring-emerald-200/70",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    dot: "bg-emerald-500",
  },
  Inactive: {
    ring: "ring-rose-200/70",
    text: "text-rose-700",
    bg: "bg-rose-50",
    dot: "bg-rose-500",
  },
  Pending: {
    ring: "ring-amber-200/70",
    text: "text-amber-700",
    bg: "bg-amber-50",
    dot: "bg-amber-500",
  },
};

const StatCard = ({ icon, label, value, accent }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
    <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-10" style={{ background: accent }} />
    <div className="flex items-center gap-3">
      <div className="rounded-xl p-2 text-white" style={{ background: accent }}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-xs">{label}</p>
        <p className="text-lg font-semibold tracking-tight">{value}</p>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const normalized = status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : "Active";
  const styles = STATUS_STYLES[normalized] || STATUS_STYLES.Active;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${styles.bg} ${styles.text} ring-1 ${styles.ring}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {normalized}
    </span>
  );
};

const SortIcon = ({ dir }) => (dir === "asc" ? <FiChevronUp className="ml-1 inline" /> : dir === "desc" ? <FiChevronDown className="ml-1 inline" /> : null);

const Accounts = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState(null); // name | email | status
  const [sortDir, setSortDir] = useState("asc"); // asc | desc
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // data + loading/error
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // selected user for action panel + form state
  const [selectedUser, setSelectedUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: "", email: "", phone: "", status: "" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // fetch users (reusable)
  const fetchUsers = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch users error:", err);
      setFetchError(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const totals = useMemo(() => {
    const active = users.filter(u => u.status === "Active" || u.status === "active").length;
    const inactive = users.filter(u => u.status === "Inactive" || u.status === "inactive").length;
    const pending = users.filter(u => u.status === "Pending" || u.status === "pending").length;
    return { total: users.length, active, inactive, pending };
  }, [users]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = users.filter(u =>
      (!q || `${u.name || ""} ${u.email || ""} ${u.phone || ""}`.toLowerCase().includes(q)) &&
      (statusFilter === "All" || (u.status || "").toLowerCase() === statusFilter.toLowerCase())
    );

    if (sortKey) {
      list = [...list].sort((a, b) => {
        const va = String(a[sortKey] || "").toLowerCase();
        const vb = String(b[sortKey] || "").toLowerCase();
        if (va < vb) return sortDir === "asc" ? -1 : 1;
        if (va > vb) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [users, query, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    }
  };

  // --- ACTION HANDLERS ---
  const onView = async (u) => {
    // Optional: fetch fresh data: GET /api/auth/users/:id (backend supports)
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/users/${u.id}`);
      const data = res.data;
      setSelectedUser(data);
      setUserForm({ name: data.name || "", email: data.email || "", phone: data.phone || "", status: data.status || "" });
    } catch (err) {
      // fallback to object we have
      setSelectedUser(u);
      setUserForm({ name: u.name || "", email: u.email || "", phone: u.phone || "", status: u.status || "" });
    }
    // scroll to panel
    setTimeout(() => document.getElementById("account-detail")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    setSaving(true);
    try {
      await axios.put(`http://localhost:5000/api/auth/users/${selectedUser.id}`, {
        name: userForm.name,
        email: userForm.email,
        phone: userForm.phone,
        status: userForm.status,
      });
      await fetchUsers();
      setSelectedUser(null);
    } catch (err) {
      console.error("Update user error:", err);
      alert(err.response?.data?.error || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (u) => {
    if (!confirm(`Delete user ${u.name || u.email}? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/auth/users/${u.id}`);
      await fetchUsers();
      if (selectedUser?.id === u.id) setSelectedUser(null);
    } catch (err) {
      console.error("Delete user error:", err);
      alert(err.response?.data?.error || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-6 bg-slate-50 p-6">
      {loading && <div className="text-sm text-gray-500">Loading users...</div>}
      {fetchError && <div className="text-sm text-red-500">Could not fetch users from server.</div>}

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<FaUser className="text-xl" />} label="Total Users" value={totals.total.toLocaleString()} accent="#2563eb" />
        <StatCard icon={<div className="h-5 w-5 rounded-full" style={{ background: "#10b981" }} />} label="Active" value={totals.active.toLocaleString()} accent="#10b981" />
        <StatCard icon={<div className="h-5 w-5 rounded-full" style={{ background: "#f59e0b" }} />} label="Pending" value={totals.pending.toLocaleString()} accent="#f59e0b" />
        <StatCard icon={<div className="h-5 w-5 rounded-full" style={{ background: "#ef4444" }} />} label="Inactive" value={totals.inactive.toLocaleString()} accent="#ef4444" />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-xl items-center gap-3">
          <div className="flex w-full flex-1 items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-slate-400">
            <FiSearch className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => { setPage(1); setQuery(e.target.value); }}
              placeholder="Search name, email, phone..."
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-slate-400"
            />
          </div>
          <div className="rounded-xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200">
            <select
              value={statusFilter}
              onChange={(e) => { setPage(1); setStatusFilter(e.target.value); }}
              className="bg-transparent outline-none"
              aria-label="Filter by status"
            >
              <option>All</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <button onClick={() => fetchUsers()} className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
          <FiPlus /> Refresh
        </button>
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold cursor-pointer select-none" onClick={() => toggleSort("name")}>
                  Name <SortIcon dir={sortKey === "name" ? sortDir : null} />
                </th>
                <th className="px-4 py-3 font-semibold cursor-pointer select-none" onClick={() => toggleSort("email")}>
                  Email <SortIcon dir={sortKey === "email" ? sortDir : null} />
                </th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold cursor-pointer select-none" onClick={() => toggleSort("status")}>
                  Status <SortIcon dir={sortKey === "status" ? sortDir : null} />
                </th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                    No users found. Try a different search or filter.
                  </td>
                </tr>
              ) : (
                paged.map((u, idx) => (
                  <tr key={u.id || idx} className={`${idx % 2 === 1 ? "bg-slate-50/50" : "bg-white"} border-t border-slate-100 hover:bg-slate-50`}> 
                    <td className="px-4 py-3 align-middle text-slate-700">{u.id}</td>
                    <td className="px-4 py-3 align-middle font-medium text-slate-800">{u.name}</td>
                    <td className="px-4 py-3 align-middle text-slate-600">{u.email}</td>
                    <td className="px-4 py-3 align-middle text-slate-600">{u.phone}</td>
                    <td className="px-4 py-3 align-middle"><StatusBadge status={u.status === 'active' ? 'Active' : (u.status || '')} /></td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center justify-center gap-2">
                        <button title="View" onClick={() => onView(u)} className="rounded-full p-2 text-blue-600 transition hover:bg-blue-50">
                          <FiEye className="text-lg" />
                        </button>
                        <button title="Edit" onClick={() => onView(u)} className="rounded-full p-2 text-emerald-600 transition hover:bg-emerald-50">
                          <FiEdit2 className="text-lg" />
                        </button>
                        <button title="Delete" onClick={() => handleDelete(u)} className="rounded-full p-2 text-rose-600 transition hover:bg-rose-50">
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden">
          {paged.length === 0 ? (
            <div className="px-4 py-10 text-center text-slate-500">No users found.</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {paged.map((u) => (
                <li key={u.id} className="flex items-center gap-3 px-4 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">{u.name}</p>
                    <p className="truncate text-xs text-slate-500">{u.email}</p>
                    <div className="mt-2"><StatusBadge status={u.status} /></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => onView(u)} className="rounded-full p-2 text-blue-600 hover:bg-blue-50"><FiEye /></button>
                    <button onClick={() => onView(u)} className="rounded-full p-2 text-emerald-600 hover:bg-emerald-50"><FiEdit2 /></button>
                    <button onClick={() => handleDelete(u)} className="rounded-full p-2 text-rose-600 hover:bg-rose-50"><FiTrash2 /></button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-4 py-3 text-sm">
          <p className="text-slate-500">
            Showing <span className="font-semibold text-slate-700">{paged.length === 0 ? 0 : (page - 1) * pageSize + 1}</span>
            –<span className="font-semibold text-slate-700">{(page - 1) * pageSize + paged.length}</span> of
            <span className="font-semibold text-slate-700"> {filtered.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-slate-600">
              Page <span className="font-semibold text-slate-800">{page}</span> / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Detail / Edit panel: chỉ hiện khi selectedUser */}
      {selectedUser && (
        <div id="account-detail" className="bg-white rounded-2xl shadow p-6 mt-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">User • <span className="font-medium text-slate-700">{selectedUser.name}</span></h2>
              <div className="text-xs text-slate-400 mt-1">{selectedUser.id}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setSelectedUser(null); }} className="px-3 py-1 rounded-md bg-gray-100">Close</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-xs text-slate-600">Full name</label>
              <input value={userForm.name} onChange={(e) => setUserForm(s => ({ ...s, name: e.target.value }))} className="w-full border rounded-md px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-xs text-slate-600">Email</label>
              <input value={userForm.email} onChange={(e) => setUserForm(s => ({ ...s, email: e.target.value }))} className="w-full border rounded-md px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-xs text-slate-600">Phone</label>
              <input value={userForm.phone} onChange={(e) => setUserForm(s => ({ ...s, phone: e.target.value }))} className="w-full border rounded-md px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-xs text-slate-600">Status</label>
              <select value={userForm.status} onChange={(e) => setUserForm(s => ({ ...s, status: e.target.value }))} className="w-full border rounded-md px-3 py-2 mt-1">
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-5 py-2 rounded-md">{saving ? "Saving..." : "Save"}</button>
            <button onClick={() => { setSelectedUser(null); }} className="bg-gray-100 px-5 py-2 rounded-md">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;