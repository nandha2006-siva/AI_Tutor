import React, { useState } from 'react';
import { STUDENT_DATA, SUPPORTED_LANGUAGES } from '../../data/mockData';
import { Bot, Volume2, Sparkles, CheckCircle2, MessageSquare, ArrowRight, Brain, RotateCcw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AITutorSection() {
  const { openSignUp } = useAuth();
  const [selectedLang, setSelectedLang] = useState('en');
  const [avatarState, setAvatarState] = useState('explaining'); // 'explaining' | 'quizzing' | 'encouraging'
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const tutorContent = STUDENT_DATA.aiTutorConcepts[selectedLang] || STUDENT_DATA.aiTutorConcepts.en;

  const handleVoicePlay = () => {
    setIsSpeaking(true);
    setTimeout(() => {
      setIsSpeaking(false);
    }, 3000);
  };

  const handleAnswer = (index) => {
    setQuizAnswer(index);
    if (index === tutorContent.correctIndex) {
      setAvatarState('encouraging');
    }
  };

  return (
    <section
      id="ai-tutor"
      style={{
        padding: '5.5rem 0',
        backgroundColor: 'var(--bg-subtle)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative'
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge badge-maroon" style={{ marginBottom: '0.75rem' }}>
            Interactive AI Study Companion
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 2.7rem)', marginBottom: '1rem' }}>
            Not Just a Text Bot. A Living Academic Companion.
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            Inspired by interactive visual companions, Nexora’s AI Tutor speaks, explains, questions,
            and adapts across regional Indian languages to empower every student.
          </p>

          {/* Interactive Language Selector Tabs */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
              backgroundColor: 'var(--bg-surface)',
              padding: '0.4rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              marginTop: '1.5rem'
            }}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLang(lang.code);
                  setQuizAnswer(null);
                  setAvatarState('explaining');
                }}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: selectedLang === lang.code ? 'var(--maroon-primary)' : 'transparent',
                  color: selectedLang === lang.code ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
              >
                {lang.native} ({lang.name})
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Avatar Stage */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden'
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.75rem',
              backgroundColor: 'var(--bg-page)',
              borderBottom: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: isSpeaking ? '#22C55E' : 'var(--maroon-primary)',
                  boxShadow: isSpeaking ? '0 0 10px #22C55E' : 'none'
                }}
              />
              <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--maroon-primary)' }}>
                NEXORA AI TUTOR AVATAR
              </span>
              <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                Class 12 Physics: Electromagnetic Induction
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={handleVoicePlay}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}
              >
                <Volume2 size={14} style={{ color: 'var(--maroon-primary)' }} />
                <span>{isSpeaking ? 'Speaking...' : 'Listen Audio'}</span>
              </button>
            </div>
          </div>

          {/* Main Stage Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2rem',
              padding: '2rem'
            }}
            className="avatar-stage-grid"
          >
            {/* Left: Animated Avatar Visual Companion */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                border: '1px solid var(--border-medium)',
                textAlign: 'center'
              }}
            >
              {/* Avatar Head / Companion Body */}
              <div
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '4px solid var(--maroon-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  boxShadow: '0 8px 24px rgba(107, 23, 40, 0.15)',
                  animation: isSpeaking ? 'pulseGlow 1.5s infinite' : 'none',
                  marginBottom: '1rem'
                }}
              >
                {/* Visual Avatar Face with Interactive Expressions */}
                <svg width="84" height="84" viewBox="0 0 100 100" fill="none">
                  {/* Face base */}
                  <circle cx="50" cy="50" r="44" fill="#FAF7F2" stroke="#6B1728" strokeWidth="3" />
                  {/* Academic Cap / Crest */}
                  <path d="M50 15L20 28L50 41L80 28L50 15Z" fill="#6B1728" />
                  <path d="M72 32V50" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="72" cy="52" r="3" fill="#D97706" />

                  {/* Eyes - Dynamic based on state */}
                  {avatarState === 'encouraging' ? (
                    <>
                      {/* Happy crescent eyes */}
                      <path d="M35 48C35 45 42 45 42 48" stroke="#1F242D" strokeWidth="4" strokeLinecap="round" />
                      <path d="M58 48C58 45 65 45 65 48" stroke="#1F242D" strokeWidth="4" strokeLinecap="round" />
                    </>
                  ) : (
                    <>
                      {/* Attentive blinking pupils */}
                      <circle cx="38" cy="48" r="5" fill="#1F242D" />
                      <circle cx="62" cy="48" r="5" fill="#1F242D" />
                      <circle cx="40" cy="46" r="1.5" fill="#FFFFFF" />
                      <circle cx="64" cy="46" r="1.5" fill="#FFFFFF" />
                    </>
                  )}

                  {/* Cheeks */}
                  <circle cx="30" cy="56" r="4" fill="#F6E4E7" />
                  <circle cx="70" cy="56" r="4" fill="#F6E4E7" />

                  {/* Mouth - Animated if speaking */}
                  {isSpeaking ? (
                    <ellipse cx="50" cy="66" rx="8" ry="6" fill="#821D32" />
                  ) : avatarState === 'encouraging' ? (
                    <path d="M40 64C44 70 56 70 60 64" stroke="#821D32" strokeWidth="3.5" strokeLinecap="round" />
                  ) : (
                    <path d="M43 66C46 69 54 69 57 66" stroke="#821D32" strokeWidth="3" strokeLinecap="round" />
                  )}
                </svg>

                {/* Floating Micro Status Pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-8px',
                    backgroundColor: 'var(--maroon-primary)',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    letterSpacing: '0.04em'
                  }}
                >
                  {isSpeaking ? 'SPEAKING' : avatarState.toUpperCase()}
                </div>
              </div>

              <h4 style={{ fontSize: '1.1rem', color: 'var(--maroon-primary)', marginBottom: '0.25rem' }}>
                Nexora Companion
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Adapts pace to your comprehension level
              </p>

              {/* State Trigger Buttons */}
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1rem' }}>
                <button
                  onClick={() => { setAvatarState('explaining'); setQuizAnswer(null); }}
                  className={`btn btn-sm ${avatarState === 'explaining' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                >
                  Explain
                </button>
                <button
                  onClick={() => { setAvatarState('quizzing'); setQuizAnswer(null); }}
                  className={`btn btn-sm ${avatarState === 'quizzing' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                >
                  Quiz Me
                </button>
              </div>
            </div>

            {/* Right: Companion Dialog & Interaction Card */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* Dialogue Speech Bubble */}
              <div
                style={{
                  backgroundColor: 'var(--bg-page)',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  position: 'relative',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <Brain size={18} style={{ color: 'var(--maroon-primary)' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--maroon-primary)' }}>
                    Concept Breakdown ({SUPPORTED_LANGUAGES.find(l => l.code === selectedLang)?.name})
                  </span>
                </div>

                <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  "{tutorContent.avatarGreeting}"
                </p>

                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  "{tutorContent.explanationSnippet}"
                </p>
              </div>

              {/* Interactive Micro Quiz */}
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-gold-dark)' }}>
                    ⚡ QUICK COMPREHENSION CHECK
                  </span>
                  {quizAnswer !== null && (
                    <button
                      onClick={() => setQuizAnswer(null)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}
                    >
                      <RotateCcw size={12} />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.85rem' }}>
                  {tutorContent.quizQuestion}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
                  {tutorContent.options.map((opt, optIdx) => {
                    const isSelected = quizAnswer === optIdx;
                    const isCorrect = optIdx === tutorContent.correctIndex;
                    let btnStyle = {
                      backgroundColor: 'var(--bg-page)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)'
                    };

                    if (quizAnswer !== null) {
                      if (isCorrect) {
                        btnStyle = {
                          backgroundColor: 'var(--status-success-bg)',
                          borderColor: 'var(--status-success)',
                          color: 'var(--status-success)'
                        };
                      } else if (isSelected) {
                        btnStyle = {
                          backgroundColor: 'var(--status-error-bg)',
                          borderColor: 'var(--status-error)',
                          color: 'var(--status-error)'
                        };
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswer(optIdx)}
                        disabled={quizAnswer !== null}
                        style={{
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s',
                          ...btnStyle
                        }}
                      >
                        <span>{opt}</span>
                        {quizAnswer !== null && isCorrect && <CheckCircle2 size={16} />}
                      </button>
                    );
                  })}
                </div>

                {quizAnswer !== null && (
                  <div
                    style={{
                      marginTop: '0.85rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: quizAnswer === tutorContent.correctIndex ? 'var(--status-success-bg)' : 'var(--status-error-bg)',
                      color: quizAnswer === tutorContent.correctIndex ? 'var(--status-success)' : 'var(--status-error)',
                      fontSize: '0.82rem',
                      fontWeight: 600
                    }}
                  >
                    {quizAnswer === tutorContent.correctIndex
                      ? '🎉 Outstanding! The AI Companion noticed your quick comprehension.'
                      : '💡 Not quite. The faster the magnet moves, the faster the flux changes, so current doubles!'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Callout Banner */}
          <div
            style={{
              padding: '1.25rem 2rem',
              backgroundColor: 'var(--maroon-50)',
              borderTop: '1px solid var(--maroon-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <h5 style={{ fontSize: '0.98rem', color: 'var(--maroon-primary)', marginBottom: '0.2rem' }}>
                Full Multilingual Voice & Vision Integration Ready
              </h5>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Next-gen modules will connect directly to local speech synthesis and responsive 3D animations.
              </p>
            </div>
            <button
              onClick={() => openSignUp('student')}
              className="btn btn-primary btn-sm"
            >
              <span>Try Student Experience</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 820px) {
          .avatar-stage-grid {
            grid-template-columns: 280px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
