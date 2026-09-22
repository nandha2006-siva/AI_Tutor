import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { STUDENT_DATA, SUPPORTED_LANGUAGES } from '../../data/mockData';
import { 
  Calendar, Clock, BookOpen, AlertCircle, CheckCircle2, Bot, 
  ArrowRight, Sparkles, Volume2, RotateCcw, Brain, Target, 
  FileCheck, Flame, Upload, BarChart3, Award, ChevronRight, User,
  Plus, Check, HelpCircle, Eye, EyeOff, FileText, Send, Sparkle
} from 'lucide-react';

/* -----------------------------------------------------------
   1. STUDENT MAIN DASHBOARD VIEW
   ----------------------------------------------------------- */
export function StudentDashboardView({ onNavigate }) {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('nexora_student_tasks');
    return saved ? JSON.parse(saved) : STUDENT_DATA.todayStudyPlan;
  });

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeStep, setAnalyzeStep] = useState(0);

  const toggleTask = (taskId) => {
    const updated = tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
    setTasks(updated);
    localStorage.setItem('nexora_student_tasks', JSON.stringify(updated));
  };

  const handleSimulateUpload = () => {
    setIsAnalyzing(true);
    setAnalyzeStep(1);

    setTimeout(() => setAnalyzeStep(2), 900);
    setTimeout(() => setAnalyzeStep(3), 1800);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsUploadModalOpen(false);
      // Add newly generated smart study tasks
      const newTask = {
        id: `sp_${Date.now()}`,
        subject: 'Physics',
        topic: 'Optics: Wavefronts & Huygens Principle (AI Recommended)',
        duration: '35 mins',
        timeSlot: '08:00 PM - 08:35 PM',
        priority: 'High Yield',
        completed: false,
        difficulty: 'Medium'
      };
      const updated = [newTask, ...tasks];
      setTasks(updated);
      localStorage.setItem('nexora_student_tasks', JSON.stringify(updated));
    }, 2700);
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Welcome Banner */}
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
          gap: '1.5rem',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '620px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-maroon">AI Academic Blueprint Active</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Updated live with timetable</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
            Welcome back, {currentUser?.name?.split(' ')[0] || 'Aarav'}! 🌟
          </h1>
          <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Nexora AI synchronized your school timetable with your upcoming Physics Pre-Board.
            You have <strong>{tasks.length} focused tasks</strong> with high-yield revision recommended.
          </p>
        </div>

        {/* Quick Streak & Readiness Pill + Upload CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <div
            style={{
              backgroundColor: 'var(--bg-page)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.75rem 1rem',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', color: 'var(--accent-gold-dark)', fontWeight: 800, fontSize: '1.2rem' }}>
              <Flame size={18} />
              <span>14 Days</span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Study Streak
            </span>
          </div>

          <div
            style={{
              backgroundColor: 'var(--maroon-50)',
              border: '1px solid var(--maroon-200)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.75rem 1rem',
              textAlign: 'center'
            }}
          >
            <div style={{ color: 'var(--maroon-primary)', fontWeight: 800, fontSize: '1.2rem' }}>
              84%
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--maroon-primary)', textTransform: 'uppercase', fontWeight: 700 }}>
              Exam Readiness
            </span>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="btn btn-primary btn-sm"
            style={{ padding: '0.65rem 1rem' }}
          >
            <Upload size={14} />
            <span>Sync Timetable</span>
          </button>
        </div>
      </div>

      {/* Grid: Study Plan vs Upcoming Exams & Quick AI Companion */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2rem'
        }}
      >
        {/* Left: Today's AI Personalized Study Plan */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>Today's AI Study Plan</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {completedCount} of {tasks.length} goals completed today
              </p>
            </div>
            <button
              onClick={() => onNavigate('study_plan')}
              style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--maroon-primary)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
            >
              <span>View Full</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Progress Bar */}
          <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--bg-subtle)', borderRadius: '3px', marginBottom: '1.25rem', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${tasks.length ? (completedCount / tasks.length) * 100 : 0}%`,
                backgroundColor: 'var(--maroon-primary)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  padding: '0.9rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: task.completed ? 'var(--bg-subtle)' : 'var(--bg-page)',
                  border: `1.5px solid ${task.completed ? 'transparent' : 'var(--border-subtle)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ marginTop: '2px' }}>
                  {task.completed ? (
                    <CheckCircle2 size={20} style={{ color: 'var(--status-success)' }} />
                  ) : (
                    <div style={{ width: '20px', height: '20px', borderRadius: '6px', border: '2px solid var(--border-medium)' }} />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--maroon-primary)', textTransform: 'uppercase' }}>
                      {task.subject}
                    </span>
                    <span className="badge badge-neutral" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                      {task.timeSlot}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                      textDecoration: task.completed ? 'line-through' : 'none'
                    }}
                  >
                    {task.topic}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: task.priority === 'High Yield' ? 'var(--maroon-50)' : 'var(--accent-gold-light)',
                    color: task.priority === 'High Yield' ? 'var(--maroon-primary)' : 'var(--accent-gold-dark)'
                  }}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Upcoming Exams & Quick AI Companion Launch */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* AI Tutor Quick Access Card */}
          <div
            style={{
              backgroundColor: 'var(--maroon-50)',
              border: '1.5px solid var(--maroon-200)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
                Interactive Study Companion
              </span>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--maroon-primary)', marginBottom: '0.25rem' }}>
                Launch Nexora AI Tutor
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Get voice & visual concept explanations in English, Tamil, Hindi & more.
              </p>
            </div>
            <button
              id="dash-launch-ai-tutor-btn"
              onClick={() => onNavigate('ai_tutor')}
              className="btn btn-primary btn-sm"
              style={{ flexShrink: 0 }}
            >
              <Bot size={16} />
              <span>Talk to Tutor</span>
            </button>
          </div>

          {/* Upcoming Exams Card */}
          <div className="card" style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem' }}>Upcoming Exams</h3>
              <button
                onClick={() => onNavigate('exams')}
                style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--maroon-primary)' }}
              >
                Calendar
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {STUDENT_DATA.upcomingExams.map((exam, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-page)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                      {exam.subject}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Date: {exam.date} • {exam.syllabusCovered}% Syllabus Covered
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--maroon-primary)' }}>
                      {exam.daysLeft}d
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Remaining
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus Progress & Weak Topic Highlights */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>Syllabus & Weak-Topic Diagnostics</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              AI detected topics requiring reinforcement before pre-boards
            </p>
          </div>
          <button
            onClick={() => onNavigate('syllabus')}
            style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--maroon-primary)' }}
          >
            Manage Syllabus
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {STUDENT_DATA.syllabusOverview.map((sub, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--bg-page)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{sub.subject}</span>
                <span style={{ fontWeight: 800, color: 'var(--maroon-primary)', fontSize: '0.92rem' }}>{sub.percent}%</span>
              </div>
              <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--border-subtle)', borderRadius: '3px', marginBottom: '0.75rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${sub.percent}%`, backgroundColor: 'var(--maroon-primary)' }} />
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                {sub.completedChapters} of {sub.totalChapters} chapters completed
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold-dark)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>Focus: {sub.weakTopic}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Timetable / Syllabus Sync Modal */}
      {isUploadModalOpen && (
        <div className="modal-backdrop" onClick={() => !isAnalyzing && setIsUploadModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>Sync Timetable & Syllabus</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Upload your school study timetable or syllabus PDF. Nexora AI will parse exam dates and synthesize an adaptive daily study schedule.
            </p>

            {isAnalyzing ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '4px solid var(--maroon-50)',
                    borderTopColor: 'var(--maroon-primary)',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1.5rem auto'
                  }}
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--maroon-primary)', marginBottom: '0.5rem' }}>
                  {analyzeStep === 1 && 'Parsing syllabus chapters & weightages...'}
                  {analyzeStep === 2 && 'Cross-referencing CBSE exam countdown...'}
                  {analyzeStep === 3 && 'Generating adaptive study blueprint...'}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>AI Model: Nexora Academic Core v2</p>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    border: '2px dashed var(--border-medium)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.5rem 1.5rem',
                    textAlign: 'center',
                    backgroundColor: 'var(--bg-page)',
                    cursor: 'pointer',
                    marginBottom: '1.5rem'
                  }}
                  onClick={handleSimulateUpload}
                >
                  <Upload size={36} style={{ color: 'var(--maroon-primary)', margin: '0 auto 0.75rem auto' }} />
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                    Click to select Timetable / Syllabus PDF or Image
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Supports PNG, JPG, PDF (CBSE, ICSE, State Board)
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button onClick={() => setIsUploadModalOpen(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button onClick={handleSimulateUpload} className="btn btn-primary">
                    <span>Analyze with AI</span>
                    <Sparkles size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* -----------------------------------------------------------
   2. STUDENT AI TUTOR AVATAR VIEW (Interactive Companion with Real Web Speech)
   ----------------------------------------------------------- */
export function StudentAITutorView() {
  const { currentLanguage, setCurrentLanguage } = useAuth();
  const [selectedLang, setSelectedLang] = useState(currentLanguage || 'en');
  const [avatarState, setAvatarState] = useState('explaining');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [studentInput, setStudentInput] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      sender: 'tutor',
      text: STUDENT_DATA.aiTutorConcepts[selectedLang]?.avatarGreeting || STUDENT_DATA.aiTutorConcepts.en.avatarGreeting
    }
  ]);

  const tutorContent = STUDENT_DATA.aiTutorConcepts[selectedLang] || STUDENT_DATA.aiTutorConcepts.en;

  // Real Speech Synthesis utilizing browser Web Speech API
  const speakText = (textToSpeak) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      // Match voice language if available
      const langMap = { en: 'en-US', ta: 'ta-IN', hi: 'hi-IN', te: 'te-IN', kn: 'kn-IN', ml: 'ml-IN' };
      utterance.lang = langMap[selectedLang] || 'en-US';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3200);
    }
  };

  const handleLanguageChange = (code) => {
    setSelectedLang(code);
    setCurrentLanguage(code);
    const newContent = STUDENT_DATA.aiTutorConcepts[code] || STUDENT_DATA.aiTutorConcepts.en;
    setChatLog([
      ...chatLog,
      { sender: 'tutor', text: newContent.avatarGreeting }
    ]);
  };

  const handlePronounce = () => {
    speakText(tutorContent.avatarGreeting + " " + tutorContent.explanationSnippet);
  };

  const handleSendPrompt = (e) => {
    e.preventDefault();
    if (!studentInput.trim()) return;

    const userMsg = studentInput;
    setStudentInput('');
    setChatLog(prev => [...prev, { sender: 'student', text: userMsg }]);

    setAvatarState('explaining');
    setIsSpeaking(true);

    const reply = selectedLang === 'ta'
      ? `நான் உங்கள் கேள்வியைப் புரிந்து கொண்டேன்: "${userMsg}". இது ஃபாரடேயின் விதியுடன் நேரடியாக தொடர்புடையது. வாருங்கள், இதற்கான கணக்கீட்டை எளிமையாக செய்வோம்!`
      : selectedLang === 'hi'
      ? `मैंने आपका प्रश्न समझा: "${userMsg}"। यह सीधे फैराडे के नियम और ऊर्जा संरक्षण से संबंधित है। आइए इसे मिलकर हल करें!`
      : `I understand your question about "${userMsg}". In your syllabus, this directly connects to Lenz's law and magnetic flux conservation. Let's master this concept together!`;

    setTimeout(() => {
      setChatLog(prev => [
        ...prev,
        { sender: 'tutor', text: reply }
      ]);
      speakText(reply);
    }, 900);
  };

  const handleQuizSelect = (idx) => {
    setQuizAnswer(idx);
    if (idx === tutorContent.correctIndex) {
      setAvatarState('encouraging');
      speakText("Brilliant! That is absolutely correct. The induced current doubles!");
    } else {
      setAvatarState('explaining');
      speakText("Close try! Remember that induced current is proportional to the rate of magnetic flux change.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title & Language Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-maroon" style={{ marginBottom: '0.35rem' }}>
            Interactive Avatar Mode
          </span>
          <h2 style={{ fontSize: '1.7rem' }}>Nexora Virtual AI Tutor</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Speak, listen, and learn with an interactive visual study companion.
          </p>
        </div>

        {/* Regional Language Switcher Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: '#FFFFFF', padding: '0.35rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', flexWrap: 'wrap' }}>
          {SUPPORTED_LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => handleLanguageChange(l.code)}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: selectedLang === l.code ? 700 : 500,
                backgroundColor: selectedLang === l.code ? 'var(--maroon-primary)' : 'transparent',
                color: selectedLang === l.code ? '#FFFFFF' : 'var(--text-secondary)'
              }}
            >
              {l.native}
            </button>
          ))}
        </div>
      </div>

      {/* Main Avatar Stage & Chat Console */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem'
        }}
        className="tutor-grid"
      >
        {/* Left: Talking Companion Character */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'var(--bg-page)',
            position: 'relative'
          }}
        >
          {/* Animated Avatar */}
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '4px solid var(--maroon-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(107, 23, 40, 0.15)',
              animation: isSpeaking ? 'pulseGlow 1.5s infinite' : 'none',
              marginBottom: '1rem',
              position: 'relative'
            }}
          >
            <svg width="96" height="96" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="44" fill="#FAF7F2" stroke="#6B1728" strokeWidth="3" />
              <path d="M50 14L18 28L50 42L82 28L50 14Z" fill="#6B1728" />
              <path d="M74 32V50" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
              <circle cx="74" cy="52" r="3" fill="#D97706" />

              {avatarState === 'encouraging' ? (
                <>
                  <path d="M34 48C34 44 42 44 42 48" stroke="#1F242D" strokeWidth="4" strokeLinecap="round" />
                  <path d="M58 48C58 44 66 44 66 48" stroke="#1F242D" strokeWidth="4" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <circle cx="38" cy="48" r="5" fill="#1F242D" />
                  <circle cx="62" cy="48" r="5" fill="#1F242D" />
                  <circle cx="40" cy="46" r="1.5" fill="#FFFFFF" />
                  <circle cx="64" cy="46" r="1.5" fill="#FFFFFF" />
                </>
              )}

              <circle cx="28" cy="56" r="4" fill="#F6E4E7" />
              <circle cx="72" cy="56" r="4" fill="#F6E4E7" />

              {isSpeaking ? (
                <ellipse cx="50" cy="66" rx="9" ry="6" fill="#821D32" />
              ) : (
                <path d="M42 66C46 70 54 70 58 66" stroke="#821D32" strokeWidth="3" strokeLinecap="round" />
              )}
            </svg>

            <div
              style={{
                position: 'absolute',
                bottom: '-6px',
                backgroundColor: isSpeaking ? '#15803D' : 'var(--maroon-primary)',
                color: '#FFF',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '0.15rem 0.6rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              {isSpeaking ? 'SPEAKING' : avatarState.toUpperCase()}
            </div>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Nexora Tutor</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Multilingual AI Concept Coach
          </p>

          <button
            onClick={handlePronounce}
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'center', marginBottom: '0.5rem' }}
          >
            <Volume2 size={16} />
            <span>{isSpeaking ? 'Speaking Out Loud...' : 'Pronounce & Speak'}</span>
          </button>
        </div>

        {/* Right: Live Interactive Academic Dialog & Quiz */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Chat Console */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '360px' }}>
            {/* Messages Scroll Area */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingRight: '0.5rem' }}>
              {chatLog.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    alignSelf: msg.sender === 'student' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%'
                  }}
                >
                  {msg.sender === 'tutor' && (
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--maroon-50)', color: 'var(--maroon-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bot size={16} />
                    </div>
                  )}
                  <div
                    style={{
                      backgroundColor: msg.sender === 'student' ? 'var(--maroon-primary)' : 'var(--bg-page)',
                      color: msg.sender === 'student' ? '#FFFFFF' : 'var(--text-primary)',
                      padding: '0.85rem 1.15rem',
                      borderRadius: 'var(--radius-md)',
                      border: msg.sender === 'student' ? 'none' : '1px solid var(--border-medium)',
                      fontSize: '0.92rem',
                      lineHeight: 1.5
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Concept Prompts */}
            <div style={{ display: 'flex', gap: '0.4rem', margin: '0.75rem 0', flexWrap: 'wrap' }}>
              {['Explain Faraday’s Law', 'Derive Mutual Inductance', 'Give me a practice numerical'].map((p, i) => (
                <button
                  key={i}
                  onClick={() => setStudentInput(p)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-page)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  + {p}
                </button>
              ))}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendPrompt} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="input-field"
                placeholder={`Ask Nexora in ${SUPPORTED_LANGUAGES.find(l => l.code === selectedLang)?.name || 'English'}...`}
                value={studentInput}
                onChange={(e) => setStudentInput(e.target.value)}
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.25rem' }}>
                <span>Ask</span>
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Interactive Micro Quiz */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-gold-dark)' }}>
                ⚡ INTERACTIVE CONCEPT QUIZ ({SUPPORTED_LANGUAGES.find(l => l.code === selectedLang)?.name})
              </span>
              {quizAnswer !== null && (
                <button
                  onClick={() => setQuizAnswer(null)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}
                >
                  <RotateCcw size={12} />
                  <span>Try Again</span>
                </button>
              )}
            </div>

            <p style={{ fontSize: '0.92rem', fontWeight: 600, marginBottom: '0.85rem' }}>
              {tutorContent.quizQuestion}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
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
                    onClick={() => handleQuizSelect(optIdx)}
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
                      ...btnStyle
                    }}
                  >
                    <span>{opt}</span>
                    {quizAnswer !== null && isCorrect && <CheckCircle2 size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .tutor-grid {
            grid-template-columns: 280px 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

/* -----------------------------------------------------------
   3. STUDENT STUDY PLAN VIEW
   ----------------------------------------------------------- */
export function StudentStudyPlanView() {
  const [selectedDay, setSelectedDay] = useState('Mon (Physics)');
  const [tasks, setTasks] = useState(STUDENT_DATA.todayStudyPlan);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '960px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem' }}>My Adaptive Study Plan</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            AI-scheduled daily routines aligned with school syllabus pacing and exam countdowns.
          </p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Weekly Study Distribution</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.75rem', textAlign: 'center' }}>
          {['Mon (Physics)', 'Tue (Maths)', 'Wed (Chem)', 'Thu (Physics)', 'Fri (CS)', 'Sat (Revision)', 'Sun (Mock Test)'].map((day) => (
            <div
              key={day}
              onClick={() => setSelectedDay(day)}
              style={{
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: selectedDay === day ? 'var(--maroon-50)' : 'var(--bg-page)',
                border: `1.5px solid ${selectedDay === day ? 'var(--maroon-primary)' : 'var(--border-subtle)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: selectedDay === day ? 'var(--maroon-primary)' : 'var(--text-primary)' }}>
                {day.split(' ')[0]}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {day.split(' ')[1]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Scheduled Tasks for {selectedDay}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {tasks.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-subtle)' }}>
              <div>
                <span className="badge badge-maroon" style={{ marginBottom: '0.25rem' }}>{item.subject}</span>
                <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{item.topic}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Duration: {item.duration} • Scheduled: {item.timeSlot}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-neutral">{item.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   4. STUDENT SYLLABUS VIEW
   ----------------------------------------------------------- */
export function StudentSyllabusView() {
  const [activeSubject, setActiveSubject] = useState('Physics');

  const chapters = [
    { title: 'Electrostatics', status: 'Mastered', progress: 100, weight: '8 Marks' },
    { title: 'Current Electricity', status: 'Mastered', progress: 100, weight: '7 Marks' },
    { title: 'Magnetic Effects of Current', status: 'Mastered', progress: 100, weight: '8 Marks' },
    { title: 'Electromagnetic Induction', status: 'In Progress', progress: 75, weight: '8 Marks' },
    { title: 'Alternating Current', status: 'Needs Review', progress: 50, weight: '6 Marks' },
    { title: 'Wave Optics', status: 'Needs Review', progress: 40, weight: '9 Marks' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '960px' }}>
      <div>
        <h2 style={{ fontSize: '1.6rem' }}>Curriculum & Syllabus Coverage</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Detailed chapter tracker synchronized with CBSE Class 12 blueprints.
        </p>
      </div>

      {/* Subject Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {['Physics', 'Mathematics', 'Chemistry', 'Computer Science'].map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveSubject(sub)}
            className={`btn btn-sm ${activeSubject === sub ? 'btn-primary' : 'btn-secondary'}`}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{activeSubject} Chapters & Milestones</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {chapters.map((ch, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1.15rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{ch.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Board Weightage: {ch.weight}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className={`badge ${ch.status === 'Mastered' ? 'badge-success' : ch.status === 'In Progress' ? 'badge-maroon' : 'badge-gold'}`}>
                  {ch.status}
                </span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--maroon-primary)' }}>{ch.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   5. STUDENT EXAMS VIEW
   ----------------------------------------------------------- */
export function StudentExamsView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '960px' }}>
      <div>
        <h2 style={{ fontSize: '1.6rem' }}>Upcoming Exams & Milestones</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Countdown and readiness trackers for school terms and board assessments.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {STUDENT_DATA.upcomingExams.map((exam, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>{exam.status}</span>
              <h3 style={{ fontSize: '1.25rem' }}>{exam.subject}</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Exam Date: {exam.date} • Syllabus Mastery: {exam.syllabusCovered}%</p>
            </div>
            <div style={{ textAlign: 'center', backgroundColor: 'var(--maroon-50)', padding: '0.85rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--maroon-primary)' }}>{exam.daysLeft} Days</div>
              <span style={{ fontSize: '0.75rem', color: 'var(--maroon-primary)', fontWeight: 600 }}>REMAINING</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   6. STUDENT IMPORTANT QUESTIONS VIEW (with Model Answers & Hints)
   ----------------------------------------------------------- */
export function StudentImportantQuestionsView() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '960px' }}>
      <div>
        <h2 style={{ fontSize: '1.6rem' }}>High-Yield Exam Questions</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          AI predicted topics from the last 10 years of board examination analysis.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {STUDENT_DATA.importantQuestions.map((q) => {
          const isExpanded = expandedId === q.id;
          return (
            <div key={q.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="badge badge-maroon">{q.subject}</span>
                  <span className="badge badge-neutral">{q.chapter}</span>
                </div>
                <span className="badge badge-gold">{q.weightage}</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', margin: '0.75rem 0', lineHeight: 1.5 }}>
                {q.question}
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--status-success)', fontWeight: 600 }}>
                  📈 {q.repetitionScore}
                </div>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  {isExpanded ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{isExpanded ? 'Hide Model Answer' : 'View Model Answer & Key Steps'}</span>
                </button>
              </div>

              {isExpanded && (
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-page)',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.88rem',
                    lineHeight: 1.6
                  }}
                >
                  <strong style={{ color: 'var(--maroon-primary)' }}>Key Examination Points:</strong>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
                    <li>State Lenz's law clearly: Induced EMF polarity opposes the change in magnetic flux.</li>
                    <li>Derive Mutual Inductance: M = μ₀ * n₁ * n₂ * π * r₁² * l.</li>
                    <li>State conservation basis: Lenz's law is a consequence of the Law of Conservation of Energy.</li>
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   7. STUDENT PROGRESS & PROFILE VIEWS
   ----------------------------------------------------------- */
export function StudentProgressView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '960px' }}>
      <div>
        <h2 style={{ fontSize: '1.6rem' }}>Learning Analytics & Trajectory</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Real-time retention rates and study streak metrics.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="card text-center">
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--maroon-primary)' }}>14 Days</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Current Study Streak</div>
        </div>
        <div className="card text-center">
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold-dark)' }}>38 Hours</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Focused Study Time (Month)</div>
        </div>
        <div className="card text-center">
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--status-success)' }}>84%</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Diagnostic Accuracy</div>
        </div>
      </div>
    </div>
  );
}

export function StudentProfileView() {
  const { currentUser } = useAuth();
  return (
    <div className="card" style={{ maxWidth: '640px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Student Profile</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
        <div><strong>Name:</strong> {currentUser?.name}</div>
        <div><strong>Email:</strong> {currentUser?.email}</div>
        <div><strong>Grade:</strong> {currentUser?.grade || 'Class 12'}</div>
        <div><strong>Curriculum:</strong> {currentUser?.curriculum || 'CBSE'}</div>
        <div><strong>Institution:</strong> {currentUser?.institution || 'Delhi Public School'}</div>
        <div><strong>Role:</strong> Student (Autonomous Learner)</div>
      </div>
    </div>
  );
}
