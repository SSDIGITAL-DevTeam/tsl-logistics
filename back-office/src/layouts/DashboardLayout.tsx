import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users2, FileText, Tag, LogOut, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { queryClient } from '../lib/queryClient';

const nav = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/leads', icon: Users2, label: 'Leads' },
  { to: '/categories', icon: Tag, label: 'Categories' },
  { to: '/blog', icon: FileText, label: 'Blog Posts' },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <aside className="flex h-full w-64 flex-col bg-[#141414]">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <img src="/logo.png" alt="TSL Logistics" className="h-8 w-auto object-contain" />
        {onClose && (
          <button onClick={onClose} className="rounded-lg p-1 text-white/40 hover:text-white hover:bg-white/10 transition-colors lg:hidden">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#C8A84B]/15 text-[#C8A84B]'
                  : 'text-white/50 hover:bg-white/6 hover:text-white/90'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom decoration */}
      <div className="px-5 py-4 border-t border-white/8">
        <p className="text-[10px] font-medium uppercase tracking-widest text-white/20">TSL Back Office</p>
      </div>
    </aside>
  );
}

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const closeMobile = () => {
    setIsExiting(true);
    setTimeout(() => { setMobileOpen(false); setIsExiting(false); }, 200);
  };

  const handleLogout = async () => {
    await logout();
    queryClient.clear();
    window.location.href = '/login';
  };

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      {(mobileOpen || isExiting) && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
            onClick={closeMobile}
          />
          <div className={`absolute left-0 top-0 h-full ${isExiting ? 'sidebar-exit' : 'sidebar-enter'}`}>
            <SidebarContent onClose={closeMobile} />
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="z-10 flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <img src="/logo.png" alt="TSL" className="h-7 w-auto object-contain lg:hidden" />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-none">{user?.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-none">{user?.email}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-[#C8A84B]/15 flex items-center justify-center text-[#C8A84B] font-bold text-sm shrink-0">
              {user?.name?.[0]?.toUpperCase() ?? 'A'}
            </div>
            <button
              onClick={handleLogout}
              title="Sign out"
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
