import { useState } from 'react';
import { Plus, Edit, Trash2, Bell } from 'lucide-react';
import { Badge, EmptyState } from '../../components/ui';
import { mockAnnouncements } from '../../services/mock/mockData';
import { useAuth } from '../../context/AuthContext';

const priorityVariant = { HIGH: 'danger', MEDIUM: 'warning', LOW: 'accent' };

const AnnouncementsAdminPage = () => {
  const { hasRole } = useAuth();
  const [items, setItems] = useState(mockAnnouncements);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', priority: 'MEDIUM', category: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: `ann-new-${Date.now()}`,
      ...form,
      publishedAt: new Date().toISOString(),
    };
    setItems((prev) => [newItem, ...prev]);
    setShowForm(false);
    setForm({ title: '', content: '', priority: 'MEDIUM', category: '' });
  };

  const deleteItem = (id) => {
    if (window.confirm('Delete this announcement?')) {
      setItems((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary mb-1">Announcements</h1>
          <p className="text-gray-500 text-sm">Publish and manage church announcements</p>
        </div>
        {hasRole('ADMIN') && (
          <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm" id="create-announcement">
            <Plus className="w-4 h-4" /> New Announcement
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-primary mb-4">Create Announcement</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title <span className="text-red-500">*</span></label>
              <input type="text" value={form.title} required onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="Announcement title" className="input-base" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Content <span className="text-red-500">*</span></label>
              <textarea rows={4} value={form.content} required onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                placeholder="Announcement content..." className="input-base resize-none" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Priority</label>
                <select value={form.priority} onChange={(e) => setForm((p) => ({ ...p, priority: e.target.value }))} className="input-base">
                  {['HIGH', 'MEDIUM', 'LOW'].map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <input type="text" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  placeholder="e.g. PRAYER, SERVICE..." className="input-base" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm">Publish Announcement</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState icon={Bell} title="No announcements" message="Create your first announcement." />
      ) : (
        <div className="space-y-3">
          {items.map((ann) => (
            <div key={ann.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-accent/30 transition-colors group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant={priorityVariant[ann.priority] || 'accent'}>{ann.priority}</Badge>
                    {ann.category && (
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{ann.category}</span>
                    )}
                    <span className="text-xs text-gray-400 ml-auto">
                      {new Date(ann.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{ann.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{ann.content}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteItem(ann.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsAdminPage;
