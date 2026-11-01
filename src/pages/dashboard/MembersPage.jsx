import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter, Eye, Edit, Users } from 'lucide-react';
import { Badge, Card, Pagination, LoadingScreen, EmptyState } from '../../components/ui';
import { mockMembers, paginateMock } from '../../services/mock/mockData';
import { useAuth } from '../../context/AuthContext';

const statusVariant = {
  ACTIVE: 'success', INACTIVE: 'default', VISITOR: 'warning', TRANSFERRED: 'primary',
};

const MembersPage = () => {
  const { hasRole } = useAuth();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ data: [], pagination: null });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = mockMembers;
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (m) =>
            m.profile.firstName.toLowerCase().includes(q) ||
            m.profile.lastName.toLowerCase().includes(q) ||
            m.memberNumber.toLowerCase().includes(q)
        );
      }
      if (status !== 'All') filtered = filtered.filter((m) => m.status === status);
      setResult(paginateMock(filtered, page, 10));
      setLoading(false);
    }, 300);
  }, [search, status, page]);

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary mb-1">Members</h1>
          <p className="text-gray-500 text-sm">Manage church membership records</p>
        </div>
        {hasRole('ADMIN') && (
          <button className="btn-primary text-sm" id="add-member">
            <Plus className="w-4 h-4" /> Add Member
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text" placeholder="Search members..."
            value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="input-base pl-10 bg-white" id="member-search"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'ACTIVE', 'INACTIVE', 'VISITOR', 'TRANSFERRED'].map((s) => (
            <button key={s} onClick={() => { setStatus(s); setPage(1); }}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                status === s ? 'bg-accent text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-accent hover:text-accent'
              }`}>
              {s === 'All' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingScreen message="Loading members..." />
      ) : result.data.length === 0 ? (
        <EmptyState icon={Users} title="No members found" message="Try adjusting your filters" />
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Member</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Member No.</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Department</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {result.data.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {member.profile.firstName[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {member.profile.firstName} {member.profile.lastName}
                          </div>
                          <div className="text-xs text-gray-400">{member.profile.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600 hidden sm:table-cell">
                      <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{member.memberNumber}</code>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs hidden md:table-cell">
                      {member.department?.name || '—'}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={statusVariant[member.status] || 'default'}>
                        {member.status.charAt(0) + member.status.slice(1).toLowerCase()}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-accent hover:bg-accent/10 transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        {hasRole('ADMIN') && (
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            pagination={result.pagination}
            onPageChange={(p) => { setPage(p); window.scrollTo(0, 0); }}
          />
        </>
      )}
    </div>
  );
};

export default MembersPage;
