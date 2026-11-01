import { Link } from 'react-router-dom';
import {
  Users, CalendarDays, BookOpen, UserCheck, Bell,
  TrendingUp, Heart, ArrowRight, ClipboardList
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockMembers, mockEvents, mockSermons, mockAttendanceSummary } from '../../services/mock/mockData';

const StatCard = ({ icon: Icon, label, value, sub, color, linkTo }) => (
  <Link to={linkTo} className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-accent/30 transition-all block">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-bold text-primary">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-accent text-xs font-medium gap-1 group-hover:gap-2 transition-all">
      View all <ArrowRight className="w-3 h-3" />
    </div>
  </Link>
);

const DashboardHome = () => {
  const { user, hasRole } = useAuth();
  const firstName = user?.profile?.firstName || 'Friend';

  const upcomingEvents = mockEvents.slice(0, 3);
  const recentSermons = mockSermons.slice(0, 3);

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-primary mb-1">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-gray-500 text-sm">Here's what's happening in the RCN community.</p>
      </div>

      {/* Stats Grid */}
      {hasRole('WORKER') && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Users} label="Total Members" value={mockMembers.length}
            sub="Active this month" color="bg-blue-50 text-blue-500"
            linkTo="/dashboard/members"
          />
          <StatCard
            icon={UserCheck} label="This Week's Attendance" value={mockAttendanceSummary.avgAttendance}
            sub="Avg. weekly attendance" color="bg-green-50 text-green-500"
            linkTo="/dashboard/attendance"
          />
          <StatCard
            icon={Bell} label="First Timers" value={8}
            sub="This month" color="bg-purple-50 text-purple-500"
            linkTo="/dashboard/first-timers"
          />
          <StatCard
            icon={ClipboardList} label="Active Rosters" value={4}
            sub="This week" color="bg-amber-50 text-amber-500"
            linkTo="/dashboard/rosters"
          />
        </div>
      )}

      {/* Member-level stats */}
      {!hasRole('WORKER') && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <StatCard
            icon={BookOpen} label="Sermons Available" value={mockSermons.length}
            color="bg-accent/10 text-accent" linkTo="/sermons"
          />
          <StatCard
            icon={CalendarDays} label="Upcoming Events" value={mockEvents.length}
            color="bg-primary/10 text-primary" linkTo="/events"
          />
        </div>
      )}

      {/* Two columns */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-primary flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-accent" /> Upcoming Events
            </h2>
            <Link to="/events" className="text-xs text-accent hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {upcomingEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-accent text-white flex flex-col items-center justify-center flex-shrink-0 text-xs font-bold">
                  <span>{new Date(event.startDate).toLocaleDateString('en-GB', { day: 'numeric' })}</span>
                  <span className="text-[10px] font-normal">{new Date(event.startDate).toLocaleDateString('en-GB', { month: 'short' })}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm group-hover:text-accent transition-colors line-clamp-1">
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{event.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Sermons */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-primary flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" /> Recent Sermons
            </h2>
            <Link to="/sermons" className="text-xs text-accent hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentSermons.map((sermon) => (
              <Link key={sermon.id} to={`/sermons/${sermon.id}`} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group">
                <div
                  className="w-12 h-12 rounded-xl bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${sermon.thumbnailUrl})` }}
                />
                <div>
                  <p className="font-medium text-gray-900 text-sm group-hover:text-accent transition-colors line-clamp-1">
                    {sermon.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{sermon.speaker}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Give Banner */}
      <div
        className="mt-6 rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{ backgroundImage: 'url(/conference-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-primary/80 rounded-2xl" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" /> Support the Vision
            </h3>
            <p className="text-white/70 text-sm">Your giving partners with God's work through RCN globally.</p>
          </div>
          <Link to="/give" className="btn-primary flex-shrink-0">Give Now <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
