import { useState } from 'react';
import { Plus, Calendar, Users } from 'lucide-react';
import { Badge, EmptyState } from '../../components/ui';
import { mockRosters } from '../../services/mock/mockData';

const RostersPage = () => {
  const [rosters] = useState(mockRosters);

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary mb-1">Service Rosters</h1>
          <p className="text-gray-500 text-sm">Manage worker assignments for services and events</p>
        </div>
        <button className="btn-primary text-sm" id="add-roster">
          <Plus className="w-4 h-4" /> Create Roster
        </button>
      </div>

      {rosters.length === 0 ? (
        <EmptyState icon={Calendar} title="No rosters found" message="Create a service roster to assign workers." />
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {rosters.map((roster) => (
            <div key={roster.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-primary mb-1">{roster.department.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(roster.serviceDate).toLocaleDateString('en-GB', {
                      weekday: 'long', day: 'numeric', month: 'long',
                    })}
                  </div>
                </div>
                <Badge variant="accent">{roster.workers.length} workers</Badge>
              </div>

              {roster.notes && (
                <p className="text-xs text-gray-500 mb-4 bg-gray-50 rounded-lg px-3 py-2">{roster.notes}</p>
              )}

              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Assigned Workers</p>
                <div className="flex flex-wrap gap-2">
                  {roster.workers.map((w) => (
                    <div key={w.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100 text-xs text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-accent-gradient flex items-center justify-center text-white font-bold text-xs">
                        {w.profile.firstName[0]}
                      </div>
                      {w.profile.firstName} {w.profile.lastName}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                <button className="text-xs text-accent hover:underline font-medium">Edit Roster</button>
                <span className="text-gray-200">|</span>
                <button className="text-xs text-gray-400 hover:text-red-500 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RostersPage;
