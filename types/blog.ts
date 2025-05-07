export interface BlogPost {
  sections: any;
  createdAt: string;
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
  sections: any;
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
  isBookmarked: boolean;
  __v: number;
}

export interface BlogResponse {
  success: boolean;
  data: SingleBlogObject[];
}


export interface GetBlogsResponse {
  success: boolean;
  data: {
    blogs: SingleBlogObject[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
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

