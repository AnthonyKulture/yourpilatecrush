/**
 * Calcule le temps de lecture basé sur le nombre de mots.
 * Le standard est d'environ 200 mots par minute.
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200): { minutes: number; wordCount: number } {
  // Nettoyer le contenu s'il s'agit de HTML ou Markdown pour ne garder que le texte
  const textContent = content.replace(/(<([^>]+)>)/gi, "").replace(/#+\s/g, "");
  
  const words = textContent.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return {
    minutes: Math.max(1, minutes), // Minimum 1 minute
    wordCount
  };
}
