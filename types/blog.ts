export interface BlogPost {
  _id: string;
  author: string;
  title: string;
  content: string;
  tags?: string[];
  publishedAt: string;
  doctor?: {
    name: string;
    specialty?: string;
  };
  isBookmarked: boolean;
}

export interface SingleBlogObject {
  _id: string;
  author: string;
  title: string;
  content: string;
  tags?: string[];
  publishedAt: string;
  thumbnail?: string;
  published?: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BlogResponse {
  success: boolean;
  data: {
    blogs: SingleBlogObject[];
    totalCount?: number; // Added
    currentPage?: number; // Added
    totalPages?: number; // Added
  };
}
export interface CreateBlogPostPayload {
  author: string;
  title: string;
  content: string;
  tags?: string[];
  thumbnail?: string;
  published?: boolean;
  publishedAt?: string;
}
// types/blog.ts
