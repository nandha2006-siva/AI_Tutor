import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SUPPORTED_LANGUAGES, DEMO_USERS } from '../../data/mockData';
import { 
  X, Eye, EyeOff, GraduationCap, School, Users, ArrowLeft, 
  ArrowRight, Check, AlertCircle, Sparkles, Lock, Mail, User, Phone, BookOpen
} from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    signupStep,
    setSignupStep,
    selectedSignupRole,
    setSelectedSignupRole,
    login,
    signup,
    loginWithDemo
  } = useAuth();

  // Form States
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState(false);

  // Sign In Inputs
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  // Sign Up Inputs (Common & Role-specific)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    // Student fields
    grade: 'Class 12',
    curriculum: 'CBSE',
    language: 'en',
    // Teacher fields
    institution: '',
    department: '',
    designation: '',
    // Parent fields
    phoneNumber: '',
    childStudentCode: ''
  });

  const [formErrors, setFormErrors] = useState({});

  if (!isAuthModalOpen) return null;

  // Sign In Handler
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setSignInError('');

    if (!signInEmail.trim()) {
      setSignInError('Please enter your email or username');
      return;
    }
    if (!signInPassword) {
      setSignInError('Please enter your password');
      return;
    }

    login(signInEmail, signInPassword);
  };

  // Sign Up Validation & Submit
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.password || formData.password.length < 6) errors.password = 'Password must be at least 6 characters';

    if (selectedSignupRole === 'teacher') {
      if (!formData.institution.trim()) errors.institution = 'Institution name is required';
      if (!formData.department.trim()) errors.department = 'Subject/Department is required';
    } else if (selectedSignupRole === 'parent') {
      if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Contact phone number is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    signup(selectedSignupRole, formData);
  };

  return (
    <div className="modal-backdrop" onClick={closeAuthModal}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: authModalMode === 'signup' && signupStep === 'select_role' ? '600px' : '480px' }}
      >
        {/* Close Button */}
        <button 
          onClick={closeAuthModal} 
          className="modal-close-btn"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* ----------------------------------------------------
            MODE: SIGN IN
           ---------------------------------------------------- */}
        {authModalMode === 'signin' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--maroon-50)',
                  color: 'var(--maroon-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem auto'
                }}
              >
                <Lock size={22} />
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>Welcome to NEXORA AI</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Sign in to access your intelligent academic workspace
              </p>
            </div>

            {/* Quick Demo Login Shortcuts */}
            <div
              style={{
                backgroundColor: 'var(--bg-page)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--maroon-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  ⚡ Quick Demo Portals
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>1-Click Instant Login</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                <button
                  type="button"
                  onClick={() => loginWithDemo('student')}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.78rem', padding: '0.4rem 0.2rem', justifyContent: 'center' }}
                >
                  🎓 Student
                </button>
                <button
                  type="button"
                  onClick={() => loginWithDemo('teacher')}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.78rem', padding: '0.4rem 0.2rem', justifyContent: 'center' }}
                >
                  🏫 Teacher
                </button>
                <button
                  type="button"
                  onClick={() => loginWithDemo('parent')}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.78rem', padding: '0.4rem 0.2rem', justifyContent: 'center' }}
                >
                  👨‍👩‍👧 Parent
                </button>
              </div>
            </div>

            {/* Standard Sign In Form */}
            <form onSubmit={handleSignInSubmit}>
              {signInError && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'var(--status-error-bg)',
                    color: 'var(--status-error)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    marginBottom: '1rem'
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{signInError}</span>
                </div>
              )}

              {/* Email / Username */}
              <div className="form-group">
                <label className="form-label" htmlFor="signin-email">
                  Email or Username
                </label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input
                    id="signin-email"
                    type="text"
                    className="input-field"
                    placeholder="e.g. aarav@nexora.ai"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <div className="form-label">
                  <label htmlFor="signin-password">Password</label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordMessage(!forgotPasswordMessage)}
                    style={{ fontSize: '0.78rem', color: 'var(--maroon-primary)', fontWeight: 600 }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input
                    id="signin-password"
                    type={showPassword ? 'text' : 'password'}
                    className="input-field"
                    placeholder="Enter your password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="input-action-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {forgotPasswordMessage && (
                <div
                  style={{
                    backgroundColor: 'var(--maroon-50)',
                    color: 'var(--maroon-primary)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    marginBottom: '1rem'
                  }}
                >
                  ℹ️ For testing, click any of the 1-Click Demo Portals above or enter any email to begin!
                </div>
              )}

              {/* Remember Me */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  fontSize: '0.88rem'
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--maroon-primary)' }}
                  />
                  <span style={{ color: 'var(--text-secondary)' }}>Remember me</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                id="modal-submit-signin-btn"
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700 }}
              >
                Sign In to Nexora AI
              </button>
            </form>

            {/* Switch to Sign Up */}
            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('signup');
                  setSignupStep('select_role');
                }}
                style={{ color: 'var(--maroon-primary)', fontWeight: 700 }}
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            MODE: SIGN UP - STEP 1: ROLE SELECTION
           ---------------------------------------------------- */}
        {authModalMode === 'signup' && signupStep === 'select_role' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <span className="badge badge-maroon" style={{ marginBottom: '0.5rem' }}>
                Step 1 of 2
              </span>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>Join NEXORA AI</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Please select your primary role to customize your experience
              </p>
            </div>

            {/* 3 Role Selection Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
              {/* STUDENT */}
              <div
                onClick={() => setSelectedSignupRole('student')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.1rem 1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${selectedSignupRole === 'student' ? 'var(--maroon-primary)' : 'var(--border-subtle)'}`,
                  backgroundColor: selectedSignupRole === 'student' ? 'var(--maroon-50)' : 'var(--bg-page)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--maroon-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <GraduationCap size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    STUDENT
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Timetable analysis, syllabus blueprints, and AI tutor companion
                  </div>
                </div>
                {selectedSignupRole === 'student' && (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--maroon-primary)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={14} />
                  </div>
                )}
              </div>

              {/* TEACHER */}
              <div
                onClick={() => setSelectedSignupRole('teacher')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.1rem 1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${selectedSignupRole === 'teacher' ? 'var(--maroon-primary)' : 'var(--border-subtle)'}`,
                  backgroundColor: selectedSignupRole === 'teacher' ? 'var(--maroon-50)' : 'var(--bg-page)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--maroon-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <School size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    TEACHER
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Class syllabus management, automated quiz builder & weak-topic insights
                  </div>
                </div>
                {selectedSignupRole === 'teacher' && (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--maroon-primary)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={14} />
                  </div>
                )}
              </div>

              {/* PARENT */}
              <div
                onClick={() => setSelectedSignupRole('parent')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.1rem 1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${selectedSignupRole === 'parent' ? 'var(--maroon-primary)' : 'var(--border-subtle)'}`,
                  backgroundColor: selectedSignupRole === 'parent' ? 'var(--maroon-50)' : 'var(--bg-page)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--maroon-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <Users size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    PARENT
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Track child’s study plan progress, attendance, and exam schedule
                  </div>
                </div>
                {selectedSignupRole === 'parent' && (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--maroon-primary)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={14} />
                  </div>
                )}
              </div>
            </div>

            {/* Next Button */}
            <button
              id="signup-role-next-btn"
              type="button"
              onClick={() => setSignupStep('form')}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700 }}
            >
              <span>Continue as {selectedSignupRole.toUpperCase()}</span>
              <ArrowRight size={18} />
            </button>

            {/* Back to Sign In */}
            <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.88rem' }}>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('signin')}
                style={{ color: 'var(--maroon-primary)', fontWeight: 700 }}
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            MODE: SIGN UP - STEP 2: ROLE-APPROPRIATE REGISTRATION FORM
           ---------------------------------------------------- */}
        {authModalMode === 'signup' && signupStep === 'form' && (
          <div>
            {/* Header with Back Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <button
                type="button"
                onClick={() => setSignupStep('select_role')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}
              >
                <ArrowLeft size={16} />
                <span>Change Role</span>
              </button>
              <div style={{ marginLeft: 'auto' }}>
                <span className="badge badge-maroon">
                  {selectedSignupRole.toUpperCase()} REGISTRATION
                </span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>
              Create Your {selectedSignupRole.charAt(0).toUpperCase() + selectedSignupRole.slice(1)} Account
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {selectedSignupRole === 'student' && 'Set up your academic profile and preferred language.'}
              {selectedSignupRole === 'teacher' && 'Enter your institutional affiliation and teaching domain.'}
              {selectedSignupRole === 'parent' && 'Create your account to connect and support your student.'}
            </p>

            <form onSubmit={handleSignUpSubmit}>
              {/* Common: Full Name */}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                {formErrors.fullName && <span style={{ fontSize: '0.75rem', color: 'var(--status-error)' }}>{formErrors.fullName}</span>}
              </div>

              {/* Common: Email */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input
                    type="email"
                    className="input-field"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                {formErrors.email && <span style={{ fontSize: '0.75rem', color: 'var(--status-error)' }}>{formErrors.email}</span>}
              </div>

              {/* Common: Password */}
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input-field"
                    placeholder="Create a strong password (6+ chars)"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="input-action-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {formErrors.password && <span style={{ fontSize: '0.75rem', color: 'var(--status-error)' }}>{formErrors.password}</span>}
              </div>

              {/* ROLE SPECIFIC: STUDENT */}
              {selectedSignupRole === 'student' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="form-group">
                      <label className="form-label">Grade / Standard</label>
                      <select
                        className="input-field"
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      >
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10 (Secondary)</option>
                        <option value="Class 11">Class 11 (Higher Sec)</option>
                        <option value="Class 12">Class 12 (Board Prep)</option>
                        <option value="Undergrad">University / College</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Curriculum / Board</label>
                      <select
                        className="input-field"
                        value={formData.curriculum}
                        onChange={(e) => setFormData({ ...formData, curriculum: e.target.value })}
                      >
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE / ISC">ICSE / ISC</option>
                        <option value="State Board">State Board</option>
                        <option value="IB / Cambridge">IB / Cambridge</option>
                      </select>
                    </div>
                  </div>

                  {/* Multilingual Learning Preference */}
                  <div className="form-group">
                    <label className="form-label">Preferred Learning Language (AI Tutor)</label>
                    <select
                      className="input-field"
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    >
                      {SUPPORTED_LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code}>
                          {l.native} ({l.name})
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* ROLE SPECIFIC: TEACHER */}
              {selectedSignupRole === 'teacher' && (
                <>
                  <div className="form-group">
                    <label className="form-label">School / Institution Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. Kendriya Vidyalaya / Delhi Public School"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    />
                    {formErrors.institution && <span style={{ fontSize: '0.75rem', color: 'var(--status-error)' }}>{formErrors.institution}</span>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="form-group">
                      <label className="form-label">Primary Subject</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="e.g. Physics / Mathematics"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      />
                      {formErrors.department && <span style={{ fontSize: '0.75rem', color: 'var(--status-error)' }}>{formErrors.department}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Designation</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="e.g. Senior PGT Teacher"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ROLE SPECIFIC: PARENT */}
              {selectedSignupRole === 'parent' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Contact Phone Number</label>
                    <div className="input-with-icon">
                      <Phone size={16} className="input-icon" />
                      <input
                        type="tel"
                        className="input-field"
                        placeholder="+91 98765 43210"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      />
                    </div>
                    {formErrors.phoneNumber && <span style={{ fontSize: '0.75rem', color: 'var(--status-error)' }}>{formErrors.phoneNumber}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span>Child's Student Code / Name</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>(Optional - can link later)</span>
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. NEX-STD-4402 or Aarav Sharma"
                      value={formData.childStudentCode}
                      onChange={(e) => setFormData({ ...formData, childStudentCode: e.target.value })}
                    />
                  </div>
                </>
              )}

              {/* Submit */}
              <button
                id="signup-form-submit-btn"
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700, marginTop: '0.5rem' }}
              >
                Complete Registration & Launch Portal
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
