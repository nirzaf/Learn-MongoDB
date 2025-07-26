/**
 * Calculate estimated reading time for text content
 * Based on average reading speed of 200 words per minute
 */
export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  if (minutes === 1) {
    return '1 min read';
  }
  
  return `${minutes} min read`;
}

/**
 * Get word count from text
 */
export function getWordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}
