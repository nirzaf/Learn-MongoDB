'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgress } from '@/hooks/useProgress';
import { ProgressDashboard } from './ProgressDashboard';

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  order: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  tier: number;
  order: number;
  lessons: Lesson[];
}

export function Sidebar() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { isLessonCompleted, isLoaded } = useProgress();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Load modules
    fetch('/api/modules')
      .then(res => res.json())
      .then(data => {
        setModules(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading modules:', error);
        setLoading(false);
      });
  }, []);

  const getTierColor = (tier: number) => {
    const colors = {
      1: 'bg-green-100 text-green-800',
      2: 'bg-blue-100 text-blue-800',
      3: 'bg-purple-100 text-purple-800',
      4: 'bg-red-100 text-red-800',
    };
    return colors[tier as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary-dark">
          <span className="text-xl font-bold">📚</span>
          <span className="font-semibold">Learn MongoDB</span>
        </Link>
      </div>

      {/* Progress Dashboard */}
      <ProgressDashboard modules={modules} />

      {/* Modules */}
      <div className="p-4">
        {modules.map((module) => (
          <div key={module.id} className="mb-6">
            {/* Module Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{module.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTierColor(module.tier)}`}>
                Tier {module.tier}
              </span>
            </div>
            
            {/* Module Description */}
            <p className="text-sm text-gray-600 mb-3">{module.description}</p>
            
            {/* Lessons */}
            <div className="space-y-1">
              {module.lessons.map((lesson) => {
                const isActive = pathname === `/learn/lesson/${lesson.id}`;
                const isCompleted = mounted && isLoaded ? isLessonCompleted(lesson.id) : false;
                
                return (
                  <Link
                    key={lesson.id}
                    href={`/learn/lesson/${lesson.id}`}
                    className={`
                      flex items-center space-x-3 p-3 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-primary text-white' 
                        : 'hover:bg-gray-50 text-gray-700'
                      }
                    `}
                  >
                    {/* Completion Status */}
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${isCompleted 
                        ? 'bg-green-500 border-green-500' 
                        : isActive 
                          ? 'border-white' 
                          : 'border-gray-300'
                      }
                    `}>
                      {isCompleted && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    
                    {/* Lesson Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{lesson.title}</div>
                      {lesson.description && (
                        <div className={`text-sm truncate ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                          {lesson.description}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
