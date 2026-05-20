import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users2, FileText, Tag, LogOut, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { queryClient } from '../lib/queryClient';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/leads', icon: Users2, label: 'Leads' },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/categories', icon: Tag, label: 'Categories' },
      { to: '/blog', icon: FileText, label: 'Blog Posts' },
    ],
  },
];

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/leads': 'Leads',
  '/categories': 'Blog Categories',
  '/blog': 'Blog Posts',
};

interface SidebarProps {
  onLogout: () => void;
  onClose?: () => void;
}

function SidebarContent({ onLogout, onClose }: SidebarProps) {
  return (
    <aside className="flex h-full w-[240px] flex-col bg-[#0A0A0B]">
      {/* Logo */}
      <div className="relative flex h-16 items-center justify-center border-b border-white/6">
        <img src="/logo.png" alt="TSL Logistics" className="h-8 w-auto object-contain" />
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 rounded-xl p-1.5 text-white/30 hover:text-white/70 hover:bg-white/8 transition-colors lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/20">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 group ${
                      isActive
                        ? 'bg-[#C8A84B]/12 text-[#C8A84B]'
                        : 'text-white/40 hover:bg-white/5 hover:text-white/75'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          isActive
                            ? 'bg-[#C8A84B]/18 text-[#C8A84B]'
                            : 'bg-white/[0.06] text-white/35 group-hover:bg-white/[0.09] group-hover:text-white/65'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      {label}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="border-t border-white/6 px-3 py-4">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-white/35 hover:bg-white/5 hover:text-white/65 transition-all duration-150 group"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] group-hover:bg-white/[0.09] transition-colors">
            <LogOut className="h-3.5 w-3.5" />
          </span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const pageTitle = PAGE_TITLES[location.pathname] ?? 'TSL Admin';

  const closeMobile = () => {
    setIsExiting(true);
    setTimeout(() => { setMobileOpen(false); setIsExiting(false); }, 200);
  };

  const handleLogout = async () => {
    await logout();
    queryClient.clear();
    window.location.href = '/login';
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F3F4F8]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <SidebarContent onLogout={handleLogout} />
      </div>

      {/* Mobile sidebar */}
      {(mobileOpen || isExiting) && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
            onClick={closeMobile}
          />
          <div className={`absolute left-0 top-0 h-full ${isExiting ? 'sidebar-exit' : 'sidebar-enter'}`}>
            <SidebarContent onLogout={handleLogout} onClose={closeMobile} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-gray-200/80 bg-white/85 backdrop-blur-md px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-xl p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <img src="/logo.png" alt="TSL" className="h-7 w-auto object-contain lg:hidden" />
            <p className="hidden lg:block text-sm font-semibold text-gray-700">{pageTitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-none">{user?.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-none">{user?.email}</p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#D4B050] to-[#B08830] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-[0_2px_8px_rgba(200,168,75,0.4)]">
              {user?.name?.[0]?.toUpperCase() ?? 'A'}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-5 lg:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
