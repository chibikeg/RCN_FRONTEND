import { useState, useEffect } from 'react';
import { Plus, Eye, Edit, CheckCircle, Clock, Bell } from 'lucide-react';
import { Badge, LoadingScreen, EmptyState } from '../../components/ui';
import { mockFirstTimers } from '../../services/mock/mockData';
import { firstTimersAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const followUpVariant = { PENDING: 'warning', CONTACTED: 'accent', COMPLETED: 'success' };

const FirstTimersPage = () => {
  const { hasRole } = useAuth();
  const [data, setData] = useState(mockFirstTimers);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // POST /api/v1/first-timers
      await firstTimersAPI.registerFirstTimer({ ...form, visitDate: new Date().toISOString() });
      setData((prev) => [{
        id: `ft-new-${Date.now()}`, ...form,
        visitDate: new Date().toISOString(), followUpStatus: 'PENDING', notes: '',
      }, ...prev]);
      setShowForm(false);
      setForm({ firstName: '', lastName: '', phone: '', email: '', address: '' });
    } catch {
      // Dev fallback
      setData((prev) => [{
        id: `ft-new-${Date.now()}`, ...form,
        visitDate: new Date().toISOString(), followUpStatus: 'PENDING', notes: '',
      }, ...prev]);
      setShowForm(false);
      setForm({ firstName: '', lastName: '', phone: '', email: '', address: '' });
    } finally {
      setLoading(false);
    }
  };

  const updateFollowUp = async (id, status) => {
    try {
      // PATCH /api/v1/first-timers/:id
      await firstTimersAPI.updateFirstTimer(id, { followUpStatus: status });
    } catch { /* dev: continue */ }
    setData((prev) => prev.map((ft) => ft.id === id ? { ...ft, followUpStatus: status } : ft));
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary mb-1">First Timers</h1>
          <p className="text-gray-500 text-sm">Register and follow up on first-time visitors</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm" id="add-firsttimer">
          <Plus className="w-4 h-4" /> Register Visitor
        </button>
      </div>

      {/* Register Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-primary mb-4">Register First-Time Visitor</h3>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: 'firstName', label: 'First Name', placeholder: 'John', required: true },
                { name: 'lastName', label: 'Last Name', placeholder: 'Doe', required: true },
                { name: 'phone', label: 'Phone Number', placeholder: '+234 800 000 0000' },
                { name: 'email', label: 'Email Address', placeholder: 'visitor@example.com', type: 'email' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={field.type || 'text'} value={form[field.name]} required={field.required}
                    onChange={(e) => setForm((p) => ({ ...p, [field.name]: e.target.value }))}
                    placeholder={field.placeholder} className="input-base"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
              <input
                type="text" value={form.address} placeholder="Home / Work address"
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                className="input-base"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="btn-primary text-sm">
                {loading ? 'Saving...' : 'Register Visitor'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {data.length === 0 ? (
        <EmptyState icon={Bell} title="No first-time visitors recorded" message="Register a visitor using the button above." />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Visitor</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Contact</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Visit Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Follow-Up</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((ft) => (
                <tr key={ft.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {ft.firstName[0]}
                      </div>
                      <span className="font-medium text-gray-900">{ft.firstName} {ft.lastName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">
                    <div className="text-xs">{ft.phone}</div>
                    <div className="text-xs text-gray-400">{ft.email}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs hidden md:table-cell">
                    {new Date(ft.visitDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={followUpVariant[ft.followUpStatus] || 'default'}>
                      {ft.followUpStatus}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {ft.followUpStatus !== 'COMPLETED' && (
                        <button
                          onClick={() => updateFollowUp(ft.id, ft.followUpStatus === 'PENDING' ? 'CONTACTED' : 'COMPLETED')}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 transition-colors"
                          title="Advance status"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FirstTimersPage;
