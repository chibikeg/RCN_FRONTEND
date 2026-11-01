import { useState } from 'react';
import { Plus, Calendar, Edit, Trash2, Eye } from 'lucide-react';
import { Badge, EmptyState } from '../../components/ui';
import { mockEvents } from '../../services/mock/mockData';
import { useAuth } from '../../context/AuthContext';

const statusVariant = { PUBLISHED: 'success', DRAFT: 'warning', CANCELLED: 'danger', ARCHIVED: 'default' };

const AdminEventsPage = () => {
  const { hasRole } = useAuth();
  const [events, setEvents] = useState(mockEvents);

  const deleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary mb-1">Events Management</h1>
          <p className="text-gray-500 text-sm">Create and manage church events and conferences</p>
        </div>
        {hasRole('ADMIN') && (
          <button className="btn-primary text-sm" id="create-event">
            <Plus className="w-4 h-4" /> Create Event
          </button>
        )}
      </div>

      {events.length === 0 ? (
        <EmptyState icon={Calendar} title="No events found" message="Create your first event." />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Event</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${event.imageUrl})` }}
                      />
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{event.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-1 hidden sm:block">{event.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs hidden sm:table-cell">
                    {new Date(event.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <Badge variant="accent">{event.category}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={statusVariant[event.status] || 'default'}>{event.status}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-accent hover:bg-accent/10 transition-colors" title="Preview">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteEvent(event.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
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

export default AdminEventsPage;
