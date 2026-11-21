import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, Circle, AlertTriangle, BookOpen, Clock, Award, ShieldAlert, 
  RotateCw, ChevronRight, HelpCircle, Sparkles, Smartphone, Layers, Search, 
  Moon, Sun, ExternalLink, ArrowRight, BarChart2, Filter, Volume2, Lightbulb,
  FileText, Check, X, Info
} from 'lucide-react';

// --- DATA STRUCTURES & INITIAL CONTENT ---

const METHODOLOGY_TYPES = {
  QUALITATIVE: 'Qualitative',
  QUANTITATIVE: 'Quantitative',
  MIXED: 'Mixed Methods'
};

const STAGES_DATA = [
  {
    id: 'stage-1',
    code: 'DIS-9100',
    title: 'Stage 1: Proposal Components',
    subtitle: 'Chapters 1 & 2 Formulation',
    duration: 'Weeks 1–12 (Primary DIS-9100A)',
    description: 'Establish the empirical problem, purpose statement, research questions, theoretical framework, and conduct an exhaustive literature review.',
    turnaroundInfo: '7 Days (Ch 1) | 14 Days (Ch 2)',
    icon: 'FileText',
    color: 'from-blue-600 to-indigo-700',
    borderColor: 'border-blue-500',
    badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-400',
    milestones: [
      { id: 'm1-1', label: 'Chapter 1: Background & Significance', completed: true },
      { id: 'm1-2', label: 'Chapter 1: Problem & Purpose Statement', completed: true },
      { id: 'm1-3', label: 'Chapter 1: Research Questions & Hypotheses', completed: false },
      { id: 'm1-4', label: 'Chapter 1: Theoretical / Conceptual Framework', completed: false },
      { id: 'm1-5', label: 'Chapter 2: Literature Search Strategy (Databases/Keywords)', completed: false },
      { id: 'm1-6', label: 'Chapter 2: Synthesis of Literature (80% < 5 Yrs)', completed: false },
      { id: 'm1-7', label: 'Chair & SME Stage 1 Rubric Sign-Off (Doctoral Record)', completed: false }
    ],
    flashcards: [
      {
        question: 'What is the "80% Literature Rule" for Chapter 2?',
        answer: 'At least 80% of cited peer-reviewed sources in Chapter 2 must have been published within the last 5 years (excluding seminal/historical foundational theories).'
      },
      {
        question: 'What constitutes an acceptable Problem Statement in Chapter 1?',
        answer: 'It must clearly articulate a single specific problem supported by recent peer-reviewed empirical evidence, and explicitly state the potential negative outcomes if left unaddressed.'
      },
      {
        question: 'How do PhD and Applied Doctoral Framework requirements differ?',
        answer: 'PhD studies emphasize Theoretical Frameworks to test or build theory. Applied doctorates (e.g., EdD, DBA) frequently utilize Conceptual Frameworks oriented toward practical organizational problems.'
      },
      {
        question: 'What is the required verb tense for the Dissertation Proposal?',
        answer: 'The Dissertation Proposal (Chapters 1–3) must be written in FUTURE tense (e.g., "The researcher will collect data..."). After defense, the final manuscript shifts to PAST tense.'
      }
    ],
    quiz: [
      {
        question: 'Which of the following describes the Turnaround Time for Chapter 2 review in the Doctoral Record?',
        options: ['3 Calendar Days', '7 Calendar Days', '14 Calendar Days', '21 Calendar Days'],
        correct: 2,
        explanation: 'Chapter 2 and full Proposal/Manuscript drafts have a 14-calendar-day evaluation window for Chair and SME feedback.'
      },
      {
        question: 'What happens if a student receives a "Does Not Meet" on any rubric criteria at the end of DIS-9100A?',
        options: [
          'Immediate academic dismissal',
          'Enrolled in 12-week continuing course (DIS-9100B) with grade "C"',
          'Automatically passed with conditional waiver',
          'Required to restart the entire doctoral program'
        ],
        correct: 1,
        explanation: 'Failing to meet rubric criteria results in a "C" grade (Continuing) and enrollment in the 12-week DIS-9100B course.'
      }
    ],
    terms: [
      { term: 'Epistemology', def: 'The philosophical branch studying the nature, origin, and limits of human knowledge.' },
      { term: 'Ontology', def: 'The branch of philosophy concerned with the nature of being, reality, and existence.' },
      { term: 'Theoretical Framework', def: 'The underlying structure of concepts and theories that frames and supports a research study.' },
      { term: 'Empirical Gap', def: 'A key area in scholarly literature where existing research is lacking, inconclusive, or contradictory.' },
      { term: 'Confirmation Bias', def: 'The cognitive tendency to search for, interpret, and recall information in a way that confirms prior hypotheses.' }
    ],
    snags: [
      {
        title: 'Vague Problem Statement',
        issue: 'Combining multiple broad issues instead of focusing on one specific, empirically supported problem.',
        solution: 'Use exact phrasing: "The problem to be addressed in this study is..." followed by 1-2 sentences with recent citations showing concrete negative impacts.'
      },
      {
        title: 'Over-reliance on Non-Scholarly Sources',
        issue: 'Using textbooks, websites, or outdated studies in Chapter 2.',
        solution: 'Restrict 80%+ of sources to peer-reviewed journal articles published within the last 3-5 years.'
      }
    ],
    affirmation: 'I build my dissertation on a rock-solid scholarly foundation. Every paper I read and synthesize brings me one step closer to becoming a recognized authority in my field.'
  },
  {
    id: 'stage-2',
    code: 'DIS-9200',
    title: 'Stage 2: Completing Proposal',
    subtitle: 'Chapter 3, Assembly & Defense',
    duration: 'Weeks 13–24 (Primary DIS-9200A)',
    description: 'Operationalize methodology, population, sampling, instruments, data analysis plan, secure Academic Reader (AR) approval, and defend proposal.',
    turnaroundInfo: '7 Days (Ch 3) | 14 Days (AR Review)',
    icon: 'BookOpen',
    color: 'from-purple-600 to-violet-700',
    borderColor: 'border-purple-500',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-400',
    milestones: [
      { id: 'm2-1', label: 'Chapter 3: Methodology & Design Justification', completed: false },
      { id: 'm2-2', label: 'Chapter 3: Population, Sampling & Power Analysis', completed: false },
      { id: 'm2-3', label: 'Chapter 3: Instrumentation & Reliability/Validity', completed: false },
      { id: 'm2-4', label: 'Chapter 3: Detailed Step-by-Step Data Collection Plan', completed: false },
      { id: 'm2-5', label: 'Full Proposal Draft Assembly & APA Template Formatting', completed: false },
      { id: 'm2-6', label: 'Academic Reader (AR) Proposal Audit Approval', completed: false },
      { id: 'm2-7', label: 'Formal Dissertation Proposal Presentation & Defense', completed: false }
    ],
    flashcards: [
      {
        question: 'What is the role of the Academic Reader (AR)?',
        answer: 'The AR is the 3rd committee member who conducts an evaluative audit using a standardized checklist to ensure structural alignment, methodological rigor, and template adherence.'
      },
      {
        question: 'What must be included for Quantitative instrumentation permissions?',
        answer: 'You must provide written permission from the copyright owner to use or adapt existing survey instruments, placed directly in the Appendix.'
      },
      {
        question: 'What are the key qualitative trustworthiness criteria in Chapter 3?',
        answer: 'Credibility (internal validity), Transferability (external validity/generalizability), Dependability (reliability), and Confirmability (objectivity/audit trail).'
      },
      {
        question: 'What is a Power Analysis in Quantitative research?',
        answer: 'A statistical calculation (using G*Power software) used to determine the minimum sample size required to detect an effect of a given size with a given degree of confidence.'
      }
    ],
    quiz: [
      {
        question: 'Which element is mandatory in Chapter 3 for a Qualitative study?',
        options: ['G*Power calculations', 'Operational definitions of measurable variables', 'Trustworthiness plan (Credibility, Transferability, etc.)', 'Null Hypotheses testing equations'],
        correct: 2,
        explanation: 'Qualitative studies must detail how trustworthiness (credibility, transferability, dependability, confirmability) will be established.'
      },
      {
        question: 'How long does the Academic Reader (AR) have to review a full Proposal draft?',
        options: ['5 Days', '7 Days', '14 Calendar Days', '30 Days'],
        correct: 2,
        explanation: 'Full Dissertation Proposal and Manuscript drafts sent to the AR have a 14-calendar-day review window in the Doctoral Record.'
      }
    ],
    terms: [
      { term: 'Triangulation', def: 'Using multiple methods, data sources, or theoretical perspectives to cross-verify research findings.' },
      { term: 'Construct Validity', def: 'The degree to which a test or scale measures the theoretical construct it claims to measure.' },
      { term: 'Purposive Sampling', def: 'A non-probability sampling technique where participants are selected based on specific characteristics matching the study goals.' },
      { term: 'Reflexivity', def: 'The researcher’s critical self-reflection on how their biases, background, and presence impact the research process.' },
      { term: 'Ecological Fallacy', def: 'Logical fallacy where inferences about individual nature are deduced solely from aggregate statistics of the group.' }
    ],
    snags: [
      {
        title: 'Methodological Misalignment',
        issue: 'Research questions call for qualitative inquiry, but Chapter 3 proposes statistical hypothesis testing.',
        solution: 'Rigorously align Problem -> Purpose -> Research Questions -> Design -> Analysis.'
      },
      {
        title: 'Missing Instrument Permissions',
        issue: 'Submitting proposal without documentation allowing use of copyrighted surveys.',
        solution: 'Obtain explicit email or publisher permission letters early and attach them in the Appendix.'
      }
    ],
    affirmation: 'My study design is airtight, ethical, and precise. I approach my proposal defense not as a test, but as a scholarly dialogue.'
  },
  {
    id: 'stage-3',
    code: 'DIS-9300',
    title: 'Stage 3: IRB Governance & Fieldwork',
    subtitle: 'IRB Approval & Data Collection Verification',
    duration: 'Weeks 25–36 (Primary DIS-9300A)',
    description: 'Prepare and submit the Institutional Review Board (IRB) application, secure approval, recruit participants, collect data, and submit the Data Collection Verification Form.',
    turnaroundInfo: '7 Days (IRB Application & Verification)',
    icon: 'ShieldAlert',
    color: 'from-amber-600 to-orange-700',
    borderColor: 'border-amber-500',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400',
    milestones: [
      { id: 'm3-1', label: 'CITI Program Ethics Training Certificates Completed', completed: false },
      { id: 'm3-2', label: 'Site Permission Letters / Data Use Agreements Executed', completed: false },
      { id: 'm3-3', label: 'Informed Consent Forms & Recruitment Flyers Finalized', completed: false },
      { id: 'm3-4', label: 'Institutional IRB Protocol Application Submitted & Approved', completed: false },
      { id: 'm3-5', label: 'Participant Recruitment & Data Gathering Executed', completed: false },
      { id: 'm3-6', label: 'Data De-identification & Secure AES-256 Storage Completed', completed: false },
      { id: 'm3-7', label: 'Data Collection Verification Form Submitted to Doctoral Record', completed: false }
    ],
    flashcards: [
      {
        question: 'Can data collection begin prior to receiving formal IRB Approval?',
        answer: 'ABSOLUTELY NOT. Any data collected prior to official, written IRB approval is unapproved, ethically non-compliant, and CANNOT be used in the dissertation.'
      },
      {
        question: 'What is required for Data Collection Verification in DIS-9300?',
        answer: 'Upon finishing data collection, the candidate must submit the official Data Collection Verification Form into the Doctoral Record for Chair sign-off before proceeding to Chapter 4.'
      },
      {
        question: 'What is the standard data storage protocol for human subject protection?',
        answer: 'All data must be de-identified (pseudonyms or ID codes), stored on password-protected, encrypted cloud servers, and retained for at least 3-7 years as per institutional policy.'
      },
      {
        question: 'What must happen if research procedures change during data collection?',
        answer: 'You must submit an IRB Modification Request form and receive approval BEFORE implementing any changes to recruitment, sample, site, or measurement tools.'
      }
    ],
    quiz: [
      {
        question: 'What critical form must be submitted at the conclusion of fieldwork in DIS-9300?',
        options: ['Dissertation Prospectus Form', 'Data Collection Verification Form', 'Academic Reader Checklist', 'Degree Conferral Application'],
        correct: 1,
        explanation: 'The Data Collection Verification Form must be uploaded to the Doctoral Record once data collection is complete.'
      },
      {
        question: 'What is the primary objective of the Institutional Review Board (IRB)?',
        options: [
          'To grade APA formatting and syntax',
          'To protect the rights, welfare, and privacy of human research subjects',
          'To verify statistical power equations',
          'To speed up graduation timelines'
        ],
        correct: 1,
        explanation: 'The IRB exists solely to safeguard human subjects, ensure informed consent, and prevent physical, psychological, or legal harm.'
      }
    ],
    terms: [
      { term: 'Informed Consent', def: 'Voluntary agreement by a competent participant after receiving full disclosure of study purpose, risks, and benefits.' },
      { term: 'De-identification', def: 'Removing personal identifiers (names, emails, SSNs) to protect participant anonymity.' },
      { term: 'Minimal Risk', def: 'When the probability and magnitude of harm anticipated in research are not greater than those ordinarily encountered in daily life.' },
      { term: 'CITI Certification', def: 'Required standardized web-based training in research ethics and human subject protections.' }
    ],
    snags: [
      {
        title: 'Premature Participant Contact',
        issue: 'Reaching out to potential interviewees before IRB approval is issued.',
        solution: 'Wait until the official IRB Approval Letter is uploaded to your Doctoral Record.'
      },
      {
        title: 'Unclear Site Permission',
        issue: 'Collecting data at an organization without written authorization from an executive/authority.',
        solution: 'Secure signed Site Permission Letters on official company letterhead early during proposal phase.'
      }
    ],
    affirmation: 'I uphold the highest ethical standards of research. Protecting my participants’ rights and safety is my highest professional priority.'
  },
  {
    id: 'stage-4',
    code: 'DIS-9400',
    title: 'Stage 4: Manuscript & Defense',
    subtitle: 'Chapters 4 & 5, Final Defense & IRB Closure',
    duration: 'Weeks 37–48 (Primary DIS-9400A)',
    description: 'Synthesize findings in Chapter 4, draw conclusions and recommendations in Chapter 5, pass the Academic Reader audit, complete the Oral Defense, and submit IRB Closure.',
    turnaroundInfo: '7 Days (Ch 4/5) | 14 Days (AR Final)',
    icon: 'Award',
    color: 'from-emerald-600 to-teal-700',
    borderColor: 'border-emerald-500',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400',
    milestones: [
      { id: 'm4-1', label: 'Chapter 4: Data Analysis & Results Presentation', completed: false },
      { id: 'm4-2', label: 'Chapter 4: Comparison of Findings to Prior Literature', completed: false },
      { id: 'm4-3', label: 'Chapter 5: Discussion & Theoretical Implications', completed: false },
      { id: 'm4-4', label: 'Chapter 5: Actionable Recommendations for Practice', completed: false },
      { id: 'm4-5', label: 'Complete 5-Chapter Manuscript Cleared by Academic Reader', completed: false },
      { id: 'm4-6', label: 'Formal Dissertation Oral Defense Passed', completed: false },
      { id: 'm4-7', label: 'Official IRB Study Closure Form & Final Publication Upload', completed: false }
    ],
    flashcards: [
      {
        question: 'What is the strict boundary rule for Chapter 4 vs. Chapter 5?',
        answer: 'Chapter 4 presents OBJECTIVE findings and data (tables, themes, stats) WITHOUT interpretation. Chapter 5 provides the INTERPRETATION, implications, and recommendations.'
      },
      {
        question: 'What is required for the final Academic Reader (AR) Manuscript clearance?',
        answer: 'The complete 5-chapter draft, abstract, references, appendices, and formatting must meet 100% of the AR checklist criteria prior to scheduling the oral defense.'
      },
      {
        question: 'What happens after the successful Oral Defense?',
        answer: 'The candidate makes any required final edits, obtains Chair sign-off, submits the official IRB Study Closure Form, uploads to the publication repository, and applies for graduation.'
      },
      {
        question: 'How should Chapter 5 recommendations for future research be derived?',
        answer: 'Directly from the study findings and study limitations—never from unbacked personal opinion or speculation.'
      }
    ],
    quiz: [
      {
        question: 'Where should subjective interpretation of research findings first appear?',
        options: ['Chapter 1 Introduction', 'Chapter 3 Methodology', 'Chapter 4 Results', 'Chapter 5 Discussion & Implications'],
        correct: 3,
        explanation: 'Chapter 4 is strictly objective reporting of data. Interpretation, meaning, and reflection belong exclusively in Chapter 5.'
      },
      {
        question: 'What final IRB action is mandatory before degree conferral?',
        options: ['Re-submitting CITI training', 'Submitting the IRB Study Closure Form', 'Filing a law enforcement report', 'Paying an IRB renewal fee'],
        correct: 1,
        explanation: 'Once research is completed and analyzed, an official IRB Study Closure Form must be filed to formally close the protocol.'
      }
    ],
    terms: [
      { term: 'Statistical Significance', def: 'A determination that a relationship between variables is caused by something other than chance (e.g., p < .05).' },
      { term: 'Thematic Analysis', def: 'A method for identifying, analyzing, and reporting patterns (themes) within qualitative textual data.' },
      { term: 'Implications for Practice', def: 'Actionable takeaways explaining how real-world practitioners or organizations can apply the study findings.' },
      { term: 'Delimitations', def: 'Choices made by the researcher that define the boundaries and scope of the study (e.g., target population chosen).' }
    ],
    snags: [
      {
        title: 'Injecting Bias into Chapter 4',
        issue: 'Interpreting why a statistical test was significant or why a participant said something inside Chapter 4.',
        solution: 'Keep Chapter 4 strictly descriptive. Save all "why it matters" commentary for Chapter 5.'
      },
      {
        title: 'Disconnected Recommendations',
        issue: 'Making broad recommendations in Chapter 5 that are not supported by your data findings.',
        solution: 'Tie every single recommendation back to a specific theme or quantitative result from Chapter 4.'
      }
    ],
    affirmation: 'I am a scholar-practitioner. My research makes a meaningful contribution to literature and real-world practice. I am ready to earn my doctorate.'
  }
];

// --- MAIN REACT APPLICATION COMPONENT ---

export default function App() {
  // Global State
  const [stages, setStages] = useState(STAGES_DATA);
  const [activeStageId, setActiveStageId] = useState('stage-1');
  const [methodologyTrack, setMethodologyTrack] = useState(METHODOLOGY_TYPES.QUALITATIVE);
  const [courseExtensionStatus, setCourseExtensionStatus] = useState({
    'stage-1': 'A',
    'stage-2': 'A',
    'stage-3': 'A',
    'stage-4': 'A'
  });
  
  // Modal / Drawer State & Accessibility Ref
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('flashcards'); // 'flashcards', 'quiz', 'terms', 'snags', 'milestones', 'affirmation'
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Flashcard Flip State
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Glossary Search Term State
  const [searchTerm, setSearchTerm] = useState('');
  
  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Lock Screen Preview State
  const [targetDeadlineDays, setTargetDeadlineDays] = useState(42);
  const [customLockMessage, setCustomLockMessage] = useState('Iterative progress builds scholarly authority.');
  const [darkMode, setDarkMode] = useState(true);

  // Keyboard Navigation / Escape Key Listener for Modals (WCAG Compliant)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Focus Trapping / Auto-focus when modal opens
  useEffect(() => {
    if (isModalOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isModalOpen]);

  // Sync dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Derived Values
  const activeStage = stages.find(s => s.id === activeStageId) || stages[0];
  
  // Total Milestones Calculation
  const totalMilestones = stages.reduce((acc, stage) => acc + stage.milestones.length, 0);
  const completedMilestones = stages.reduce((acc, stage) => acc + stage.milestones.filter(m => m.completed).length, 0);
  const overallProgressPercentage = Math.round((completedMilestones / totalMilestones) * 100);

  // Filtered Glossaries
  const filteredTerms = activeStage.terms.filter(t => 
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.def.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const toggleMilestone = (stageId, milestoneId) => {
    setStages(prevStages => prevStages.map(stage => {
      if (stage.id === stageId) {
        return {
          ...stage,
          milestones: stage.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m)
        };
      }
      return stage;
    }));
  };

  const handleExtensionChange = (stageId, level) => {
    setCourseExtensionStatus(prev => ({
      ...prev,
      [stageId]: level
    }));
  };

  const openStageModal = (stageId, defaultTab = 'flashcards') => {
    setActiveStageId(stageId);
    setModalTab(defaultTab);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSearchTerm('');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setIsModalOpen(true);
  };

  const handleQuizOptionSelect = (qIndex, optionIndex) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({
      ...prev,
      [qIndex]: optionIndex
    }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    activeStage.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className={`min-h-screen text-base transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* --- TOP NAVBAR --- */}
      <header className={`sticky top-0 z-30 border-b backdrop-blur-md ${darkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-300'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
              <Award className="w-7 h-7" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">
                Doctoral Dissertation Planning Assistant
              </h1>
              <p className="text-sm font-medium text-slate-400 hidden sm:block">4-Phase Capstone Execution & Knowledge Quizlet Hub</p>
            </div>
          </div>

          {/* Center Methodology Track Selector */}
          <div className="hidden md:flex items-center space-x-1 p-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm font-semibold">
            <span className="px-3 py-1 text-slate-400 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-indigo-400" aria-hidden="true" /> Track:
            </span>
            {Object.values(METHODOLOGY_TYPES).map(track => (
              <button
                key={track}
                onClick={() => setMethodologyTrack(track)}
                aria-pressed={methodologyTrack === track}
                className={`px-4 py-1.5 rounded-lg transition-all focus-visible:ring-4 focus-visible:ring-amber-400 outline-none ${
                  methodologyTrack === track ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {track}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`p-3 rounded-xl border-2 transition-colors focus-visible:ring-4 focus-visible:ring-amber-400 outline-none ${
                darkMode ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* --- GLOBAL OVERVIEW BANNER --- */}
        <section className={`p-8 rounded-3xl border-2 transition-all ${darkMode ? 'bg-slate-900/80 border-slate-800 shadow-2xl' : 'bg-white border-slate-300 shadow-md'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400">
                  {methodologyTrack} Research Track
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> 52-Week Extended Master Schedule
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Dissertation Execution Dashboard</h2>
              <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
                Track your milestone progress across all four 12-week course phases (`DIS-9100` through `DIS-9400`). Monitor continuing course extensions (`-B`, `-C`, `-D`) with automated hard gate alerts for `DIS-9X00D` academic thresholds.
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="flex items-center space-x-6 p-6 rounded-2xl bg-slate-950 border-2 border-slate-800 min-w-[300px] shadow-inner">
              <div className="relative flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="38" stroke="currentColor" strokeWidth="8" className="text-slate-800" fill="transparent" />
                  <circle 
                    cx="48" cy="48" r="38" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    className="text-indigo-400 transition-all duration-700 ease-out" 
                    strokeDasharray={2 * Math.PI * 38}
                    strokeDashoffset={2 * Math.PI * 38 * (1 - overallProgressPercentage / 100)}
                    strokeLinecap="round"
                    fill="transparent" 
                  />
                </svg>
                <span className="absolute text-xl font-black text-slate-100">{overallProgressPercentage}%</span>
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Total Progress</div>
                <div className="text-3xl font-black text-indigo-400">{completedMilestones} <span className="text-base text-slate-500 font-normal">/ {totalMilestones}</span></div>
                <div className="text-xs font-semibold text-slate-400 mt-1">Milestones Completed</div>
              </div>
            </div>

          </div>
        </section>

        {/* --- METHODOLOGY TRACK GUIDANCE BANNER --- */}
        <div className={`p-5 rounded-2xl border-2 flex items-start space-x-4 text-sm leading-relaxed ${darkMode ? 'bg-indigo-950/40 border-indigo-700/60 text-indigo-200' : 'bg-indigo-50 border-indigo-300 text-indigo-950'}`}>
          <Info className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="font-bold text-base block mb-1">Active Methodological Guidance ({methodologyTrack}):</strong>
            {methodologyTrack === METHODOLOGY_TYPES.QUALITATIVE && 'Emphasize qualitative trustworthiness criteria (credibility, transferability, dependability, confirmability), semi-structured interview protocols, and thematic coding software (e.g., NVivo, Dedoose).'}
            {methodologyTrack === METHODOLOGY_TYPES.QUANTITATIVE && 'Emphasize statistical power analysis (G*Power calculations), copyright permissions for validated survey instruments, variable operationalization, and parametric assumption testing.'}
            {methodologyTrack === METHODOLOGY_TYPES.MIXED && 'Emphasize dual integration: quantitative statistical validity/reliability + qualitative trustworthiness, convergent/sequential designs, and mixed-method integrative data mapping.'}
          </div>
        </div>

        {/* --- MAIN STAGES GRID (DASHBOARD VIEW) --- */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <Layers className="w-6 h-6 text-indigo-400" aria-hidden="true" /> Dissertation Stages Dashboard
            </h3>
            <span className="text-sm font-semibold text-slate-400 hidden sm:inline">Select stage cards to launch Quizlet study decks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((stage) => {
              const stageCompleted = stage.milestones.filter(m => m.completed).length;
              const stageTotal = stage.milestones.length;
              const stagePct = Math.round((stageCompleted / stageTotal) * 100);
              const currentExt = courseExtensionStatus[stage.id] || 'A';
              const isDanger = currentExt === 'D';

              return (
                <div 
                  key={stage.id}
                  className={`group relative rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-300 hover:border-indigo-400 shadow-md'
                  }`}
                >
                  {/* Top Color Accent Line */}
                  <div className={`h-2.5 w-full bg-gradient-to-r ${stage.color}`} />

                  <div className="p-6 space-y-5">
                    {/* Stage Header */}
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-black border ${stage.badgeBg}`}>
                        {stage.code}
                      </span>
                      <h4 className="text-xl font-black text-slate-100 mt-3 group-hover:text-indigo-300 transition-colors">{stage.title}</h4>
                      <p className="text-xs font-bold text-slate-400 mt-0.5">{stage.subtitle}</p>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">{stage.description}</p>

                    {/* Progress Bar */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-400">Stage Completion</span>
                        <span className="text-indigo-400">{stageCompleted} / {stageTotal} ({stagePct}%)</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${stage.color} transition-all duration-500`} 
                          style={{ width: `${stagePct}%` }}
                        />
                      </div>
                    </div>

                    {/* Checkbox Checklist Preview (Top 3) */}
                    <div className="space-y-2 pt-3 border-t border-slate-800">
                      <div className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Key Milestones:</div>
                      {stage.milestones.slice(0, 3).map(m => (
                        <div 
                          key={m.id} 
                          onClick={() => toggleMilestone(stage.id, m.id)}
                          role="checkbox"
                          aria-checked={m.completed}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault();
                              toggleMilestone(stage.id, m.id);
                            }
                          }}
                          className="flex items-start space-x-2.5 text-sm text-slate-200 cursor-pointer hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400 outline-none rounded p-1"
                        >
                          {m.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" aria-hidden="true" />
                          )}
                          <span className={`line-clamp-1 ${m.completed ? 'line-through text-slate-500' : ''}`}>{m.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Extension Safeguard Selector */}
                    <div className="pt-3 border-t border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold">Course Attempt:</span>
                        <span className={`font-extrabold ${isDanger ? 'text-amber-400 animate-pulse' : 'text-slate-200'}`}>
                          {stage.code}{currentExt}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-xl bg-slate-950 border border-slate-800" role="group" aria-label="Select course attempt block">
                        {['A', 'B', 'C', 'D'].map(level => (
                          <button
                            key={level}
                            onClick={() => handleExtensionChange(stage.id, level)}
                            aria-label={`Select Course Attempt ${stage.code}${level}`}
                            aria-pressed={currentExt === level}
                            className={`py-1.5 text-xs font-black rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-amber-400 outline-none ${
                              currentExt === level 
                                ? level === 'D' 
                                  ? 'bg-amber-600 text-white shadow-lg' 
                                  : 'bg-indigo-600 text-white shadow-lg'
                                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>

                      {/* Dismissal Warning Alert */}
                      {isDanger && (
                        <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-start space-x-2 text-xs text-amber-200 leading-snug">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <strong className="font-bold text-amber-300">DISMISSAL THRESHOLD ({stage.code}D):</strong> Final opportunity! Failure to meet rubric criteria results in academic program dismissal.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stage Action Button */}
                  <div className="p-5 bg-slate-950/80 border-t border-slate-800">
                    <button
                      onClick={() => openStageModal(stage.id)}
                      className="w-full py-3 px-4 rounded-xl font-extrabold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all focus-visible:ring-4 focus-visible:ring-amber-400 outline-none group-hover:scale-[1.02]"
                    >
                      <BookOpen className="w-5 h-5" aria-hidden="true" />
                      <span>Launch Stage Quizlet Hub</span>
                      <ChevronRight className="w-4 h-4 text-indigo-200" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- SECONDARY SECTION: LOCK SCREEN GENERATOR & WRITING PILLARS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Lock Screen Customizer & Live Phone Widget */}
          <section className={`lg:col-span-1 p-8 rounded-3xl border-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'} space-y-6`}>
            <div className="flex items-center space-x-3">
              <Smartphone className="w-6 h-6 text-indigo-400" aria-hidden="true" />
              <h3 className="text-xl font-black">Lock Screen Generator</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Design a personalized mobile wallpaper lock screen countdown to stay on track toward your target deadlines.
            </p>

            {/* Customization Inputs */}
            <div className="space-y-4">
              <div>
                <label htmlFor="stage-focus-select" className="text-xs font-bold text-slate-300 block mb-1.5">Active Focus Stage:</label>
                <select
                  id="stage-focus-select"
                  value={activeStageId}
                  onChange={(e) => setActiveStageId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border-2 border-slate-800 text-sm font-semibold text-slate-100 focus-visible:ring-4 focus-visible:ring-amber-400 outline-none"
                >
                  {stages.map(s => (
                    <option key={s.id} value={s.id}>{s.code}: {s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="target-days-input" className="text-xs font-bold text-slate-300 block mb-1.5">Days to Deadline:</label>
                <input 
                  id="target-days-input"
                  type="number"
                  value={targetDeadlineDays}
                  onChange={(e) => setTargetDeadlineDays(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-slate-950 border-2 border-slate-800 text-sm font-semibold text-slate-100 focus-visible:ring-4 focus-visible:ring-amber-400 outline-none"
                />
              </div>

              <div>
                <label htmlFor="lock-message-input" className="text-xs font-bold text-slate-300 block mb-1.5">Lock Screen Affirmation Quote:</label>
                <textarea 
                  id="lock-message-input"
                  rows={2}
                  value={customLockMessage}
                  onChange={(e) => setCustomLockMessage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border-2 border-slate-800 text-sm text-slate-100 focus-visible:ring-4 focus-visible:ring-amber-400 outline-none leading-relaxed"
                />
              </div>
            </div>

            {/* Live Mobile Lock Screen Preview Mockup */}
            <div className="pt-2 flex justify-center">
              <div className="w-72 h-[480px] rounded-[40px] border-4 border-slate-700 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 p-5 relative shadow-2xl overflow-hidden flex flex-col justify-between text-center select-none">
                
                {/* Notch / Camera Bar */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-full z-20" />

                {/* Status Time Header */}
                <div className="pt-6 text-slate-100">
                  <div className="text-4xl font-black tracking-tight">09:41</div>
                  <div className="text-xs text-slate-400 font-semibold mt-1">Monday, November 23</div>
                </div>

                {/* Central Countdown Card Widget */}
                <div className="my-auto p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-indigo-500/40 text-left space-y-3 shadow-xl">
                  <div className="flex items-center justify-between text-xs font-extrabold text-indigo-400 uppercase tracking-wider">
                    <span>🎓 Dissertation Countdown</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200">{activeStage.code}</span>
                  </div>

                  <div className="text-center py-2">
                    <div className="text-4xl font-black text-amber-400">{targetDeadlineDays}</div>
                    <div className="text-xs uppercase font-extrabold text-slate-400 tracking-widest mt-1">Days Remaining</div>
                  </div>

                  <div className="border-t border-slate-800 pt-2 space-y-1">
                    <div className="text-xs font-bold text-slate-200">Active Milestone:</div>
                    <div className="text-xs text-slate-300 leading-tight">
                      • {activeStage.milestones.find(m => !m.completed)?.label || 'All Stage Milestones Cleared!'}
                    </div>
                  </div>

                  <div className="text-xs text-indigo-200 italic pt-2 border-t border-slate-800">
                    "{customLockMessage}"
                  </div>
                </div>

                {/* Bottom Lock Icon */}
                <div className="pb-2 text-slate-400 flex justify-center items-center gap-1.5 text-xs font-medium">
                  <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" /> Swipe up to unlock workspace
                </div>
              </div>
            </div>
          </section>

          {/* APA 7th Writing Pillars & Key Guidelines */}
          <section className={`lg:col-span-2 p-8 rounded-3xl border-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'} space-y-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lightbulb className="w-6 h-6 text-amber-400" aria-hidden="true" />
                <h3 className="text-xl font-black">APA 7th & Scholarly Writing Pillars</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-950 border-2 border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-base border border-blue-500/30">1</div>
                <h4 className="text-base font-bold text-slate-100">Structural Alignment</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Maintain continuous logical progression: Problem Statement -&gt; Purpose Statement -&gt; Research Questions -&gt; Design -&gt; Data Analysis -&gt; Study Findings.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border-2 border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black text-base border border-purple-500/30">2</div>
                <h4 className="text-base font-bold text-slate-100">Scholarly Voice & Tense</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Use future tense for Proposal drafts (Chapters 1–3) and convert to past tense for the final Manuscript (Chapters 1–5). Eliminate informal or biased language.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border-2 border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-base border border-emerald-500/30">3</div>
                <h4 className="text-base font-bold text-slate-100">Empirical Grounding</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Substantiate every empirical assertion with peer-reviewed literature. Ensure 80%+ of sources are published within 3-5 years of completion.
                </p>
              </div>
            </div>

            {/* Quick Turnaround Reference Table */}
            <div className="p-6 rounded-2xl bg-slate-950 border-2 border-slate-800 space-y-4">
              <h4 className="text-xs uppercase font-extrabold text-indigo-400 tracking-widest">Doctoral Record Official Evaluation Turnaround Benchmarks</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 font-bold">Chapter 1, 3, 4, 5</div>
                  <div className="text-base font-black text-slate-100 mt-1">7 Calendar Days</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 font-bold">Full Ch 2 Literature</div>
                  <div className="text-base font-black text-slate-100 mt-1">14 Calendar Days</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 font-bold">Proposal (DP) Draft</div>
                  <div className="text-base font-black text-slate-100 mt-1">14 Calendar Days</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 font-bold">Manuscript (DM) Draft</div>
                  <div className="text-base font-black text-slate-100 mt-1">14 Calendar Days</div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* --- STAGE QUIZLET / KNOWLEDGE HUB MODAL --- */}
      {isModalOpen && activeStage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-stage-title"
          ref={modalRef}
        >
          <div className={`w-full max-w-4xl max-h-[85vh] rounded-3xl border-2 flex flex-col overflow-hidden shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-300 text-slate-900'}`}>
            
            {/* Modal Header */}
            <div className={`p-6 border-b-2 flex items-center justify-between bg-gradient-to-r ${activeStage.color}`}>
              <div className="text-white space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-white/20 text-white backdrop-blur-sm border border-white/30">
                    {activeStage.code}
                  </span>
                  <span className="text-xs text-white/90 font-bold">Stage Knowledge & Quizlet Hub</span>
                </div>
                <h3 id="modal-stage-title" className="text-2xl font-black">{activeStage.title}</h3>
              </div>
              <button
                ref={closeButtonRef}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close Modal"
                className="p-3 rounded-2xl bg-black/30 text-white hover:bg-black/50 transition-colors focus-visible:ring-4 focus-visible:ring-amber-400 outline-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Tab Navigation */}
            <div className="flex border-b border-slate-800 bg-slate-950 overflow-x-auto px-4 text-xs font-bold" role="tablist">
              {[
                { id: 'flashcards', label: '🎴 Flashcards', count: activeStage.flashcards.length },
                { id: 'quiz', label: '📝 Self-Assessment', count: activeStage.quiz.length },
                { id: 'terms', label: '📚 Core Terms', count: activeStage.terms.length },
                { id: 'snags', label: '⚠️ Snags & Solutions', count: activeStage.snags.length },
                { id: 'milestones', label: '☑️ Stage Checklist', count: activeStage.milestones.length },
                { id: 'affirmation', label: '✨ Affirmation', count: null }
              ].map(tab => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={modalTab === tab.id}
                  onClick={() => {
                    setModalTab(tab.id);
                    setIsFlipped(false);
                  }}
                  className={`py-4 px-5 border-b-4 font-bold whitespace-nowrap transition-colors flex items-center space-x-2 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none ${
                    modalTab === tab.id 
                      ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10' 
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-sm">{tab.label}</span>
                  {tab.count !== null && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[70vh] flex-1 space-y-6">
              
              {/* --- TAB 1: FLASHCARDS --- */}
              {modalTab === 'flashcards' && (
                <div className="space-y-6 flex flex-col items-center">
                  <div className="flex items-center justify-between w-full max-w-xl text-xs font-bold text-slate-400">
                    <span>Card {currentCardIndex + 1} of {activeStage.flashcards.length}</span>
                    <span>Press Space/Enter or Click to flip</span>
                  </div>

                  {/* 3D Flip Card Container */}
                  <div 
                    onClick={() => setIsFlipped(!isFlipped)}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        setIsFlipped(!isFlipped);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Flashcard: ${activeStage.flashcards[currentCardIndex].question}. Press space to flip.`}
                    className="w-full max-w-xl h-80 cursor-pointer focus-visible:ring-4 focus-visible:ring-amber-400 outline-none rounded-3xl"
                  >
                    <div className={`relative w-full h-full rounded-3xl border-2 p-8 flex flex-col justify-between text-center transition-all duration-500 shadow-2xl ${
                      isFlipped 
                        ? 'bg-slate-950 border-indigo-500' 
                        : 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 hover:border-slate-700'
                    }`}>
                      
                      {/* Front Side */}
                      <div className={`inset-0 p-4 flex flex-col justify-between h-full ${isFlipped ? 'hidden' : 'flex'}`}>
                        <span className="text-xs uppercase font-extrabold text-indigo-400 tracking-widest">Concept Question</span>
                        <p className="text-xl font-extrabold text-slate-100 my-auto leading-relaxed">
                          {activeStage.flashcards[currentCardIndex].question}
                        </p>
                        <span className="text-xs text-slate-400 font-semibold flex items-center justify-center gap-2">
                          <RotateCw className="w-4 h-4 text-indigo-400" aria-hidden="true" /> Tap or press Enter to flip card
                        </span>
                      </div>

                      {/* Back Side */}
                      <div className={`inset-0 p-4 flex flex-col justify-between h-full text-left ${isFlipped ? 'flex' : 'hidden'}`}>
                        <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-widest">Key Answer & Insight</span>
                        <p className="text-base text-slate-200 font-medium my-auto leading-relaxed">
                          {activeStage.flashcards[currentCardIndex].answer}
                        </p>
                        <span className="text-xs text-slate-400 text-center font-semibold">Tap to return to question</span>
                      </div>

                    </div>
                  </div>

                  {/* Flashcard Navigation */}
                  <div className="flex items-center space-x-6">
                    <button
                      disabled={currentCardIndex === 0}
                      onClick={() => {
                        setCurrentCardIndex(prev => prev - 1);
                        setIsFlipped(false);
                      }}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-sm font-bold transition-colors focus-visible:ring-4 focus-visible:ring-amber-400 outline-none"
                    >
                      Previous Card
                    </button>
                    <button
                      disabled={currentCardIndex === activeStage.flashcards.length - 1}
                      onClick={() => {
                        setCurrentCardIndex(prev => prev + 1);
                        setIsFlipped(false);
                      }}
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-sm font-bold text-white transition-colors focus-visible:ring-4 focus-visible:ring-amber-400 outline-none"
                    >
                      Next Card
                    </button>
                  </div>
                </div>
              )}

              {/* --- TAB 2: SELF-ASSESSMENT QUIZ --- */}
              {modalTab === 'quiz' && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="p-4 rounded-2xl bg-indigo-500/20 border border-indigo-400 text-sm font-semibold text-indigo-200">
                    Verify your stage knowledge and policy benchmarks before submitting documents to your Dissertation Committee.
                  </div>

                  {activeStage.quiz.map((q, qIdx) => (
                    <fieldset key={qIdx} className="p-6 rounded-2xl bg-slate-950 border-2 border-slate-800 space-y-4">
                      <legend className="text-base font-extrabold text-slate-100 px-2">{qIdx + 1}. {q.question}</legend>
                      
                      <div className="space-y-3">
                        {q.options.map((option, optIdx) => {
                          const isSelected = quizAnswers[qIdx] === optIdx;
                          const isCorrect = q.correct === optIdx;
                          let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';

                          if (quizSubmitted) {
                            if (isCorrect) btnStyle = 'bg-emerald-500/25 border-emerald-400 text-emerald-100 font-bold';
                            else if (isSelected) btnStyle = 'bg-red-500/25 border-red-400 text-red-100 font-bold';
                          } else if (isSelected) {
                            btnStyle = 'bg-indigo-600/40 border-indigo-400 text-white font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleQuizOptionSelect(qIdx, optIdx)}
                              className={`w-full p-4 rounded-xl border-2 text-sm text-left transition-all flex items-center justify-between focus-visible:ring-4 focus-visible:ring-amber-400 outline-none ${btnStyle}`}
                            >
                              <span>{option}</span>
                              {quizSubmitted && isCorrect && <Check className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300 leading-relaxed">
                          <strong className="text-indigo-400 font-bold">Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </fieldset>
                  ))}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    {quizSubmitted ? (
                      <div className="text-base font-black text-emerald-400">
                        Total Score: {calculateQuizScore()} / {activeStage.quiz.length} Correct
                      </div>
                    ) : <div />}

                    <button
                      onClick={() => setQuizSubmitted(true)}
                      disabled={Object.keys(quizAnswers).length < activeStage.quiz.length || quizSubmitted}
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-sm font-bold text-white shadow-lg focus-visible:ring-4 focus-visible:ring-amber-400 outline-none"
                    >
                      {quizSubmitted ? 'Assessment Complete' : 'Submit Answers'}
                    </button>
                  </div>
                </div>
              )}

              {/* --- TAB 3: CORE TERMINOLOGY WITH SEARCH --- */}
              {modalTab === 'terms' && (
                <div className="space-y-6">
                  {/* Search Filter Bar */}
                  <div className="relative">
                    <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
                    <input 
                      type="text"
                      placeholder="Search methodology terms, epistemologies, or biases..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950 border-2 border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus-visible:ring-4 focus-visible:ring-amber-400 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTerms.map((item, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-950 border-2 border-slate-800 space-y-2 hover:border-indigo-500/50 transition-colors">
                        <div className="text-base font-extrabold text-indigo-400 flex items-center space-x-2">
                          <BookOpen className="w-5 h-5 text-indigo-400 shrink-0" aria-hidden="true" />
                          <span>{item.term}</span>
                        </div>
                        <p className="text-sm text-slate-200 leading-relaxed">{item.def}</p>
                      </div>
                    ))}
                    {filteredTerms.length === 0 && (
                      <div className="col-span-2 p-8 text-center text-sm text-slate-400">
                        No research terms found matching "{searchTerm}". Try a different keyword search.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* --- TAB 4: CRITICAL SNAGS & SOLUTIONS --- */}
              {modalTab === 'snags' && (
                <div className="space-y-4">
                  {activeStage.snags.map((snag, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 space-y-3">
                      <div className="flex items-center space-x-2.5 text-amber-300 font-extrabold text-base">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" aria-hidden="true" />
                        <span>{snag.title}</span>
                      </div>
                      <div className="text-sm text-slate-200 space-y-2 leading-relaxed">
                        <div><strong className="text-red-400 font-bold">The Pitfall:</strong> {snag.issue}</div>
                        <div><strong className="text-emerald-400 font-bold">The Actionable Solution:</strong> {snag.solution}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* --- TAB 5: CHECKLIST --- */}
              {modalTab === 'milestones' && (
                <div className="space-y-4 max-w-2xl mx-auto">
                  <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-2">Stage Milestones Checklist:</h4>
                  {activeStage.milestones.map(m => (
                    <div 
                      key={m.id}
                      onClick={() => toggleMilestone(activeStage.id, m.id)}
                      role="checkbox"
                      aria-checked={m.completed}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          toggleMilestone(activeStage.id, m.id);
                        }
                      }}
                      className={`p-4 rounded-2xl border-2 flex items-center space-x-3 cursor-pointer transition-all focus-visible:ring-4 focus-visible:ring-amber-400 outline-none ${
                        m.completed ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-100' : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {m.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" aria-hidden="true" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-600 shrink-0" aria-hidden="true" />
                      )}
                      <span className={`text-sm font-semibold ${m.completed ? 'line-through text-slate-400' : ''}`}>
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* --- TAB 6: AFFIRMATION --- */}
              {modalTab === 'affirmation' && (
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-950 to-purple-950 border-2 border-indigo-500/40 text-center space-y-6 my-auto">
                  <Sparkles className="w-12 h-12 text-amber-400 mx-auto animate-pulse" aria-hidden="true" />
                  <h4 className="text-2xl font-black text-slate-100">Doctoral Candidate Affirmation</h4>
                  <p className="text-lg italic text-indigo-100 max-w-xl mx-auto leading-relaxed font-medium">
                    "{activeStage.affirmation}"
                  </p>
                  <div className="text-xs text-slate-300 font-semibold pt-2 border-t border-indigo-800/60 max-w-md mx-auto">
                    Remember: Dissertation writing is an iterative journey. Revisions are not failures—they are the sharpening of scholarly rigor.
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t-2 border-slate-800 bg-slate-950 flex justify-between items-center text-xs font-bold text-slate-400">
              <span>Track: <strong className="text-slate-100">{methodologyTrack}</strong></span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors focus-visible:ring-4 focus-visible:ring-amber-400 outline-none"
              >
                Close Hub
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- FORMAL FOOTER & INSTITUTIONAL CITATION --- */}
      <footer className="border-t-2 border-slate-800/80 py-10 mt-16 bg-slate-950 text-slate-400 text-xs leading-relaxed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800/80 pb-4 gap-4">
            <div>
              <div className="text-sm font-bold text-slate-200">Doctoral Dissertation Planning Assistant & Project Management Workspace</div>
              <div className="text-xs text-slate-400">Interactive Execution Tracker & Knowledge Quizlet Engine</div>
            </div>
            <div className="text-xs font-semibold text-slate-400">
              WCAG 2.1 AA Compliant • High-Contrast Low-Vision Enabled
            </div>
          </div>
          
          {/* Formal Institutional Citation */}
          <div className="text-slate-400 text-xs space-y-1">
            <p>
              <strong className="text-slate-300">Institutional Reference & Citation:</strong> Adapted from the <em>Doctoral Student Experience (DSE) Manual & Guidelines</em>, Educational Services & Assessment Support (National University, July 2025).
            </p>
            <p>
              Course Sequence Reference: DIS-9100, DIS-9200, DIS-9300, DIS-9400 primary blocks and associated continuing course sequence (DIS-9X00B, DIS-9X00C, DIS-9X00D). All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
