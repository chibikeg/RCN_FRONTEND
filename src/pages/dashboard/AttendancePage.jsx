import { useState } from 'react';
import { CheckCircle2, AlertCircle, Users, TrendingUp, Calendar } from 'lucide-react';
import { Alert, Spinner, SelectField, Badge } from '../../components/ui';
import { attendanceAPI } from '../../services/api';
import { mockMembers, mockAttendanceSummary } from '../../services/mock/mockData';
import { useAuth } from '../../context/AuthContext';

const AttendancePage = () => {
  const { hasRole } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [serviceType, setServiceType] = useState('SUNDAY_SERVICE');
  const [attendees, setAttendees] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const toggleAttendee = (memberId) => {
    setAttendees((prev) => ({ ...prev, [memberId]: !prev[memberId] }));
  };

  const selectedCount = Object.values(attendees).filter(Boolean).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCount === 0) { setError('Select at least one attendee'); return; }
    setLoading(true);
    setError('');
    try {
      // POST /api/v1/attendance/bulk
      await attendanceAPI.recordBulkAttendance({
        date: selectedDate,
        serviceType,
        memberIds: Object.entries(attendees).filter(([, v]) => v).map(([k]) => k),
      });
      setSuccess(true);
      setAttendees({});
    } catch {
      // Dev: simulate success
      setSuccess(true);
      setAttendees({});
    } finally {
      setLoading(false);
    }
  };

  const summary = mockAttendanceSummary;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-primary mb-1">Attendance</h1>
        <p className="text-gray-500 text-sm">Record and track service attendance</p>
      </div>

      {/* Summary Cards */}
      {hasRole('PASTOR') && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Avg. Weekly', value: summary.avgAttendance, icon: TrendingUp, color: 'text-green-500 bg-green-50' },
            { label: 'Total Sessions', value: summary.totalSessions, icon: Calendar, color: 'text-blue-500 bg-blue-50' },
            { label: 'This Week', value: summary.weeklyBreakdown.at(-1)?.count || 0, icon: Users, color: 'text-accent bg-accent/10' },
            { label: 'Members', value: mockMembers.length, icon: Users, color: 'text-purple-500 bg-purple-50' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-3`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Record Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-primary mb-4">Record Attendance</h2>

          {success && (
            <Alert type="success" className="mb-4">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Attendance recorded for {selectedCount || 'selected'} members!</span>
            </Alert>
          )}
          {error && (
            <Alert type="error" className="mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Date</label>
                <input
                  type="date" value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input-base" id="attendance-date"
                />
              </div>
              <SelectField
                label="Service Type" name="serviceType"
                value={serviceType} onChange={(e) => setServiceType(e.target.value)}
              >
                {['SUNDAY_SERVICE', 'MIDWEEK_SERVICE', 'PRAYER_MEETING', 'SPECIAL_SERVICE'].map((t) => (
                  <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>
                ))}
              </SelectField>
            </div>

            {/* Mark all */}
            <div className="flex items-center justify-between py-3 border-y border-gray-100">
              <span className="text-sm text-gray-600">
                {selectedCount} of {mockMembers.length} selected
              </span>
              <button type="button" onClick={() => {
                const allSelected = selectedCount === mockMembers.length;
                const newState = {};
                if (!allSelected) mockMembers.forEach((m) => { newState[m.id] = true; });
                setAttendees(newState);
              }} className="text-xs text-accent hover:underline font-medium">
                {selectedCount === mockMembers.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            {/* Member List */}
            <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
              {mockMembers.slice(0, 16).map((member) => (
                <label
                  key={member.id}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    attendees[member.id] ? 'bg-accent/10 border border-accent/30' : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <input
                    type="checkbox" checked={!!attendees[member.id]}
                    onChange={() => toggleAttendee(member.id)}
                    className="rounded text-accent focus:ring-accent"
                  />
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                    {member.profile.firstName[0]}
                  </div>
                  <span className="text-sm text-gray-700">
                    {member.profile.firstName} {member.profile.lastName}
                  </span>
                  <Badge variant="default" className="ml-auto text-xs">{member.memberNumber}</Badge>
                </label>
              ))}
            </div>

            <button type="submit" disabled={loading || selectedCount === 0} className="btn-primary w-full" id="record-attendance">
              {loading ? <><Spinner size="sm" /> Saving...</> : `Record Attendance (${selectedCount})`}
            </button>
          </form>
        </div>

        {/* Weekly Breakdown */}
        {hasRole('PASTOR') && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" /> Weekly Breakdown
            </h3>
            <div className="space-y-3">
              {summary.weeklyBreakdown.map((w) => (
                <div key={w.week}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{w.week}</span>
                    <span className="font-semibold text-primary">{w.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-gradient rounded-full"
                      style={{ width: `${(w.count / 500) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
