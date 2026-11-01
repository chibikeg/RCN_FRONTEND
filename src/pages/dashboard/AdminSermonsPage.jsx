import { useState } from 'react';
import { Plus, PlayCircle, Edit, Trash2, FileText, BookOpen } from 'lucide-react';
import { Badge, EmptyState } from '../../components/ui';
import { mockSermons } from '../../services/mock/mockData';
import { sermonsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AdminSermonsPage = () => {
  const { hasRole } = useAuth();
  const [sermons, setSermons] = useState(mockSermons);
  const [transcribingId, setTranscribingId] = useState(null);

  const requestTranscription = async (sermonId) => {
    setTranscribingId(sermonId);
    try {
      // POST /api/v1/sermons/:id/transcription-jobs
      await sermonsAPI.requestTranscription(sermonId);
      alert('Transcription job submitted! You will be notified when it is ready.');
    } catch {
      alert('Transcription request submitted (dev mode).');
    } finally {
      setTranscribingId(null);
    }
  };

  const deleteSermon = (id) => {
    if (window.confirm('Delete this sermon?')) {
      setSermons((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const formatDuration = (s) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary mb-1">Sermons</h1>
          <p className="text-gray-500 text-sm">Manage sermon content, metadata, and transcriptions</p>
        </div>
        {hasRole('PASTOR') && (
          <button className="btn-primary text-sm" id="add-sermon">
            <Plus className="w-4 h-4" /> Add Sermon
          </button>
        )}
      </div>

      {/* Specialist Services Info Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-800">AI Transcription Available</p>
          <p className="text-xs text-blue-600 mt-0.5">
            Use the 🤖 button to request AI transcription via the Django specialist service
            (<code className="bg-blue-100 px-1 rounded">/internal/v1/sermons/transcriptions</code>).
            Summaries are also generated automatically.
          </p>
        </div>
      </div>

      {sermons.length === 0 ? (
        <EmptyState icon={BookOpen} title="No sermons found" message="Add your first sermon." />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Sermon</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Series</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Duration</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Transcript</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sermons.map((sermon) => (
                <tr key={sermon.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg bg-cover bg-center flex-shrink-0 relative overflow-hidden"
                        style={{ backgroundImage: `url(${sermon.thumbnailUrl})` }}
                      >
                        <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                          <PlayCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{sermon.title}</p>
                        <p className="text-xs text-gray-400">{sermon.speaker}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <Badge variant="accent">{sermon.series}</Badge>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs hidden md:table-cell">
                    {formatDuration(sermon.duration)}
                  </td>
                  <td className="px-5 py-4">
                    {sermon.hasTranscript ? (
                      <Badge variant="success">Ready</Badge>
                    ) : (
                      <button
                        onClick={() => requestTranscription(sermon.id)}
                        disabled={transcribingId === sermon.id}
                        className="text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 flex items-center gap-1"
                        title="Request AI Transcription"
                      >
                        {transcribingId === sermon.id ? '...' : '🤖'} Request
                      </button>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteSermon(sermon.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
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

export default AdminSermonsPage;
