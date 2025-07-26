'use client';

import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';

interface ProgressDashboardProps {
  modules: any[];
}

export function ProgressDashboard({ modules }: ProgressDashboardProps) {
  const { getProgressStats, isLoaded } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) {
    return (
      <div className="p-4 border-b border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-2 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const stats = getProgressStats(modules);

  return (
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <h3 className="font-semibold text-gray-900 mb-3">Your Progress</h3>
      
      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Lessons Completed</span>
          <span>{stats.completedLessons}/{stats.totalLessons}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${stats.completionPercentage}%` }}
          ></div>
        </div>
        <div className="text-center mt-1">
          <span className="text-sm font-medium text-primary">
            {stats.completionPercentage}% Complete
          </span>
        </div>
      </div>

      {/* Module Progress */}
      <div className="space-y-2">
        {modules.map((module) => {
          const moduleCompleted = module.lessons.filter((lesson: any) => 
            stats.completedLessonIds.has(lesson.id)
          ).length;
          const moduleTotal = module.lessons.length;
          const modulePercentage = moduleTotal > 0 ? Math.round((moduleCompleted / moduleTotal) * 100) : 0;

          return (
            <div key={module.id} className="text-xs">
              <div className="flex justify-between text-gray-600 mb-1">
                <span className="truncate">{module.title}</span>
                <span>{moduleCompleted}/{moduleTotal}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-primary h-1 rounded-full transition-all duration-300"
                  style={{ width: `${modulePercentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievement */}
      {stats.completionPercentage === 100 && (
        <div className="mt-3 p-2 bg-green-100 rounded-lg text-center">
          <span className="text-green-800 text-sm font-medium">
            🎉 Congratulations! You've completed all lessons!
          </span>
        </div>
      )}
    </div>
  );
}
