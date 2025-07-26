'use client';

import { useState, useEffect } from 'react';

export interface ProgressStats {
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  completedLessonIds: Set<string>;
}

export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Load completed lessons from localStorage
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      try {
        const lessonIds = JSON.parse(saved);
        setCompletedLessons(new Set(lessonIds));
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const markLessonComplete = (lessonId: string) => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonId);
    setCompletedLessons(newCompleted);

    if (typeof window !== 'undefined') {
      localStorage.setItem('completedLessons', JSON.stringify([...newCompleted]));
    }
  };

  const markLessonIncomplete = (lessonId: string) => {
    const newCompleted = new Set(completedLessons);
    newCompleted.delete(lessonId);
    setCompletedLessons(newCompleted);

    if (typeof window !== 'undefined') {
      localStorage.setItem('completedLessons', JSON.stringify([...newCompleted]));
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.has(lessonId);
  };

  const getProgressStats = (modules: any[]): ProgressStats => {
    const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0);
    const completedCount = completedLessons.size;
    
    return {
      totalLessons,
      completedLessons: completedCount,
      completionPercentage: totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0,
      completedLessonIds: completedLessons,
    };
  };

  const resetProgress = () => {
    setCompletedLessons(new Set());

    if (typeof window !== 'undefined') {
      localStorage.removeItem('completedLessons');
    }
  };

  return {
    completedLessons,
    isLoaded,
    markLessonComplete,
    markLessonIncomplete,
    isLessonCompleted,
    getProgressStats,
    resetProgress,
  };
}
