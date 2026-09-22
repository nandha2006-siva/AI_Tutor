import React from 'react';
import BrandLogo from '../common/BrandLogo';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-medium)',
        padding: '4rem 0 2.5rem 0'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem'
          }}
        >
          {/* Col 1: Brand & Mission */}
          <div style={{ maxWidth: '340px' }}>
            <BrandLogo size="default" />
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '1.25rem', lineHeight: 1.6 }}>
              Nexora AI is a next-generation academic intelligence platform empowering students,
              teachers, and parents with adaptive study blueprints and multilingual AI companions.
            </p>
          </div>

          {/* Col 2: For Students */}
          <div>
            <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--maroon-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Student Platform
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li><a href="#roles" style={{ color: 'var(--text-secondary)' }}>Personalized Study Plan</a></li>
              <li><a href="#roles" style={{ color: 'var(--text-secondary)' }}>Syllabus & Timetable Sync</a></li>
              <li><a href="#roles" style={{ color: 'var(--text-secondary)' }}>High-Yield Exam Topics</a></li>
              <li><a href="#ai-tutor" style={{ color: 'var(--text-secondary)' }}>Interactive AI Tutor Avatar</a></li>
              <li><a href="#ai-tutor" style={{ color: 'var(--text-secondary)' }}>Multilingual Explanations</a></li>
            </ul>
          </div>

          {/* Col 3: For Educators & Parents */}
          <div>
            <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--maroon-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Educators & Parents
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li><a href="#roles" style={{ color: 'var(--text-secondary)' }}>Teacher Dashboard & Classes</a></li>
              <li><a href="#roles" style={{ color: 'var(--text-secondary)' }}>Weak-Topic Diagnostics</a></li>
              <li><a href="#roles" style={{ color: 'var(--text-secondary)' }}>Parent Progress Pulse</a></li>
              <li><a href="#roles" style={{ color: 'var(--text-secondary)' }}>Attendance & Exam Reminders</a></li>
            </ul>
          </div>

          {/* Col 4: Regional Inclusivity */}
          <div>
            <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--maroon-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Languages Supported
            </h5>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Bridging educational divides for rural and regional learners:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['English', 'தமிழ்', 'हिन्दी', 'తెలుగు', 'ಕನ್ನಡ', 'മലയാളം'].map((l) => (
                <span key={l} className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.84rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} NEXORA AI Inc. All rights reserved. Built with academic rigor.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Regional Education Initiative</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
