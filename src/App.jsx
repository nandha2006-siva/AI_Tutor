import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/landing/Navbar';
import HeroSection from './components/landing/HeroSection';
import RolesSection from './components/landing/RolesSection';
import AITutorSection from './components/landing/AITutorSection';
import Footer from './components/landing/Footer';
import AuthModal from './components/auth/AuthModal';
import DashboardLayout from './components/dashboard/DashboardLayout';

// Student views
import {
  StudentDashboardView,
  StudentStudyPlanView,
  StudentSyllabusView,
  StudentExamsView,
  StudentImportantQuestionsView,
  StudentAITutorView,
  StudentProgressView,
  StudentProfileView
} from './components/student/StudentViews';

// Teacher views
import {
  TeacherDashboardView,
  TeacherStudentsView,
  TeacherClassesView,
  TeacherResourcesView,
  TeacherAssignmentsView,
  TeacherAnalyticsView,
  TeacherProfileView
} from './components/teacher/TeacherViews';

// Parent views
import {
  ParentDashboardView,
  ParentChildView,
  ParentAttendanceView,
  ParentAlertsView,
  ParentProfileView
} from './components/parent/ParentViews';

import './styles/main.css';

function MainApp() {
  const { currentUser, activeTab, setActiveTab } = useAuth();

  // If user is not signed in, render the Landing Page
  if (!currentUser) {
    return (
      <div className="landing-page-root">
        <Navbar />
        <main>
          <HeroSection />
          <RolesSection />
          <AITutorSection />
        </main>
        <Footer />
        <AuthModal />
      </div>
    );
  }

  // If signed in, render the Role-Based Dashboard Shell
  const renderDashboardContent = () => {
    // 1. STUDENT EXPERIENCE
    if (currentUser.role === 'student') {
      switch (activeTab) {
        case 'study_plan':
          return <StudentStudyPlanView />;
        case 'syllabus':
          return <StudentSyllabusView />;
        case 'exams':
          return <StudentExamsView />;
        case 'important_questions':
          return <StudentImportantQuestionsView />;
        case 'ai_tutor':
          return <StudentAITutorView />;
        case 'progress':
          return <StudentProgressView />;
        case 'profile':
          return <StudentProfileView />;
        case 'dashboard':
        default:
          return <StudentDashboardView onNavigate={setActiveTab} />;
      }
    }

    // 2. TEACHER EXPERIENCE
    if (currentUser.role === 'teacher') {
      switch (activeTab) {
        case 'students':
          return <TeacherStudentsView />;
        case 'classes':
        case 'syllabus':
          return <TeacherClassesView />;
        case 'resources':
          return <TeacherResourcesView />;
        case 'assignments':
          return <TeacherAssignmentsView />;
        case 'analytics':
          return <TeacherAnalyticsView />;
        case 'profile':
          return <TeacherProfileView />;
        case 'dashboard':
        default:
          return <TeacherDashboardView onNavigate={setActiveTab} />;
      }
    }

    // 3. PARENT EXPERIENCE
    if (currentUser.role === 'parent') {
      switch (activeTab) {
        case 'my_child':
          return <ParentChildView />;
        case 'attendance':
          return <ParentAttendanceView />;
        case 'exams':
          return <StudentExamsView />;
        case 'alerts':
          return <ParentAlertsView />;
        case 'profile':
          return <ParentProfileView />;
        case 'progress':
        case 'dashboard':
        default:
          return <ParentDashboardView onNavigate={setActiveTab} />;
      }
    }

    return <StudentDashboardView onNavigate={setActiveTab} />;
  };

  return (
    <DashboardLayout>
      {renderDashboardContent()}
      <AuthModal />
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
