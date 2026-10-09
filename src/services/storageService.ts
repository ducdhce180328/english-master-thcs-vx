import { UserProfile, GradeLevel, Role, VocabWord, WritingSubmission, StudentRecord, ClassRoom } from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'em_user_profile',
  COMPLETED_LESSONS: 'em_completed_lessons',
  SAVED_VOCAB: 'em_saved_vocab',
  WRITING_SUBS: 'em_writing_subs',
  QUIZ_HISTORY: 'em_quiz_history',
  DAILY_STATS: 'em_daily_stats',
  ACTIVE_CLASS_ID: 'em_active_class_id',
  LOCAL_CLASSES: 'em_local_classes'
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'std-cls-6a1-1',
  name: 'Dương Hữu Quy',
  role: 'student',
  grade: 6,
  textbook: 'Global Success',
  classId: 'cls-6a1',
  className: 'Lớp 6A1 - Global Success',
  rollNumber: 1,
  studentCode: 'HS-601',
  gender: 'male',
  xp: 450,
  streak: 5,
  level: 3,
  coins: 120,
  studyTimeMinutes: 85,
  lastActive: new Date().toISOString(),
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

export class StorageService {
  public getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.role === 'admin') {
          parsed.role = 'teacher';
          this.saveUserProfile(parsed);
        }
        if (parsed.role === 'parent') {
          parsed.role = 'student';
          this.saveUserProfile(parsed);
        }
        if (parsed.name === 'Nguyễn Văn An' || !parsed.name) {
          parsed.name = 'Dương Hữu Quy';
          parsed.classId = parsed.classId || 'cls-6a1';
          parsed.className = parsed.className || 'Lớp 6A1 - Global Success';
          parsed.rollNumber = parsed.rollNumber || 1;
          parsed.studentCode = parsed.studentCode || 'HS-601';
          this.saveUserProfile(parsed);
        }
        return parsed;
      }
    } catch (e) {
      // ignore
    }
    return DEFAULT_PROFILE;
  }

  public saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Could not save user profile to localStorage', e);
    }
  }

  public switchStudent(student: StudentRecord): UserProfile {
    const current = this.getUserProfile();
    const updated: UserProfile = {
      ...current,
      id: student.id,
      name: student.name,
      grade: student.grade,
      classId: student.classId,
      className: student.className,
      rollNumber: student.rollNumber,
      studentCode: student.studentCode,
      gender: student.gender,
      xp: student.xp || 150,
      streak: student.streak || 1,
      level: student.level || 1,
      studyTimeMinutes: student.studyTimeMinutes || 30,
      avatar: student.avatar || current.avatar
    };
    this.saveUserProfile(updated);
    return updated;
  }

  public async fetchClasses(): Promise<ClassRoom[]> {
    try {
      const res = await fetch('/api/db');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.classes)) {
          localStorage.setItem(STORAGE_KEYS.LOCAL_CLASSES, JSON.stringify(data.classes));
          return data.classes;
        }
      }
    } catch (err) {
      console.warn('Could not fetch classes from server, using local fallback', err);
    }
    try {
      const local = localStorage.getItem(STORAGE_KEYS.LOCAL_CLASSES);
      if (local) return JSON.parse(local);
    } catch {}
    return [];
  }

  public async syncStudentProgress(xpGained: number): Promise<void> {
    const profile = this.getUserProfile();
    if (profile.classId && profile.id) {
      try {
        await fetch(`/api/db/classes/${profile.classId}/students/${profile.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            xp: profile.xp,
            streak: profile.streak,
            level: profile.level,
            studyTimeMinutes: profile.studyTimeMinutes
          })
        });
      } catch {}
    }
  }

  public updateXP(amount: number): UserProfile {
    const profile = this.getUserProfile();
    profile.xp += amount;
    profile.coins += Math.floor(amount / 5);
    // Level calculation: every 200 XP = 1 level
    profile.level = Math.floor(profile.xp / 200) + 1;
    this.saveUserProfile(profile);
    this.syncStudentProgress(amount);
    return profile;
  }

  public addStudyTime(minutes: number): UserProfile {
    const profile = this.getUserProfile();
    profile.studyTimeMinutes += minutes;
    this.saveUserProfile(profile);
    return profile;
  }

  public setGrade(grade: GradeLevel): UserProfile {
    const profile = this.getUserProfile();
    profile.grade = grade;
    this.saveUserProfile(profile);
    return profile;
  }

  public setRole(role: Role): UserProfile {
    const profile = this.getUserProfile();
    profile.role = role;
    this.saveUserProfile(profile);
    return profile;
  }

  // Saved / Starred Vocab for Flashcards
  public getSavedVocab(): VocabWord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_VOCAB);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return [];
  }

  public saveVocabWord(word: VocabWord): void {
    const list = this.getSavedVocab();
    const existingIndex = list.findIndex((w) => w.id === word.id || w.word.toLowerCase() === word.word.toLowerCase());
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...word };
    } else {
      list.unshift({ ...word, srsLevel: 1, nextReviewDate: new Date().toISOString() });
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_VOCAB, JSON.stringify(list));
  }

  public removeSavedVocab(wordId: string): void {
    const list = this.getSavedVocab().filter((w) => w.id !== wordId);
    localStorage.setItem(STORAGE_KEYS.SAVED_VOCAB, JSON.stringify(list));
  }

  // Completed lessons tracking
  public getCompletedLessons(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return ['v6-1', 'g6-1'];
  }

  public markLessonCompleted(lessonId: string): void {
    const list = this.getCompletedLessons();
    if (!list.includes(lessonId)) {
      list.push(lessonId);
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(list));
      this.updateXP(50);
    }
  }

  // Quiz history
  public getQuizHistory(): any[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return [];
  }

  public saveQuizAttempt(attempt: {
    id: string;
    title: string;
    score: number;
    maxScore: number;
    percentage: number;
    timeTakenSeconds: number;
    completedAt: string;
    grade: GradeLevel;
  }): void {
    const history = this.getQuizHistory();
    history.unshift(attempt);
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history));
    this.updateXP(Math.round(attempt.percentage * 0.8));
  }
}

export const storageService = new StorageService();
