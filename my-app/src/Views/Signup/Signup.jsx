import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phoneNumber: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Fetch users error:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage({ type: "success", text: "Registered successfully" });
      // Refresh list
      await fetchUsers();
      // Optionally redirect to login
      // navigate('/login');
    } catch (err) {
      console.error("Register error:", err);
      setMessage({ type: "error", text: err.response?.data?.error || "Register failed" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Create account</h2>
            {message && (
              <div className={`mb-4 p-2 rounded text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm text-gray-600">Full name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full mt-1 border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full mt-1 border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="w-full mt-1 border rounded px-3 py-2" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full mt-1 border rounded px-3 py-2" required />
              </div>

              <div className="flex items-center justify-between">
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Sign up</button>
                <button type="button" onClick={() => navigate('/login')} className="text-sm text-gray-600 hover:underline">Already have account? Login</button>
              </div>
            </form>
          </div>

          <div className="p-6 border-l">
            <h3 className="text-lg font-medium mb-3">Registered users</h3>
            {loading ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : users.length === 0 ? (
              <div className="text-sm text-gray-500">No users found</div>
            ) : (
              <div className="space-y-3 max-h-[420px] overflow-auto">
                {users.map((u) => (
                  <div key={u.id || u.email} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-sm">{u.name || u.email}</div>
                      <div className="text-xs text-gray-500">{u.email}</div>
                    </div>
                    <div className="text-xs text-gray-400">{u.status ?? '—'}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 text-xs text-gray-500">Data fetched from <code>/api/auth/users</code></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
