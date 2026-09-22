import React from 'react';
import Slideshow from './Slideshow';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2, GraduationCap, School, Users } from 'lucide-react';

export default function HeroSection() {
  const { openSignIn, openSignUp } = useAuth();

  return (
    <section
      style={{
        paddingTop: '2.5rem',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Background Accent Wash */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107, 23, 40, 0.04) 0%, rgba(250, 247, 242, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Brand, Tagline, Value Prop & Prominent CTAs */}
          <div>
            {/* Pill Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--maroon-50)',
                border: '1px solid var(--maroon-200)',
                padding: '0.35rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                marginBottom: '1.25rem'
              }}
            >
              <Sparkles size={15} style={{ color: 'var(--maroon-primary)' }} />
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--maroon-primary)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                Next-Gen AI Education Platform
              </span>
            </div>

            {/* Main Brand Title & Powerful Tagline */}
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 3.6rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                marginBottom: '1.25rem'
              }}
            >
              Precision AI Learning for{' '}
              <span
                style={{
                  color: 'var(--maroon-primary)',
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                Every Mind.
              </span>
            </h1>

            {/* Concise explanation of what Nexora AI does */}
            <p
              style={{
                fontSize: '1.12rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '560px',
                marginBottom: '2rem'
              }}
            >
              Nexora AI transforms academic preparation into an intelligent, adaptive journey.
              By analyzing syllabus timetables and exam schedules, we generate personalized study
              blueprints and empower students with an interactive multilingual AI study companion.
            </p>

            {/* Prominent Action Buttons (Above the Fold) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2.5rem'
              }}
            >
              {/* Primary Get Started / Sign Up */}
              <button
                id="hero-get-started-btn"
                onClick={() => openSignUp()}
                className="btn btn-primary btn-lg"
                style={{
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <span>Get Started Free</span>
                <ArrowRight size={18} />
              </button>

              {/* Prominent Sign In Button */}
              <button
                id="hero-sign-in-btn"
                onClick={openSignIn}
                className="btn btn-secondary btn-lg"
                style={{
                  fontWeight: 700,
                  borderColor: 'var(--maroon-primary)',
                  color: 'var(--maroon-primary)'
                }}
              >
                Sign In to Account
              </button>
            </div>

            {/* Role Trust Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <GraduationCap size={18} style={{ color: 'var(--maroon-primary)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Students
                </span>
              </div>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--border-medium)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <School size={18} style={{ color: 'var(--maroon-primary)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Teachers
                </span>
              </div>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--border-medium)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Users size={18} style={{ color: 'var(--maroon-primary)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Parents
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Educational Slideshow (Appropriately Sized) */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Slideshow />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .hero-grid {
            grid-template-columns: 1.15fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
