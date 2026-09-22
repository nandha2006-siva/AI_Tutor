import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, School, Users, CheckCircle2, ArrowRight, Sparkles, BookOpen, Clock, Bot } from 'lucide-react';

export default function RolesSection() {
  const { openSignUp } = useAuth();

  const roles = [
    {
      id: 'student',
      roleKey: 'student',
      title: 'For Students',
      badge: 'Autonomous Learner',
      icon: GraduationCap,
      description: 'Your personal academic companion that creates customized daily blueprints and explains difficult concepts on-demand.',
      points: [
        'AI Timetable & Syllabus Analyzer',
        'Personalized daily study milestones',
        'Exam countdown & high-yield topics',
        'Interactive multilingual AI Tutor Companion'
      ],
      ctaText: 'Explore Student Portal',
      accentColor: 'var(--maroon-primary)'
    },
    {
      id: 'teacher',
      roleKey: 'teacher',
      title: 'For Teachers',
      badge: 'Academic Co-Pilot',
      icon: School,
      description: 'Supercharge class guidance with automated syllabus pacing, intelligent test creation, and real-time student diagnostic insights.',
      points: [
        'Curriculum pacing & syllabus tracking',
        'Automated question paper & quiz creator',
        'Class-wide weak-topic diagnostic heatmaps',
        'Curated notes & resource distribution'
      ],
      ctaText: 'Explore Teacher Portal',
      accentColor: 'var(--maroon-hover)'
    },
    {
      id: 'parent',
      roleKey: 'parent',
      title: 'For Parents',
      badge: 'Informed Guardian',
      icon: Users,
      description: 'Clear, jargon-free visibility into your child’s academic efforts, attendance, milestones, and direct educator updates.',
      points: [
        'Real-time study-plan adherence metrics',
        'Attendance & exam calendar alerts',
        'Academic strengths & focus area summaries',
        'Direct teacher feedback notifications'
      ],
      ctaText: 'Explore Parent Portal',
      accentColor: 'var(--maroon-dark)'
    }
  ];

  return (
    <section id="roles" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge badge-maroon" style={{ marginBottom: '0.75rem' }}>
            Tri-Role Academic Ecosystem
          </span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)', marginBottom: '1rem' }}>
            Built for Students, Educators, and Families
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            Nexora AI is not a generic chatbot. It is a connected academic environment where every
            stakeholder has a tailored portal designed for their exact needs.
          </p>
        </div>

        {/* 3 Role Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {roles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="card card-hoverable"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--bg-page)',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.25rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--maroon-50)',
                        color: 'var(--maroon-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={26} />
                    </div>
                    <span className="badge badge-neutral">{item.badge}</span>
                  </div>

                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                    {item.points.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <CheckCircle2 size={18} style={{ color: 'var(--maroon-primary)', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openSignUp(item.roleKey)}
                  className="btn btn-outline"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontWeight: 700
                  }}
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
