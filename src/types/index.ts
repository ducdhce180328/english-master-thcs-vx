export type Role = 'student' | 'teacher';

export type GradeLevel = 6 | 7 | 8 | 9;

export type Accent = 'en-US' | 'en-GB';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface UserProfile {
  id: string;
  name: string;
  role: Role;
  grade: GradeLevel;
  textbook: 'Global Success' | 'Friends Plus' | 'Smart World';
  xp: number;
  streak: number;
  level: number;
  coins: number;
  studyTimeMinutes: number;
  lastActive: string;
  avatar: string;
  classId?: string;
  className?: string;
  rollNumber?: number;
  studentCode?: string;
  gender?: 'male' | 'female';
}

export interface StudentRecord {
  id: string;
  name: string;
  classId: string;
  className: string;
  grade: GradeLevel;
  rollNumber: number;
  studentCode: string;
  gender: 'male' | 'female';
  xp: number;
  streak: number;
  level: number;
  studyTimeMinutes: number;
  completedLessonsCount: number;
  averageScore: number;
  lastActive: string;
  avatar?: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  grade: GradeLevel;
  studentCount: number;
  teacher: string;
  code?: string;
  academicYear?: string;
  students?: StudentRecord[];
}

export interface VocabWord {
  id: string;
  word: string;
  ipa: string;
  partOfSpeech: string;
  meaningVi: string;
  exampleEn: string;
  exampleVi: string;
  audioText?: string;
  topic: string;
  grade: GradeLevel;
  unit: number;
  srsLevel?: number; // 0 to 5
  nextReviewDate?: string;
  isStarred?: boolean;
}

export interface GrammarTopic {
  id: string;
  title: string;
  grade: GradeLevel;
  unit: number;
  formula: string;
  usageVi: string;
  signalsVi: string[];
  examples: { en: string; vi: string }[];
  commonMistakesVi: string[];
  practiceQuestions: Question[];
}

export interface Question {
  id: string;
  prompt: string;
  type: 'mcq' | 'true_false' | 'fill_blank' | 'dictation' | 'speaking' | 'writing';
  options?: string[]; // for mcq
  correctAnswer: string | number; // index or exact text
  explanationVi: string;
  category: 'Grammar' | 'Vocabulary' | 'Listening' | 'Speaking' | 'Reading' | 'Writing' | 'Pronunciation';
  passageEvidence?: string; // used in reading questions
  grade?: GradeLevel;
  unit?: number;
  passage?: string;
  passageId?: string;
  audioPrompt?: string;
  audioUrl?: string;
  targetSentence?: string;
  sampleAnswer?: string;
  minWords?: number;
  maxWords?: number;
}

export interface ListeningLesson {
  id: string;
  title: string;
  difficulty: Difficulty;
  grade: GradeLevel;
  unit: number;
  audioPrompt: string; // The speech synthesis text
  sentences: { id: number; text: string; translationVi: string; timestamp: string }[];
  transcriptVi: string;
  keywords: { word: string; ipa: string; meaningVi: string }[];
  questions: Question[];
}

export interface SpeakingItem {
  id: string;
  title: string;
  targetSentence: string;
  ipa: string;
  stressGuide: string;
  meaningVi: string;
  topic: string;
  type?: 'pronunciation' | 'dialogue' | 'qa';
}

export interface SpeakingLesson {
  id: string;
  title: string;
  grade: GradeLevel;
  unit: number;
  targetSentence: string;
  ipa: string;
  stressGuide: string;
  meaningVi: string;
  samplePrompt: string;
  topic: string;
  items?: SpeakingItem[];
  suggestedAnswers?: string[];
}

export interface ReadingLesson {
  id: string;
  title: string;
  grade: GradeLevel;
  unit: number;
  wordCount: number;
  topic: string;
  passage: string;
  translationVi: string;
  vocabularyHighlights: { word: string; meaningVi: string; ipa: string }[];
  questions: Question[];
}

export interface WritingExercise {
  id: string;
  type: 'sentence_transformation' | 'sentence_reorder' | 'error_correction' | 'sentence_combine';
  prompt: string;
  guideVi?: string;
  sampleAnswer?: string;
}

export interface WritingPrompt {
  id: string;
  title: string;
  grade: GradeLevel;
  unit: number;
  topicPrompt: string;
  minWords: number;
  maxWords: number;
  outlineVi: string[];
  suggestedPhrases: { phrase: string; meaningVi: string }[];
  sampleEssay: string;
  practiceTasks?: WritingExercise[];
}

export interface UnitModule {
  isCustom?: boolean;
  teacherQuestions?: Question[];
  unitNumber: number;
  title: string;
  descriptionVi: string;
  grade: GradeLevel;
  vocabularies: VocabWord[];
  grammar: GrammarTopic;
  listening: ListeningLesson;
  speaking: SpeakingLesson;
  reading: ReadingLesson;
  writing: WritingPrompt;
  quizQuestions: Question[];
}

export interface WritingSubmission {
  id: string;
  studentName: string;
  studentGrade: GradeLevel;
  unitTitle: string;
  topic: string;
  content: string;
  submittedAt: string;
  status: 'pending' | 'graded';
  aiScore?: {
    grammar: number;
    vocab: number;
    coherence: number;
    taskCompletion: number;
    overall: number;
    feedback: string;
    corrections?: { original: string; suggestion: string; explanation: string }[];
    strengths?: string[];
    improvements?: string[];
    modelRevision?: string;
  };
  teacherGrade?: {
    score: number;
    comment: string;
    gradedBy: string;
    gradedAt: string;
  };
}

export interface ExamMatrix {
  id: string;
  title: string;
  durationMinutes: number;
  grade: GradeLevel;
  questionCount: number;
  questions: Question[];
}
