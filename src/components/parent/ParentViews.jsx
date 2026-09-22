import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PARENT_DATA, STUDENT_DATA } from '../../data/mockData';
import { 
  HeartHandshake, CheckSquare, Clock, Bell, User, CheckCircle2, 
  AlertCircle, MessageSquare, Award, ArrowRight, Send, Check, Plus
} from 'lucide-react';

/* -----------------------------------------------------------
   1. PARENT MAIN DASHBOARD VIEW
   ----------------------------------------------------------- */
export function ParentDashboardView({ onNavigate }) {
  const { currentUser } = useAuth();
  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('nexora_parent_alerts');
    return saved ? JSON.parse(saved) : PARENT_DATA.alerts;
  });

  const [replyText, setReplyText] = useState('');
  const [acknowledgedId, setAcknowledgedId] = useState(null);

  const handleAcknowledge = (id) => {
    setAcknowledgedId(id);
    setTimeout(() => setAcknowledgedId(null), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px' }}>
      {/* Banner */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem 2rem',
          border: '1.5px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <span className="badge badge-maroon" style={{ marginBottom: '0.5rem' }}>
            Parent Portal • Academic Pulse
          </span>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>
            Welcome, {currentUser?.name || 'Mr. & Mrs. Sharma'} 👨‍👩‍👧
          </h1>
          <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)' }}>
            Monitoring: <strong>{PARENT_DATA.childName}</strong> ({PARENT_DATA.grade})
          </p>
        </div>

        {/* Pulse Indicators */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-lg)', padding: '0.85rem 1.25rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--status-success)', fontWeight: 800, fontSize: '1.25rem' }}>{PARENT_DATA.studyPlanAdherence}</div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Study Plan Adherence</span>
          </div>
          <div style={{ backgroundColor: 'var(--maroon-50)', border: '1px solid var(--maroon-200)', borderRadius: 'var(--radius-lg)', padding: '0.85rem 1.25rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--maroon-primary)', fontWeight: 800, fontSize: '1.25rem' }}>{PARENT_DATA.attendancePercent}</div>
            <span style={{ fontSize: '0.72rem', color: 'var(--maroon-primary)', textTransform: 'uppercase', fontWeight: 700 }}>Attendance</span>
          </div>
        </div>
      </div>

      {/* Grid: Strengths & Focus Areas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Academic Strengths */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Award size={20} style={{ color: 'var(--status-success)' }} />
            <h3 style={{ fontSize: '1.2rem' }}>Demonstrated Strengths</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {PARENT_DATA.academicStrengths.map((str, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--status-success)', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{str}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Focus Areas */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <AlertCircle size={20} style={{ color: 'var(--accent-gold-dark)' }} />
            <h3 style={{ fontSize: '1.2rem' }}>Recommended Focus Areas</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {PARENT_DATA.focusAreas.map((focus, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-gold-dark)', marginTop: '8px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{focus}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts & Direct Teacher Communication */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Teacher Communications & Alerts</h3>
          <button onClick={() => onNavigate('alerts')} style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--maroon-primary)' }}>
            All Alerts
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {alerts.map((alt) => (
            <div
              key={alt.id}
              style={{
                padding: '1.15rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-page)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bell size={16} style={{ color: 'var(--maroon-primary)' }} />
                  <span className="badge badge-maroon" style={{ fontSize: '0.68rem' }}>{alt.type}</span>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{alt.date}</span>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                {alt.message}
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button
                  onClick={() => handleAcknowledge(alt.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.78rem' }}
                >
                  {acknowledgedId === alt.id ? (
                    <>
                      <Check size={14} style={{ color: 'var(--status-success)' }} />
                      <span style={{ color: 'var(--status-success)' }}>Acknowledged by Parent</span>
                    </>
                  ) : (
                    <span>Acknowledge Notice</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   2. PARENT SUB-VIEWS (Child, Progress, Attendance, Alerts)
   ----------------------------------------------------------- */
export function ParentChildView() {
  const [isLinking, setIsLinking] = useState(false);
  const [studentCode, setStudentCode] = useState('');

  return (
    <div className="card" style={{ maxWidth: '720px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Student Profile: {PARENT_DATA.childName}</h2>
        <button onClick={() => setIsLinking(!isLinking)} className="btn btn-secondary btn-sm">
          <Plus size={14} />
          <span>Link Sibling Profile</span>
        </button>
      </div>

      {isLinking && (
        <div style={{ backgroundColor: 'var(--bg-page)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Enter Student Nexora ID</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. NEX-STD-9901"
                value={studentCode}
                onChange={e => setStudentCode(e.target.value)}
              />
              <button onClick={() => { alert('Student profile link request sent!'); setIsLinking(false); }} className="btn btn-primary">
                Link
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
        <div><strong>School:</strong> {PARENT_DATA.schoolName}</div>
        <div><strong>Grade & Stream:</strong> {PARENT_DATA.grade}</div>
        <div><strong>Last Active Session:</strong> {PARENT_DATA.lastActiveSession}</div>
        <div><strong>Nexora ID:</strong> NEX-STD-4402</div>
        <div><strong>Enrolled Subjects:</strong> Physics, Chemistry, Mathematics, Computer Science</div>
      </div>
    </div>
  );
}

export function ParentAttendanceView() {
  return (
    <div className="card" style={{ maxWidth: '720px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Monthly Attendance Overview</h2>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Overall term attendance: <strong style={{ color: 'var(--status-success)' }}>{PARENT_DATA.attendancePercent}</strong> (Exceeds 75% CBSE requirement).
      </p>
      <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ fontWeight: 700 }}>September 2026</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
          Days Present: 22 / 23 • Excused Absences: 1 (Medical note submitted)
        </div>
      </div>
    </div>
  );
}

export function ParentAlertsView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '720px' }}>
      <h2 style={{ fontSize: '1.5rem' }}>Academic Notifications & Teacher Messages</h2>
      {PARENT_DATA.alerts.map((alt) => (
        <div key={alt.id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span className="badge badge-maroon">{alt.type}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{alt.date}</span>
          </div>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{alt.message}</p>
        </div>
      ))}
    </div>
  );
}

export function ParentProfileView() {
  const { currentUser } = useAuth();
  return (
    <div className="card" style={{ maxWidth: '640px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Parent Profile</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
        <div><strong>Guardian Name:</strong> {currentUser?.name || 'Rajesh & Priya Sharma'}</div>
        <div><strong>Email:</strong> {currentUser?.email || 'parent.sharma@nexora.ai'}</div>
        <div><strong>Linked Student:</strong> {currentUser?.childName || 'Aarav Sharma'}</div>
        <div><strong>Role:</strong> Parent (Informed Guardian)</div>
      </div>
    </div>
  );
}
