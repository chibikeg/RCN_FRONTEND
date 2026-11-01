import { useState } from 'react';
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Users, CalendarDays, BookOpen, Megaphone,
  UserCheck, ClipboardList, Building2, CreditCard, User,
  LogOut, Menu, X, Flame, ChevronRight, Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', end: true },
      { icon: User, label: 'My Profile', path: '/dashboard/profile' },
    ],
  },
  {
    label: 'Church Management',
    minRole: 'WORKER',
    items: [
      { icon: Users, label: 'Members', path: '/dashboard/members', minRole: 'WORKER' },
      { icon: UserCheck, label: 'Attendance', path: '/dashboard/attendance', minRole: 'WORKER' },
      { icon: Bell, label: 'First Timers', path: '/dashboard/first-timers', minRole: 'WORKER' },
      { icon: ClipboardList, label: 'Rosters', path: '/dashboard/rosters', minRole: 'WORKER' },
      { icon: Building2, label: 'Departments', path: '/dashboard/departments', minRole: 'DEPARTMENT_HEAD' },
    ],
  },
  {
    label: 'Content',
    minRole: 'ADMIN',
    items: [
      { icon: CalendarDays, label: 'Events', path: '/dashboard/events', minRole: 'ADMIN' },
      { icon: Megaphone, label: 'Announcements', path: '/dashboard/announcements', minRole: 'ADMIN' },
      { icon: BookOpen, label: 'Sermons', path: '/dashboard/sermons', minRole: 'PASTOR' },
      { icon: CreditCard, label: 'Donations', path: '/dashboard/donations', minRole: 'PASTOR' },
    ],
  },
];

const DashboardLayout = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const roleLabelMap = {
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Admin',
    PASTOR: 'Pastor',
    DEPARTMENT_HEAD: 'Dept. Head',
    WORKER: 'Worker',
    MEMBER: 'Member',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-primary z-40 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-full bg-accent-gradient flex items-center justify-center">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm font-display">RCN Portal</div>
            <div className="text-white/40 text-xs">Member Dashboard</div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-white/50 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {user?.profile?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">
                {user?.profile ? `${user.profile.firstName} ${user.profile.lastName}` : user?.email}
              </div>
              <div className="text-accent text-xs">{roleLabelMap[user?.role] || user?.role}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {navGroups.map((group) => {
            const visibleItems = group.items.filter(
              (item) => !item.minRole || hasRole(item.minRole)
            );
            if (visibleItems.length === 0) return null;
            return (
              <div key={group.label} className="mb-4">
                <div className="px-3 mb-1 text-white/30 text-xs font-semibold uppercase tracking-widest">
                  {group.label}
                </div>
                {visibleItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 ${
                        isActive
                          ? 'bg-accent/20 text-accent border border-accent/20'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all"
          >
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-4 md:px-6 h-16 flex items-center gap-4 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <Link to="/" className="text-sm text-gray-500 hover:text-accent transition-colors hidden sm:block">
            Visit Website
          </Link>
          <div className="w-8 h-8 rounded-full bg-accent-gradient flex items-center justify-center text-white font-bold text-xs">
            {user?.profile?.firstName?.[0] || 'U'}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
