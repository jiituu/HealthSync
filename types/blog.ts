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
  }
  
  export interface BlogResponse {
    data: {
      blogs: BlogPost[];
      totalCount: number;
    };
    success: boolean;
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
  