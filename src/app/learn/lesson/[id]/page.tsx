'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/Button';
import { useProgress } from '@/hooks/useProgress';
import { KeyboardNavigation } from '@/components/learn/KeyboardNavigation';
import { TableOfContents } from '@/components/learn/TableOfContents';
import { calculateReadingTime } from '@/utils/readingTime';

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  content: string;
  order: number;
  module: {
    id: string;
    title: string;
    tier: number;
  };
  challenges: any[];
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [allModules, setAllModules] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const { isLessonCompleted, markLessonComplete, isLoaded } = useProgress();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (params.id) {
      // Load lesson
      fetch(`/api/lessons/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setLesson(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading lesson:', error);
          setLoading(false);
        });

      // Load all modules for navigation
      fetch('/api/modules')
        .then(res => res.json())
        .then(setAllModules)
        .catch(console.error);
    }
  }, [params.id]);

  const handleMarkComplete = () => {
    if (!lesson) return;
    markLessonComplete(lesson.id);
  };

  const getNextLesson = () => {
    if (!lesson || !allModules.length) return null;
    
    // Find current module and lesson
    const currentModule = allModules.find(m => m.id === lesson.module.id);
    if (!currentModule) return null;
    
    const currentLessonIndex = currentModule.lessons.findIndex((l: any) => l.id === lesson.id);
    
    // Try next lesson in same module
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      return currentModule.lessons[currentLessonIndex + 1];
    }
    
    // Try first lesson of next module
    const currentModuleIndex = allModules.findIndex(m => m.id === lesson.module.id);
    if (currentModuleIndex < allModules.length - 1) {
      const nextModule = allModules[currentModuleIndex + 1];
      return nextModule.lessons[0] || null;
    }
    
    return null;
  };

  const getPreviousLesson = () => {
    if (!lesson || !allModules.length) return null;
    
    // Find current module and lesson
    const currentModule = allModules.find(m => m.id === lesson.module.id);
    if (!currentModule) return null;
    
    const currentLessonIndex = currentModule.lessons.findIndex((l: any) => l.id === lesson.id);
    
    // Try previous lesson in same module
    if (currentLessonIndex > 0) {
      return currentModule.lessons[currentLessonIndex - 1];
    }
    
    // Try last lesson of previous module
    const currentModuleIndex = allModules.findIndex(m => m.id === lesson.module.id);
    if (currentModuleIndex > 0) {
      const prevModule = allModules[currentModuleIndex - 1];
      return prevModule.lessons[prevModule.lessons.length - 1] || null;
    }
    
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Lesson Not Found</h1>
          <p className="text-gray-600 mb-4">The lesson you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/learn')}>
            Back to Learning
          </Button>
        </div>
      </div>
    );
  }

  const nextLesson = getNextLesson();
  const previousLesson = getPreviousLesson();
  const isCompleted = mounted && isLoaded && lesson ? isLessonCompleted(lesson.id) : false;

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <span>{lesson.module.title}</span>
          <span>•</span>
          <span>Tier {lesson.module.tier}</span>
          <span>•</span>
          <span>{calculateReadingTime(lesson.content)}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
        {lesson.description && (
          <p className="text-lg text-gray-600">{lesson.description}</p>
        )}
      </div>

      {/* Table of Contents */}
      <TableOfContents content={lesson.content} />

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => {
              const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return <h1 id={id} className="scroll-mt-20">{children}</h1>;
            },
            h2: ({ children }) => {
              const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return <h2 id={id} className="scroll-mt-20">{children}</h2>;
            },
            h3: ({ children }) => {
              const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return <h3 id={id} className="scroll-mt-20">{children}</h3>;
            },
            h4: ({ children }) => {
              const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return <h4 id={id} className="scroll-mt-20">{children}</h4>;
            },
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <pre className="bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-lg overflow-x-auto">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm text-gray-800" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {lesson.content}
        </ReactMarkdown>
      </div>

      {/* Actions */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-center justify-between">
          <div>
            {previousLesson && (
              <Button 
                variant="outline" 
                onClick={() => router.push(`/learn/lesson/${previousLesson.id}`)}
              >
                ← Previous: {previousLesson.title}
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {!isCompleted && (
              <Button onClick={handleMarkComplete}>
                Mark as Complete
              </Button>
            )}
            
            {isCompleted && (
              <div className="flex items-center space-x-2 text-green-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Completed</span>
              </div>
            )}
            
            {nextLesson && (
              <Button onClick={() => router.push(`/learn/lesson/${nextLesson.id}`)}>
                Next: {nextLesson.title} →
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Keyboard Navigation */}
      <KeyboardNavigation
        nextLessonId={nextLesson?.id}
        previousLessonId={previousLesson?.id}
        onMarkComplete={!isCompleted ? handleMarkComplete : undefined}
      />
    </div>
  );
}
