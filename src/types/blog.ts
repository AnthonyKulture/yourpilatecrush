export interface Author {
  name: string;
  avatarUrl?: string;
  role?: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // Format ISO 8601
  updatedAt?: string;
  author: Author;
  category: Category;
  tags: string[];
  readingTime: number; // en minutes
  wordCount: number;
  coverImage: string;
  content: string; // MDX ou Markdown brut, ou HTML
}
