import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../common/BrandLogo';
import LanguageSelector from '../common/LanguageSelector';
import { 
  LayoutDashboard, Calendar, BookOpen, Clock, FileQuestion, Bot, 
  TrendingUp, User, Users, School, FolderUp, FileText, BarChart3, 
  HeartHandshake, CheckSquare, Bell, LogOut, Menu, X, ChevronRight,
  Shield, Sparkles, GraduationCap
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const { currentUser, logout, activeTab, setActiveTab, loginWithDemo } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Navigation Items per role
  const getNavItems = () => {
    if (!currentUser) return [];

    if (currentUser.role === 'student') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'study_plan', label: 'My Study Plan', icon: Calendar, badge: 'Today' },
        { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
        { id: 'exams', label: 'Exams', icon: Clock, badge: '16d' },
        { id: 'important_questions', label: 'Important Questions', icon: FileQuestion },
        { id: 'ai_tutor', label: 'AI Tutor', icon: Bot, highlight: true },
        { id: 'progress', label: 'Progress', icon: TrendingUp },
        { id: 'profile', label: 'Profile', icon: User }
      ];
    }

    if (currentUser.role === 'teacher') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'students', label: 'Students', icon: Users, badge: '168' },
        { id: 'classes', label: 'Classes', icon: School },
        { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
        { id: 'resources', label: 'Resources', icon: FolderUp },
        { id: 'assignments', label: 'Assignments', icon: FileText },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'profile', label: 'Profile', icon: User }
      ];
    }

    // Parent
    return [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'my_child', label: 'My Child', icon: GraduationCap },
      { id: 'progress', label: 'Progress', icon: TrendingUp, badge: '92%' },
      { id: 'attendance', label: 'Attendance', icon: CheckSquare },
      { id: 'exams', label: 'Exams', icon: Clock },
      { id: 'alerts', label: 'Alerts', icon: Bell, badge: '2 New' },
      { id: 'profile', label: 'Profile', icon: User }
    ];
  };

  const navItems = getNavItems();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileDrawerOpen(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      {/* ----------------------------------------------------
          SIDEBAR (Desktop & Drawer)
         ---------------------------------------------------- */}
      <aside
        style={{
          width: isSidebarCollapsed ? '78px' : '260px',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid var(--border-medium)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 800,
          flexShrink: 0
        }}
        className={`desktop-sidebar ${isMobileDrawerOpen ? 'mobile-drawer-open' : ''}`}
      >
        {/* Sidebar Brand Header */}
        <div
          style={{
            padding: '1.25rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isSidebarCollapsed ? 'center' : 'space-between'
          }}
        >
          {!isSidebarCollapsed ? (
            <div onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
              <BrandLogo size="small" />
            </div>
          ) : (
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--maroon-primary)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}
            >
              N
            </div>
          )}

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            style={{
              color: 'var(--text-muted)',
              padding: '0.25rem',
              borderRadius: 'var(--radius-sm)',
              display: 'none'
            }}
            className="collapse-toggle-btn"
            aria-label="Toggle sidebar"
          >
            <ChevronRight
              size={18}
              style={{
                transform: isSidebarCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.2s'
              }}
            />
          </button>
        </div>

        {/* Role Identity Tag */}
        {!isSidebarCollapsed && (
          <div style={{ padding: '0.9rem 1.25rem 0.5rem 1.25rem' }}>
            <div
              style={{
                backgroundColor: 'var(--maroon-50)',
                border: '1px solid var(--maroon-200)',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <div style={{ fontSize: '1.1rem' }}>{currentUser?.avatar || '🎓'}</div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--maroon-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {currentUser?.role} PORTAL
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {currentUser?.name}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: '0.75rem 0.85rem', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isSidebarCollapsed ? 0 : '0.75rem',
                    justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                    padding: isSidebarCollapsed ? '0.75rem 0' : '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isActive ? 'var(--maroon-50)' : 'transparent',
                    color: isActive ? 'var(--maroon-primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.88rem',
                    border: 'none',
                    textAlign: 'left',
                    position: 'relative',
                    transition: 'all var(--transition-fast)'
                  }}
                  title={item.label}
                >
                  <Icon
                    size={19}
                    style={{
                      color: isActive ? 'var(--maroon-primary)' : item.highlight ? 'var(--accent-gold-dark)' : 'var(--text-muted)',
                      flexShrink: 0
                    }}
                  />

                  {!isSidebarCollapsed && (
                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.label}
                    </span>
                  )}

                  {!isSidebarCollapsed && item.badge && (
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        backgroundColor: isActive ? 'var(--maroon-primary)' : 'var(--bg-subtle)',
                        color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                        padding: '0.1rem 0.45rem',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}

                  {!isSidebarCollapsed && item.highlight && (
                    <span className="badge badge-gold" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer Controls */}
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          {/* Quick Demo Switcher (Helps testing between Student, Teacher, Parent) */}
          {!isSidebarCollapsed && (
            <div style={{ marginBottom: '0.4rem' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Switch Role View
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.3rem' }}>
                <button
                  type="button"
                  onClick={() => loginWithDemo('student')}
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.3rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: currentUser?.role === 'student' ? 'var(--maroon-50)' : 'transparent',
                    color: currentUser?.role === 'student' ? 'var(--maroon-primary)' : 'var(--text-secondary)',
                    fontWeight: currentUser?.role === 'student' ? 700 : 500
                  }}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => loginWithDemo('teacher')}
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.3rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: currentUser?.role === 'teacher' ? 'var(--maroon-50)' : 'transparent',
                    color: currentUser?.role === 'teacher' ? 'var(--maroon-primary)' : 'var(--text-secondary)',
                    fontWeight: currentUser?.role === 'teacher' ? 700 : 500
                  }}
                >
                  Teacher
                </button>
                <button
                  type="button"
                  onClick={() => loginWithDemo('parent')}
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.3rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: currentUser?.role === 'parent' ? 'var(--maroon-50)' : 'transparent',
                    color: currentUser?.role === 'parent' ? 'var(--maroon-primary)' : 'var(--text-secondary)',
                    fontWeight: currentUser?.role === 'parent' ? 700 : 500
                  }}
                >
                  Parent
                </button>
              </div>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isSidebarCollapsed ? 0 : '0.6rem',
              justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
              padding: '0.55rem',
              borderRadius: 'var(--radius-md)',
              color: 'var(--status-error)',
              fontSize: '0.85rem',
              fontWeight: 600,
              width: '100%',
              backgroundColor: 'transparent',
              transition: 'background-color 0.2s'
            }}
          >
            <LogOut size={16} />
            {!isSidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ----------------------------------------------------
          MAIN CONTENT AREA & TOP HEADER
         ---------------------------------------------------- */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header Bar */}
        <header
          style={{
            height: '68px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 700
          }}
        >
          {/* Mobile Drawer Trigger & Page Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="mobile-header-toggle"
              style={{
                display: 'none',
                padding: '0.4rem',
                color: 'var(--text-primary)'
              }}
              aria-label="Toggle navigation"
            >
              <Menu size={22} />
            </button>

            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'capitalize', color: 'var(--text-primary)' }}>
                {activeTab.replace('_', ' ')}
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {currentUser?.role === 'student' && `${currentUser?.grade} • ${currentUser?.curriculum}`}
                {currentUser?.role === 'teacher' && `${currentUser?.designation}`}
                {currentUser?.role === 'parent' && `Monitoring: ${currentUser?.childName}`}
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Language Selector */}
            <LanguageSelector variant="small" />

            {/* Notifications Bell */}
            <button
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
              aria-label="Notifications"
            >
              <Bell size={17} />
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--maroon-primary)'
                }}
              />
            </button>

            {/* User Profile Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ fontSize: '1.2rem' }}>{currentUser?.avatar}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {currentUser?.name}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--maroon-primary)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {currentUser?.role}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .collapse-toggle-btn {
            display: flex !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-sidebar {
            position: fixed;
            left: -280px;
            top: 0;
            bottom: 0;
            width: 260px !important;
            box-shadow: var(--shadow-lg);
            transition: left 0.3s ease;
          }
          .desktop-sidebar.mobile-drawer-open {
            left: 0 !important;
          }
          .mobile-header-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
