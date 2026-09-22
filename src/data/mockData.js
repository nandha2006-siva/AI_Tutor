// NEXORA AI - Educational Mock Data & System Constants

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🌐' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' }
];

export const SLIDESHOW_ITEMS = [
  {
    id: 'slide-1',
    image: '/images/student_study_tech.jpg',
    title: 'Precision Study Blueprints',
    subtitle: 'AI analyzes syllabus schedules and exam timetables into adaptive daily milestones.',
    tag: 'Adaptive Learning'
  },
  {
    id: 'slide-2',
    image: '/images/teacher_mentoring.jpg',
    title: 'Empowered Educators',
    subtitle: 'Diagnostic analytics highlight class-wide weak topics and generate high-yield assessments.',
    tag: 'Teacher Intelligence'
  },
  {
    id: 'slide-3',
    image: '/images/rural_student_learning.jpg',
    title: 'Multilingual Inclusivity',
    subtitle: 'Deep concept explanations in regional languages bridging educational divides for rural learners.',
    tag: 'Regional Reach'
  },
  {
    id: 'slide-4',
    image: '/images/students_collaborating.jpg',
    title: 'Collaborative Growth',
    subtitle: 'Fostering academic confidence through peer problem-solving and smart curriculum tracking.',
    tag: 'Peer Cohorts'
  },
  {
    id: 'slide-5',
    image: '/images/ai_powered_learning.jpg',
    title: 'Interactive AI Study Tutor',
    subtitle: 'A conversational virtual avatar that explains concepts, quizzes, and encourages mastery.',
    tag: 'Next-Gen AI Tutor'
  }
];

export const DEMO_USERS = {
  student: {
    id: 'usr_std_101',
    name: 'Aarav Sharma',
    email: 'aarav@nexora.ai',
    role: 'student',
    avatar: '👨‍🎓',
    grade: 'Class 12 - Science',
    curriculum: 'CBSE Board',
    institution: 'Delhi Public School',
    language: 'en',
    streakDays: 14,
    studyPlanCompletion: 84
  },
  teacher: {
    id: 'usr_tch_202',
    name: 'Dr. Meenakshi Sundaram',
    email: 'meenakshi@nexora.ai',
    role: 'teacher',
    avatar: '👩‍🏫',
    designation: 'Senior PGT Physics & Academic Coordinator',
    institution: 'Kendriya Vidyalaya Apex',
    classesCount: 4,
    studentsCount: 168,
    language: 'en'
  },
  parent: {
    id: 'usr_par_303',
    name: 'Rajesh & Priya Sharma',
    email: 'parent.sharma@nexora.ai',
    role: 'parent',
    avatar: '👨‍👩‍👧',
    childName: 'Aarav Sharma',
    childGrade: 'Class 12 - Science',
    childId: 'NEX-STD-4402',
    language: 'en'
  }
};

export const STUDENT_DATA = {
  todayStudyPlan: [
    {
      id: 'sp_1',
      subject: 'Physics',
      topic: 'Electromagnetic Induction & Faraday’s Laws',
      duration: '45 mins',
      timeSlot: '04:30 PM - 05:15 PM',
      priority: 'High Yield',
      completed: true,
      difficulty: 'Medium'
    },
    {
      id: 'sp_2',
      subject: 'Mathematics',
      topic: 'Definite Integrals - Area Under Curves',
      duration: '60 mins',
      timeSlot: '05:30 PM - 06:30 PM',
      priority: 'Exam Critical',
      completed: false,
      difficulty: 'Hard'
    },
    {
      id: 'sp_3',
      subject: 'Chemistry',
      topic: 'Coordination Compounds - Crystal Field Theory',
      duration: '40 mins',
      timeSlot: '07:00 PM - 07:40 PM',
      priority: 'Concept Revision',
      completed: false,
      difficulty: 'Medium'
    }
  ],
  upcomingExams: [
    {
      subject: 'Physics Pre-Board',
      date: '2026-09-28',
      daysLeft: 16,
      syllabusCovered: 88,
      status: 'On Track'
    },
    {
      subject: 'Mathematics Mid-Term',
      date: '2026-10-06',
      daysLeft: 24,
      syllabusCovered: 74,
      status: 'Needs Revision'
    },
    {
      subject: 'Chemistry Practical & Viva',
      date: '2026-10-14',
      daysLeft: 32,
      syllabusCovered: 92,
      status: 'Ready'
    }
  ],
  syllabusOverview: [
    { subject: 'Physics', completedChapters: 11, totalChapters: 14, percent: 78, weakTopic: 'Wave Optics' },
    { subject: 'Mathematics', completedChapters: 9, totalChapters: 13, percent: 69, weakTopic: '3D Geometry' },
    { subject: 'Chemistry', completedChapters: 12, totalChapters: 14, percent: 86, weakTopic: 'Amines Mechanisms' },
    { subject: 'Computer Science', completedChapters: 8, totalChapters: 10, percent: 80, weakTopic: 'Stack Implementation' }
  ],
  importantQuestions: [
    {
      id: 'iq_1',
      subject: 'Physics',
      chapter: 'Electromagnetic Induction',
      question: 'Derive the expression for mutual inductance of two long coaxial solenoids. State Lenz’s law and its conservation basis.',
      weightage: '5 Marks',
      repetitionScore: '94% Frequent in CBSE 5-Yr Papers'
    },
    {
      id: 'iq_2',
      subject: 'Mathematics',
      chapter: 'Definite Integrals',
      question: 'Evaluate integral from 0 to pi of (x * sin(x)) / (1 + cos^2(x)) dx using properties of definite integrals.',
      weightage: '4 Marks',
      repetitionScore: '89% High Probability'
    },
    {
      id: 'iq_3',
      subject: 'Chemistry',
      chapter: 'Coordination Chemistry',
      question: 'Explain on the basis of CFT why [Ti(H2O)6]3+ is colored while [Sc(H2O)6]3+ is colorless.',
      weightage: '3 Marks',
      repetitionScore: '85% Frequent Concept'
    }
  ],
  aiTutorConcepts: {
    en: {
      avatarGreeting: 'Hello Aarav! I am Nexora, your AI academic companion. I have reviewed your Physics pre-board timeline. Ready to master Faraday’s Law today?',
      explanationSnippet: 'Faraday’s First Law states that whenever magnetic flux linked with a circuit changes, an electromotive force (EMF) is induced. The induced EMF magnitude equals the rate of change of magnetic flux.',
      quizQuestion: 'Quick Check: If you double the speed of magnet entering a coil, what happens to the induced current?',
      options: ['It doubles', 'It halves', 'It remains constant', 'It drops to zero'],
      correctIndex: 0
    },
    ta: {
      avatarGreeting: 'வணக்கம் ஆரவ்! நான் நெக்சோரா, உங்கள் AI கல்வித் தோழன். இன்று மின்காந்த தூண்டல் மற்றும் ஃபாரடே விதிகளை எளிமையாக புரிந்து கொள்வோமா?',
      explanationSnippet: 'ஒரு சுற்றில் பாயும் காந்தப் பாயம் மாறும்போது, அதில் ஒரு மின்னியக்கு விசை (EMF) தூண்டப்படுகிறது. இந்த விசை காந்தப் பாய மாற்றத்தின் வீதத்திற்கு நேர்விகிதத்தில் இருக்கும்.',
      quizQuestion: 'விரைவு வினா: ஒரு காந்தத்தை சுருளுக்குள் செலுத்தும் வேகத்தை இருமடங்காக அதிகரித்தால் தூண்டப்படும் மின்னோட்டம் என்னவாகும்?',
      options: ['இருமடங்காகும் (Doubles)', 'பாதியாகும்', 'மாறாமல் இருக்கும்', 'பூஜ்ஜியமாகும்'],
      correctIndex: 0
    },
    hi: {
      avatarGreeting: 'नमस्ते आरव! मैं नेक्सोरा हूँ, आपका एआई अध्ययन साथी। क्या आज हम फैराडे के विद्युत चुम्बकीय प्रेरण के नियम को समझें?',
      explanationSnippet: 'फैराडे का पहला नियम कहता है कि जब भी किसी परिपथ से जुड़े चुंबकीय प्रवाह में परिवर्तन होता है, तो एक विद्युत वाहक बल (EMF) प्रेरित होता है।',
      quizQuestion: 'त्वरित प्रश्न: यदि चुंबक की गति को कुण्डली के अंदर दोगुना कर दिया जाए, तो प्रेरित धारा पर क्या प्रभाव पड़ेगा?',
      options: ['यह दोगुनी हो जाएगी', 'यह आधी हो जाएगी', 'यह स्थिर रहेगी', 'शून्य हो जाएगी'],
      correctIndex: 0
    },
    te: {
      avatarGreeting: 'నమస్కారం ఆరవ్! నేను నెక్సోరా, మీ AI అభ్యాస సహచరుడిని. ఈరోజు ఫెరడే విద్యుదయస్కాంత ప్రేరణ సూత్రాలను నేర్చుకుందామా?',
      explanationSnippet: 'వలయంలోని అయస్కాంత అభివాహం మారినప్పుడు, విద్యుచ్ఛాలక బలం (EMF) ప్రేరేపించబడుతుంది.',
      quizQuestion: 'త్వరిత ప్రశ్న: ఒక తీగచుట్టలోకి అయస్కాంతం వెళ్లే వేగాన్ని రెట్టింపు చేస్తే ప్రేరిత విద్యుత్ ప్రవాహం ఏమవుతుంది?',
      options: ['రెట్టింపు అవుతుంది', 'సగం అవుతుంది', 'మారదు', 'సున్నా అవుతుంది'],
      correctIndex: 0
    },
    kn: {
      avatarGreeting: 'ನಮಸ್ಕಾರ ಆರವ್! ನಾನು ನೆಕ್ಸೋರಾ, ನಿಮ್ಮ AI ಅಧ್ಯಯನ ಒಡನಾಡಿ. ಇಂದು ಫ್ಯಾರಡೆ ವಿದ್ಯುತ್ಕಾಂತೀಯ ಪ್ರೇರಣೆಯ ನಿಯಮಗಳನ್ನು ಕಲಿಯೋಣವೇ?',
      explanationSnippet: 'ಮಂಡಲದಲ್ಲಿ ಕಾಂತೀಯ ಹರಿವು ಬದಲಾದಾಗ ವಿದ್ಯುತ್ ಚಾಲಕ ಬಲವು ಪ್ರೇರೇಪಿಸಲ್ಪಡುತ್ತದೆ.',
      quizQuestion: 'ತ್ವರಿತ ಪ್ರಶ್ನೆ: ಕಾಯಿಲ್ ಒಳಗೆ ಆಯಸ್ಕಾಂತದ ವೇಗವನ್ನು ದ್ವಿಗುಣಗೊಳಿಸಿದರೆ ಪ್ರೇರಿತ ವಿದ್ಯುತ್ ಏನಾಗುತ್ತದೆ?',
      options: ['ದ್ವಿಗುಣಗೊಳ್ಳುತ್ತದೆ', 'ಅರ್ಧವಾಗುತ್ತದೆ', 'ಬದಲಾಗುವುದಿಲ್ಲ', 'ಶೂನ್ಯವಾಗುತ್ತದೆ'],
      correctIndex: 0
    },
    ml: {
      avatarGreeting: 'നമസ്കാരം ആരവ്! ഞാൻ നെക്സോറ, നിങ്ങളുടെ AI പഠന കൂട്ടുകാരൻ. ഇന്ന് ഫാരഡെയുടെ വിദ്യുത്കാന്തിക പ്രേരണ നിയമങ്ങൾ പഠിക്കാം അല്ലേ?',
      explanationSnippet: 'ഒരു സർക്യൂട്ടിലൂടെയുള്ള കാന്തിക പ്രവാഹം മാറുമ്പോൾ അവിടെ ഒരു പ്രേരിത ഇഎംഎഫ് ഉണ്ടാകുന്നു.',
      quizQuestion: 'ദ്രുത ചോദ്യം: ഒരു കോയിലിലേക്ക് കാന്തം പ്രവേശിക്കുന്ന വേഗത ഇരട്ടിയാക്കിയാൽ പ്രേരിത കറന്റിന് എന്ത് സംഭവിക്കും?',
      options: ['ഇരട്ടിയാകും', 'പകുതിയാകും', 'മാറ്റമുണ്ടാകില്ല', 'പൂജ്യമാകും'],
      correctIndex: 0
    }
  }
};

export const TEACHER_DATA = {
  classes: [
    { id: 'c1', name: 'Class 12 - Physics (A)', students: 44, averageScore: '81%', syllabusCoverage: '78%', nextExam: 'Pre-Board 1 (Sep 28)' },
    { id: 'c2', name: 'Class 12 - Physics (B)', students: 42, averageScore: '74%', syllabusCoverage: '72%', nextExam: 'Pre-Board 1 (Sep 28)' },
    { id: 'c3', name: 'Class 11 - Mechanics Core', students: 40, averageScore: '86%', syllabusCoverage: '85%', nextExam: 'Unit Test 3 (Oct 04)' },
    { id: 'c4', name: 'Class 11 - Optics & Waves', students: 42, averageScore: '79%', syllabusCoverage: '80%', nextExam: 'Unit Test 3 (Oct 04)' }
  ],
  weakTopicsSummary: [
    { topic: 'Wave Optics: Fringe Width Calculation', class: 'Class 12-B', strugglingStudents: 16, severity: 'High' },
    { topic: 'Rotational Dynamics: Moment of Inertia', class: 'Class 11-A', strugglingStudents: 12, severity: 'Medium' },
    { topic: 'Alternating Current: LCR Resonance Circuits', class: 'Class 12-A', strugglingStudents: 9, severity: 'Medium' }
  ],
  recentResources: [
    { title: 'Chapter 6: Electromagnetic Induction - Problem Blueprint 2026', type: 'PDF Notes', downloads: 82, date: 'Yesterday' },
    { title: 'CBSE Sample Question Bank - Numerical Set A', type: 'Worksheet', downloads: 114, date: '3 days ago' },
    { title: 'Optics Formula Cheatsheet & Ray Diagram Tips', type: 'Guide', downloads: 96, date: '1 week ago' }
  ]
};

export const PARENT_DATA = {
  childName: 'Aarav Sharma',
  schoolName: 'Delhi Public School (Sector 4)',
  grade: 'Class 12 Science (PCM)',
  studyPlanAdherence: '92%',
  attendancePercent: '96.5%',
  lastActiveSession: 'Today, 04:45 PM (Physics - Faraday\'s Laws)',
  academicStrengths: [
    'Consistent daily problem-solving routine',
    'High accuracy in Chemistry organic mechanisms',
    'Exemplary attendance in school practical labs'
  ],
  focusAreas: [
    'Mathematics 3D geometry integration requires additional revision',
    'Time management in solving 5-mark Physics derivations'
  ],
  alerts: [
    {
      id: 'alt_1',
      date: 'Today, 10:15 AM',
      type: 'Exam Alert',
      message: 'Physics Pre-Board scheduled in 16 days. Nexora AI has scheduled 4 revision checkpoints.',
      severity: 'important'
    },
    {
      id: 'alt_2',
      date: 'Yesterday',
      type: 'Teacher Note',
      message: 'Dr. Meenakshi Sundaram noted: "Aarav demonstrated strong conceptual clarity during today\'s ray optics seminar."',
      severity: 'positive'
    }
  ]
};
