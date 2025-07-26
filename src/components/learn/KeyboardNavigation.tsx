'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface KeyboardNavigationProps {
  nextLessonId?: string;
  previousLessonId?: string;
  onMarkComplete?: () => void;
}

export function KeyboardNavigation({ 
  nextLessonId, 
  previousLessonId, 
  onMarkComplete 
}: KeyboardNavigationProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle keyboard shortcuts when not typing in an input
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Handle keyboard shortcuts
      if (event.key === 'ArrowRight' && nextLessonId) {
        event.preventDefault();
        router.push(`/learn/lesson/${nextLessonId}`);
      } else if (event.key === 'ArrowLeft' && previousLessonId) {
        event.preventDefault();
        router.push(`/learn/lesson/${previousLessonId}`);
      } else if (event.key === 'c' && event.ctrlKey && onMarkComplete) {
        event.preventDefault();
        onMarkComplete();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextLessonId, previousLessonId, onMarkComplete, router]);

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 text-gray-700 text-xs px-3 py-2 rounded-lg shadow-lg opacity-75 hover:opacity-100 transition-opacity">
      <div className="space-y-1">
        <div>← → Navigate lessons</div>
        <div>Ctrl+C Mark complete</div>
      </div>
    </div>
  );
}
