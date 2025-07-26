'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LearnPage() {
  const router = useRouter();

  useEffect(() => {
    // Fetch the first lesson and redirect to it
    fetch('/api/modules')
      .then(res => res.json())
      .then(modules => {
        if (modules.length > 0 && modules[0].lessons.length > 0) {
          const firstLesson = modules[0].lessons[0];
          router.replace(`/learn/lesson/${firstLesson.id}`);
        }
      })
      .catch(error => {
        console.error('Error loading modules:', error);
      });
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your learning journey...</p>
      </div>
    </div>
  );
}
