import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('nexora_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Current preferred language (Default English)
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('nexora_lang') || 'en';
  });

  // Auth Dialog / Flow Controls
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin'); // 'signin' | 'signup'
  const [signupStep, setSignupStep] = useState('select_role'); // 'select_role' | 'form'
  const [selectedSignupRole, setSelectedSignupRole] = useState('student'); // 'student' | 'teacher' | 'parent'

  // Dashboard Active Navigation Tab
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('nexora_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('nexora_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nexora_lang', currentLanguage);
  }, [currentLanguage]);

  // Reset tab when user or role changes
  useEffect(() => {
    setActiveTab('dashboard');
  }, [currentUser?.role]);

  const openSignIn = () => {
    setAuthModalMode('signin');
    setIsAuthModalOpen(true);
  };

  const openSignUp = (initialRole = null) => {
    setAuthModalMode('signup');
    if (initialRole) {
      setSelectedSignupRole(initialRole);
      setSignupStep('form');
    } else {
      setSignupStep('select_role');
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginWithDemo = (role) => {
    const demoUser = DEMO_USERS[role] || DEMO_USERS.student;
    setCurrentUser(demoUser);
    setIsAuthModalOpen(false);
  };

  const login = (email, password) => {
    // Check if email matches any demo account or create dynamic session
    const matchingRole = Object.keys(DEMO_USERS).find(
      key => DEMO_USERS[key].email.toLowerCase() === email.toLowerCase()
    );

    if (matchingRole) {
      setCurrentUser(DEMO_USERS[matchingRole]);
    } else {
      // Default to student if custom credentials entered
      setCurrentUser({
        id: `usr_${Date.now()}`,
        name: email.split('@')[0] || 'Aarav Sharma',
        email,
        role: 'student',
        avatar: '👨‍🎓',
        grade: 'Class 12 - Science',
        curriculum: 'CBSE Board',
        institution: 'National Model School',
        language: currentLanguage
      });
    }
    setIsAuthModalOpen(false);
  };

  const signup = (role, formData) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: formData.fullName,
      email: formData.email,
      role: role,
      avatar: role === 'student' ? '👨‍🎓' : role === 'teacher' ? '👩‍🏫' : '👨‍👩‍👧',
      language: formData.language || currentLanguage,
      ...formData
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentLanguage,
        setCurrentLanguage,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        signupStep,
        setSignupStep,
        selectedSignupRole,
        setSelectedSignupRole,
        openSignIn,
        openSignUp,
        closeAuthModal,
        loginWithDemo,
        login,
        signup,
        logout,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
