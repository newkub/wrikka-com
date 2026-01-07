export const useReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  
  return {
    readingTime,
    wordCount: words,
    formattedReadingTime: readingTime === 1 ? '1 min read' : `${readingTime} min read`,
  };
};
