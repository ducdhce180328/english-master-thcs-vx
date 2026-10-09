/**
 * English Master THCS Vĩnh Xuân 
 * Nền tảng học và luyện thi tiếng Anh THCS toàn diện bám sát chương trình GDPT 2018
 * Dành cho học sinh lớp 6–9
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { RoadmapModule } from './components/roadmap/RoadmapModule';
import { ListeningModule } from './components/listening/ListeningModule';
import { ReadingModule } from './components/reading/ReadingModule';
import { WritingModule } from './components/writing/WritingModule';
import { VocabularyModule } from './components/vocabulary/VocabularyModule';
import { GrammarModule } from './components/grammar/GrammarModule';
import { QuizModule } from './components/quiz/QuizModule';
import { ClassManager } from './components/teacher/ClassManager';
import { QuestionManager } from './components/teacher/QuestionManager';
import { TeacherQuestionPractice } from './components/common/TeacherQuestionPractice';
import { ClassStudentSelectorModal } from './components/common/ClassStudentSelectorModal';
import { unitService } from './services/unitService';
import { UnitManager } from './components/teacher/UnitManager';
import { questionBankService, questionsForGrade } from './services/questionBankService';
import { storageService } from './services/storageService';
import { audioService } from './services/audioService';
import { GradeLevel, Role, UserProfile, UnitModule, StudentRecord } from './types';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => storageService.getUserProfile());
  const [activeGrade, setActiveGrade] = useState<GradeLevel>(userProfile.grade || 6);
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [activeUnitNumber, setActiveUnitNumber] = useState<number>(1);

  // Class & Student Selector Modal
  const [isStudentSelectorOpen, setIsStudentSelectorOpen] = useState(false);

  // Sync profile grade
  const handleGradeChange = (newGrade: GradeLevel) => {
    setActiveGrade(newGrade);
    setActiveUnitNumber(1);
    const updated = storageService.setGrade(newGrade);
    setUserProfile({ ...updated });
  };

  const handleSelectStudent = (student: StudentRecord) => {
    const updated = storageService.switchStudent(student);
    setUserProfile({ ...updated });
    if (student.grade && student.grade !== activeGrade) {
      setActiveGrade(student.grade);
      setActiveUnitNumber(1);
    }
  };

  const handleRoleChange = (newRole: Role) => {
    const updated = storageService.setRole(newRole);
    setUserProfile({ ...updated });

    // Auto-navigate to specialized dashboard if selected
    if (newRole === 'teacher') setCurrentTab('question_manager');
    else setCurrentTab('dashboard');
  };

  const [unitVersion, setUnitVersion] = useState(0);
  useEffect(() => {
    const refresh = () => setUnitVersion(version => version + 1);
    window.addEventListener('em_units_changed', refresh);
    window.addEventListener('em_question_bank_changed', refresh);
    return () => {
      window.removeEventListener('em_units_changed', refresh);
      window.removeEventListener('em_question_bank_changed', refresh);
    };
  }, []);
  // Current curriculum units for selected grade
  const gradeUnits: UnitModule[] = React.useMemo(() => unitService.getUnits(activeGrade), [activeGrade, unitVersion]);
  const currentUnit: UnitModule =
    gradeUnits.find((u) => u.unitNumber === activeUnitNumber) || gradeUnits[0];
  const selectedUnitNumber = currentUnit.unitNumber;
  useEffect(() => {
    if (!gradeUnits.some(unit => unit.unitNumber === activeUnitNumber)) setActiveUnitNumber(gradeUnits[0].unitNumber);
  }, [gradeUnits, activeUnitNumber]);
  useEffect(() => () => audioService.stop(), [activeGrade, selectedUnitNumber, currentTab]);
  const currentUnitQuestions = React.useMemo(() => questionsForGrade(questionBankService.getQuestions(), activeGrade, undefined, selectedUnitNumber), [activeGrade, selectedUnitNumber, currentTab, unitVersion]);
  const skillCategory = currentTab === 'grammar' ? 'Grammar' : currentTab === 'reading' ? 'Reading' : currentTab === 'listening' ? 'Listening' : currentTab === 'writing' ? 'Writing' : 'Vocabulary';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Header */}
      <Header
        userProfile={userProfile}
        activeGrade={activeGrade}
        onGradeChange={handleGradeChange}
        onRoleChange={handleRoleChange}
        onOpenStudentSelector={() => setIsStudentSelectorOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar & Mobile Bottom Nav */}
        <Sidebar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          role={userProfile.role}
        />

        {/* Dynamic Content Area */}
        <main key={activeGrade + '-' + selectedUnitNumber + '-' + userProfile.id} className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 min-w-0">
          {!['class_manager', 'question_manager', 'unit_manager'].includes(currentTab) && <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
            <label htmlFor="active-unit" className="text-sm font-semibold text-slate-700">Unit đang học · Lớp {activeGrade}:</label>
            <select id="active-unit" value={selectedUnitNumber} onChange={event => setActiveUnitNumber(Number(event.target.value))} className="min-w-0 max-w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              {gradeUnits.map(unit => <option key={unit.unitNumber} value={unit.unitNumber}>{unit.isCustom ? `Unit ${unit.unitNumber}: ${unit.title}` : unit.title}</option>)}
            </select>
          </div>}
          {currentUnit.isCustom && ['grammar', 'reading', 'listening', 'writing', 'vocabulary'].includes(currentTab) && <div className="rounded-2xl border border-indigo-200 bg-white p-6">
            <h1 className="text-xl font-bold">Unit {selectedUnitNumber}: {currentUnit.title}</h1><p className="mt-2 text-sm text-slate-600">{currentUnit.descriptionVi}</p>
            {!currentUnitQuestions.some(question => question.category === skillCategory) && <p className="mt-3 text-sm text-slate-500">Giáo viên chưa thêm bài tập cho kỹ năng này trong Unit.</p>}
          </div>}
          {currentTab === 'dashboard' && (
            <StudentDashboard
              userProfile={userProfile}
              activeGrade={activeGrade}
              currentUnit={currentUnit}
              onNavigate={setCurrentTab}
              onOpenStudentSelector={() => setIsStudentSelectorOpen(true)}
            />
          )}

          {currentTab === 'roadmap' && (
            <RoadmapModule
              units={gradeUnits}
              grade={activeGrade}
              activeUnitNumber={selectedUnitNumber}
              onSelectUnit={(num) => setActiveUnitNumber(num)}
              onNavigateSkill={setCurrentTab}
            />
          )}

          {currentTab === 'listening' && !currentUnit.isCustom && (
            <ListeningModule
              lesson={currentUnit.listening}
            />
          )}

          {currentTab === 'reading' && !currentUnit.isCustom && (
            <ReadingModule
              lesson={currentUnit.reading}
            />
          )}

          {currentTab === 'writing' && !currentUnit.isCustom && (
            <WritingModule
              prompt={currentUnit.writing}
            />
          )}

          {currentTab === 'vocabulary' && !currentUnit.isCustom && (
            <VocabularyModule
              vocabularies={currentUnit.vocabularies}
              grade={activeGrade}
              unit={currentUnit.unitNumber}
            />
          )}

          {currentTab === 'grammar' && !currentUnit.isCustom && (
            <GrammarModule
              grammar={currentUnit.grammar}
            />
          )}

          {currentTab === 'quiz' && (
            <QuizModule
              unitQuestions={currentUnit.isCustom ? currentUnitQuestions.filter(question => question.type === 'mcq') : currentUnit.quizQuestions}
              grade={activeGrade}
              unit={currentUnit.unitNumber}
            />
          )}

          {(['grammar', 'reading', 'listening', 'writing', 'vocabulary'] as string[]).includes(currentTab) && <TeacherQuestionPractice
            key={currentTab + activeGrade + selectedUnitNumber + userProfile.id}
            grade={activeGrade}
            unit={selectedUnitNumber}
            category={currentTab === 'grammar' ? 'Grammar' : currentTab === 'reading' ? 'Reading' : currentTab === 'listening' ? 'Listening' : currentTab === 'writing' ? 'Writing' : 'Vocabulary'}
          />}

          {currentTab === 'unit_manager' && userProfile.role === 'teacher' && <UnitManager activeGrade={activeGrade} onCreateQuestions={(grade, unit) => { handleGradeChange(grade); setActiveUnitNumber(unit); setCurrentTab('question_manager'); }} />}

          {currentTab === 'class_manager' && userProfile.role === 'teacher' && <ClassManager />}

          {currentTab === 'question_manager' && userProfile.role === 'teacher' && <QuestionManager key={activeGrade} activeGrade={activeGrade} onManageClasses={() => setCurrentTab('class_manager')} onManageUnits={() => setCurrentTab('unit_manager')} activeUnit={selectedUnitNumber} />}

        </main>
      </div>

      {/* Class & Student Selector Modal */}
      <ClassStudentSelectorModal
        isOpen={isStudentSelectorOpen}
        onClose={() => setIsStudentSelectorOpen(false)}
        currentUser={userProfile}
        onSelectStudent={handleSelectStudent}
        onSelectGrade={(grade) => {
          setActiveGrade(grade);
          setActiveUnitNumber(1);
        }}
      />
    </div>
  );
}
