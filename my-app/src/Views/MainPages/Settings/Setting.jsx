import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Mail, User2, Shield, CalendarDays, MapPin, Hash, Globe, Lock, Save, RefreshCcw } from "lucide-react";

/**
 * ProfilePage (ADMIN)
 * - Colorful, modern styling (gradients, accent badges, input icons)
 * - Aligned to ADMINs table: full_name, email (+ read-only created_at/updated_at)
 * - Password change panel (since DB stores password_hash)
 * - No external image imports; uses inline SVG placeholder to avoid build errors
 */

// Inline SVG avatar placeholder (safe, no asset file)
const DEFAULT_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#22c55e'/>
        <stop offset='100%' stop-color='#06b6d4'/>
      </linearGradient>
    </defs>
    <rect width='120' height='120' rx='16' fill='url(#g)'/>
    <circle cx='60' cy='44' r='22' fill='white' opacity='0.95'/>
    <rect x='22' y='74' width='76' height='32' rx='16' fill='white' opacity='0.95'/>
  </svg>
`);

const prettyDate = (str) => {
  const d = new Date(str);
  return isNaN(d.getTime()) ? String(str) : d.toLocaleString();
};

export default function ProfilePage() {
  const navigate = useNavigate();

  // Mock admin mapped to ADMINs table
  const [admin, setAdmin] = useState({
    admin_id: "8b4fa3e4-60f0-4f7f-9d0b-aaaaaaaaaaaa",
    full_name: "Charlene Reed",
    email: "charlenereed@gmail.com",
    avatar_url: "/src/assets/1.jpg",
    created_at: "2025-09-01T08:15:00Z",
    updated_at: "2025-10-11T13:40:00Z",
  });

  const [form, setForm] = useState({
    full_name: admin.full_name,
    email: admin.email,
    present_address: "San Jose, California, USA",
    permanent_address: "San Jose, California, USA",
    city: "San Jose",
    postal_code: "45962",
    country: "USA",
    dob: "1990-01-25",
  });

  const [pwdPanelOpen, setPwdPanelOpen] = useState(false);
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });

  const changed = useMemo(
    () => form.full_name !== admin.full_name || form.email !== admin.email,
    [form, admin]
  );

  const onChange = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleAvatarPick = () => {
    alert("TODO: open file picker & upload avatar");
  };

  const handleSave = async () => {
    if (!form.full_name.trim()) return alert("Full name is required");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return alert("Invalid email");

    const payload = {
      admin_id: admin.admin_id,
      full_name: form.full_name,
      email: form.email,
    };

    console.log("PUT /api/admins/", payload);
    setAdmin((a) => ({ ...a, full_name: payload.full_name, email: payload.email, updated_at: new Date().toISOString() }));
    alert("Profile updated");
  };

  const handlePasswordChange = async () => {
    if (!pwd.current || !pwd.next || !pwd.confirm) return alert("Please fill all password fields");
    if (pwd.next.length < 8) return alert("New password must be at least 8 characters");
    if (pwd.next !== pwd.confirm) return alert("Password confirmation does not match");

    const payload = { current_password: pwd.current, new_password: pwd.next };
    console.log("PUT /api/admins/", admin.admin_id, "/password", payload);
    setPwd({ current: "", next: "", confirm: "" });
    alert("Password updated");
  };

  const resetForm = () => {
    setForm({
      full_name: admin.full_name,
      email: admin.email,
      present_address: "San Jose, California, USA",
      permanent_address: "San Jose, California, USA",
      city: "San Jose",
      postal_code: "45962",
      country: "USA",
      dob: "1990-01-25",
    });
  };

  const avatarSrc = admin.avatar_url && admin.avatar_url.trim() ? admin.avatar_url : DEFAULT_AVATAR;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-0 shadow-sm overflow-hidden">
      {/* Color header */}

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Avatar card */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-slate-50 to-white p-6 ring-1 ring-slate-100">
            <div className="relative">
              <img src={avatarSrc} alt="Profile" className="h-40 w-40 rounded-full object-cover ring-2 ring-white shadow" />
              <button onClick={handleAvatarPick} className="absolute bottom-0 right-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white ring-4 ring-white transition hover:bg-emerald-700" title="Change avatar">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-800">{admin.full_name}</p>
            <p className="text-xs text-slate-500">{admin.email}</p>

            <div className="mt-4 grid w-full grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
                <div className="mb-1 flex items-center gap-2 text-emerald-700"><CalendarDays className="h-3.5 w-3.5" /> Joined</div>
                <div className="font-medium text-emerald-800">{prettyDate(admin.created_at)}</div>
              </div>
              <div className="rounded-xl bg-sky-50 p-3 ring-1 ring-sky-100">
                <div className="mb-1 flex items-center gap-2 text-sky-700"><RefreshCcw className="h-3.5 w-3.5" /> Updated</div>
                <div className="font-medium text-sky-800">{prettyDate(admin.updated_at)}</div>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl ring-1 ring-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                <h2 className="text-sm font-semibold text-slate-800">Basic Information</h2>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 flex items-center gap-2 text-sm text-slate-600"><User2 className="h-4 w-4 text-indigo-500" /> Full name</span>
                  <div className="relative">
                    <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input value={form.full_name} onChange={onChange('full_name')} className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-1 flex items-center gap-2 text-sm text-slate-600"><Mail className="h-4 w-4 text-sky-500" /> Email</span>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input value={form.email} onChange={onChange('email')} type="email" className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300" />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">Email must be unique (DB constraint).</p>
                </label>

                {/* Client-side only fields */}
                <label className="block">
                  <span className="mb-1 flex items-center gap-2 text-sm text-slate-600"><CalendarDays className="h-4 w-4 text-emerald-600" /> Date of Birth</span>
                  <input value={form.dob} onChange={onChange('dob')} type="date" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-300" />
                </label>

                <label className="block">
                  <span className="mb-1 flex items-center gap-2 text-sm text-slate-600"><MapPin className="h-4 w-4 text-rose-500" /> Present Address</span>
                  <input value={form.present_address} onChange={onChange('present_address')} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-300" />
                </label>

                <label className="block">
                  <span className="mb-1 flex items-center gap-2 text-sm text-slate-600"><MapPin className="h-4 w-4 text-violet-500" /> Permanent Address</span>
                  <input value={form.permanent_address} onChange={onChange('permanent_address')} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300" />
                </label>

                <div className="grid grid-cols-1 gap-5 sm:col-span-2 sm:grid-cols-3">
                  <label className="block">
                    <span className="mb-1 flex items-center gap-2 text-sm text-slate-600"><Hash className="h-4 w-4 text-indigo-500" /> City</span>
                    <input value={form.city} onChange={onChange('city')} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
                  </label>
                  <label className="block">
                    <span className="mb-1 flex items-center gap-2 text-sm text-slate-600"><Hash className="h-4 w-4 text-sky-500" /> Postal code</span>
                    <input value={form.postal_code} onChange={onChange('postal_code')} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300" />
                  </label>
                  <label className="block">
                    <span className="mb-1 flex items-center gap-2 text-sm text-slate-600"><Globe className="h-4 w-4 text-emerald-600" /> Country</span>
                    <input value={form.country} onChange={onChange('country')} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-300" />
                  </label>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button onClick={resetForm} className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-200">
                  <RefreshCcw className="h-4 w-4" /> Reset
                </button>
                <button onClick={handleSave} disabled={!changed} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50">
                  <Save className="h-4 w-4" /> Save
                </button>
              </div>
            </div>

            {/* Password panel */}
            <div className="mt-6 rounded-2xl ring-1 ring-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <h2 className="text-sm font-semibold text-slate-800">Security</h2>
              </div>
              <button onClick={() => setPwdPanelOpen((v) => !v)} className="mb-4 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-100">
                <Lock className="h-4 w-4" /> Change Password
                <span className="text-xs font-normal text-slate-500">(stored as password_hash)</span>
              </button>
              {pwdPanelOpen && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <label className="block">
                    <span className="mb-1 block text-sm text-slate-600">Current password</span>
                    <input type="password" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-300" />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm text-slate-600">New password</span>
                    <input type="password" value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-300" />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm text-slate-600">Confirm new password</span>
                    <input type="password" value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-300" />
                  </label>
                  <div className="sm:col-span-3 mt-2 flex justify-end">
                    <button onClick={handlePasswordChange} className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-rose-700">
                      <Shield className="h-4 w-4" /> Update Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}