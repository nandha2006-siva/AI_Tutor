import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TEACHER_DATA } from '../../data/mockData';
import { 
  Users, School, BookOpen, FolderUp, FileText, BarChart3, 
  Plus, AlertTriangle, Download, Sparkles, CheckCircle2, ChevronRight, User,
  X, Check, Send, Sparkle
} from 'lucide-react';

/* -----------------------------------------------------------
   1. TEACHER MAIN DASHBOARD VIEW
   ----------------------------------------------------------- */
export function TeacherDashboardView({ onNavigate }) {
  const { currentUser } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Banner */}
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
            Senior Academic Oversight
          </span>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>
            Welcome, {currentUser?.name || 'Dr. Meenakshi Sundaram'} 👩‍🏫
          </h1>
          <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)' }}>
            {currentUser?.designation || 'Senior PGT Physics'} • {currentUser?.institution || 'Kendriya Vidyalaya'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-lg)', padding: '0.85rem 1.25rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--maroon-primary)', fontWeight: 800, fontSize: '1.25rem' }}>4 Batches</div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Active Classes</span>
          </div>
          <div style={{ backgroundColor: 'var(--maroon-50)', border: '1px solid var(--maroon-200)', borderRadius: 'var(--radius-lg)', padding: '0.85rem 1.25rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--maroon-primary)', fontWeight: 800, fontSize: '1.25rem' }}>168</div>
            <span style={{ fontSize: '0.72rem', color: 'var(--maroon-primary)', textTransform: 'uppercase', fontWeight: 700 }}>Total Students</span>
          </div>
        </div>
      </div>

      {/* Class Pacing Cards */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Class Batches & Syllabus Pacing</h3>
          <button onClick={() => onNavigate('classes')} style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--maroon-primary)' }}>
            View All Classes
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {TEACHER_DATA.classes.map((cls) => (
            <div key={cls.id} className="card card-hoverable">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{cls.name}</span>
                <span className="badge badge-maroon">{cls.students} Students</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Avg Score: <strong>{cls.averageScore}</strong> • Pacing: {cls.syllabusCoverage}
              </div>
              <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--bg-subtle)', borderRadius: '3px', marginBottom: '0.75rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: cls.syllabusCoverage, backgroundColor: 'var(--maroon-primary)' }} />
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Next Assessment: <strong>{cls.nextExam}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weak-Topic Diagnostic Heatmap */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>AI Weak-Topic Diagnostic Heatmap</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Identifies syllabus concepts where clusters of students struggle
            </p>
          </div>
          <button
            onClick={() => onNavigate('analytics')}
            style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--maroon-primary)' }}
          >
            Detailed Analytics
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {TEACHER_DATA.weakTopicsSummary.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-page)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <AlertTriangle size={18} style={{ color: 'var(--status-warning)' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>{item.topic}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Class: {item.class}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {item.strugglingStudents} Students Needing Remediation
                </span>
                <span className="badge badge-gold">{item.severity} Priority</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   2. TEACHER STUDENTS & CLASSES VIEWS
   ----------------------------------------------------------- */
export function TeacherStudentsView() {
  const [students] = useState([
    { name: 'Aarav Sharma', class: '12-A', attendance: '96.5%', score: '88%', status: 'Excelling', weakArea: '3D Geometry' },
    { name: 'Kavya Pillai', class: '12-A', attendance: '94.0%', score: '82%', status: 'On Track', weakArea: 'Wave Optics' },
    { name: 'Rohan Verma', class: '12-B', attendance: '86.0%', score: '68%', status: 'Needs Review', weakArea: 'Rotational Dynamics' },
    { name: 'Sneha Patel', class: '11-Mechanics', attendance: '98.0%', score: '91%', status: 'Excelling', weakArea: 'Friction Vectors' }
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '960px' }}>
      <div>
        <h2 style={{ fontSize: '1.6rem' }}>Student Roster & Diagnostic Profiles</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Manage student records, diagnostics, and study plan adherence.
        </p>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-page)', borderBottom: '1px solid var(--border-medium)' }}>
              <th style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--maroon-primary)' }}>Student</th>
              <th style={{ padding: '1rem', fontWeight: 700, color: 'var(--maroon-primary)' }}>Class</th>
              <th style={{ padding: '1rem', fontWeight: 700, color: 'var(--maroon-primary)' }}>Attendance</th>
              <th style={{ padding: '1rem', fontWeight: 700, color: 'var(--maroon-primary)' }}>Readiness</th>
              <th style={{ padding: '1rem', fontWeight: 700, color: 'var(--maroon-primary)' }}>Identified Weak Topic</th>
              <th style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--maroon-primary)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 600 }}>{s.name}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{s.class}</td>
                <td style={{ padding: '1rem' }}>{s.attendance}</td>
                <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--maroon-primary)' }}>{s.score}</td>
                <td style={{ padding: '1rem', color: 'var(--accent-gold-dark)', fontWeight: 500 }}>{s.weakArea}</td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <span className={`badge ${s.status === 'Excelling' ? 'badge-success' : s.status === 'On Track' ? 'badge-neutral' : 'badge-gold'}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TeacherClassesView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '960px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem' }}>Classes & Batches</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Curriculum pacing and batch assignments.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {TEACHER_DATA.classes.map((cls) => (
          <div key={cls.id} className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>{cls.name}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Roster: {cls.students} Enrolled</p>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Class Average: <strong>{cls.averageScore}</strong></div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Syllabus: <strong>{cls.syllabusCoverage}</strong></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   3. TEACHER RESOURCES & AI QUIZ GENERATOR
   ----------------------------------------------------------- */
export function TeacherResourcesView() {
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('nexora_teacher_resources');
    return saved ? JSON.parse(saved) : TEACHER_DATA.recentResources;
  });

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('PDF Notes');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newRes = {
      title,
      type,
      downloads: 0,
      date: 'Just now'
    };
    const updated = [newRes, ...resources];
    setResources(updated);
    localStorage.setItem('nexora_teacher_resources', JSON.stringify(updated));
    setTitle('');
    setIsUploadOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '960px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem' }}>Class Notes & Resource Distribution</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Upload worksheets, study blueprints, and reference guides.</p>
        </div>
        <button onClick={() => setIsUploadOpen(true)} className="btn btn-primary btn-sm">
          <FolderUp size={16} />
          <span>Upload Material</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {resources.map((res, i) => (
          <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem' }}>
            <div>
              <span className="badge badge-maroon" style={{ marginBottom: '0.35rem' }}>{res.type}</span>
              <h4 style={{ fontSize: '1rem' }}>{res.title}</h4>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Uploaded: {res.date} • {res.downloads} student downloads</div>
            </div>
            <button
              onClick={() => alert(`Downloading: ${res.title}`)}
              className="btn btn-secondary btn-sm"
            >
              <Download size={14} />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>

      {isUploadOpen && (
        <div className="modal-backdrop" onClick={() => setIsUploadOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Upload Class Material</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label className="form-label">Material Title</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Wave Optics Formula & Problem Bank 2026"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Material Type</label>
                <select className="input-field" value={type} onChange={e => setType(e.target.value)}>
                  <option value="PDF Notes">PDF Notes</option>
                  <option value="Worksheet">Worksheet</option>
                  <option value="Exam Blueprint">Exam Blueprint</option>
                  <option value="Reference Guide">Reference Guide</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setIsUploadOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Publish to Students</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function TeacherAssignmentsView() {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizSubject, setQuizSubject] = useState('Physics');
  const [quizChapter, setQuizChapter] = useState('Electromagnetic Induction');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);

  const [assessments, setAssessments] = useState([
    { title: 'Electromagnetic Induction Problem Set', due: 'Sep 20', subs: '38/44', status: 'Active' },
    { title: 'Alternating Current Unit Quiz', due: 'Sep 25', subs: '12/42', status: 'Active' }
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedQuiz({
        title: `${quizSubject}: ${quizChapter} AI Assessment`,
        questions: [
          { q: 'State Faraday’s laws of electromagnetic induction. Express induced EMF mathematically.', marks: 3 },
          { q: 'Derive the coefficient of self-inductance for a circular solenoid carrying current I.', marks: 4 },
          { q: 'A metallic rod of length 1m rotates with angular frequency 50 rad/s in 0.2T field. Calculate EMF.', marks: 3 }
        ]
      });
    }, 1500);
  };

  const handleSaveAssessment = () => {
    if (!generatedQuiz) return;
    setAssessments([
      { title: generatedQuiz.title, due: 'Oct 02', subs: '0/44', status: 'Active' },
      ...assessments
    ]);
    setIsQuizModalOpen(false);
    setGeneratedQuiz(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '960px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem' }}>Assignments & AI Quiz Generator</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Generate curriculum-aligned assessments in seconds.</p>
        </div>
        <button onClick={() => setIsQuizModalOpen(true)} className="btn btn-primary btn-sm">
          <Sparkles size={16} />
          <span>Generate New Quiz</span>
        </button>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Active Class Assessments</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {assessments.map((a, i) => (
            <div key={i} style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{a.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Due: {a.due} • {a.subs} Submissions</div>
              </div>
              <span className="badge badge-maroon">{a.status}</span>
            </div>
          ))}
        </div>
      </div>

      {isQuizModalOpen && (
        <div className="modal-backdrop" onClick={() => !isGenerating && setIsQuizModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>AI Curriculum Quiz Creator</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Select syllabus chapter to generate balanced conceptual and numerical questions.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="input-field" value={quizSubject} onChange={e => setQuizSubject(e.target.value)}>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Chapter</label>
                <input
                  type="text"
                  className="input-field"
                  value={quizChapter}
                  onChange={e => setQuizChapter(e.target.value)}
                />
              </div>
            </div>

            {isGenerating ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ fontWeight: 700, color: 'var(--maroon-primary)' }}>Synthesizing balanced test paper...</div>
              </div>
            ) : generatedQuiz ? (
              <div style={{ backgroundColor: 'var(--bg-page)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Generated: {generatedQuiz.title}</div>
                {generatedQuiz.questions.map((q, idx) => (
                  <div key={idx} style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <strong>Q{idx + 1} ({q.marks} Marks):</strong> {q.q}
                  </div>
                ))}
              </div>
            ) : null}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={() => setIsQuizModalOpen(false)} className="btn btn-secondary">Close</button>
              {generatedQuiz ? (
                <button onClick={handleSaveAssessment} className="btn btn-primary">Publish to Class</button>
              ) : (
                <button onClick={handleGenerate} className="btn btn-primary">Generate with AI</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TeacherAnalyticsView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '960px' }}>
      <h2 style={{ fontSize: '1.6rem' }}>Academic Insights & Class Analytics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div className="card text-center">
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--maroon-primary)' }}>80.2%</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Aggregate Class Average</div>
        </div>
        <div className="card text-center">
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold-dark)' }}>3 Concepts</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Requiring Remediation</div>
        </div>
      </div>
    </div>
  );
}

export function TeacherProfileView() {
  const { currentUser } = useAuth();
  return (
    <div className="card" style={{ maxWidth: '640px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Teacher Profile</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
        <div><strong>Name:</strong> {currentUser?.name}</div>
        <div><strong>Email:</strong> {currentUser?.email}</div>
        <div><strong>Institution:</strong> {currentUser?.institution || 'Kendriya Vidyalaya'}</div>
        <div><strong>Designation:</strong> {currentUser?.designation || 'Senior PGT Physics'}</div>
        <div><strong>Role:</strong> Teacher (Academic Co-Pilot)</div>
      </div>
    </div>
  );
}
