import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store"; // Adjust the import path as necessary
import type { BlogResponse, CreateBlogPostPayload, GetBlogsResponse } from '@/types/blog';

export const blogApi = createApi({
  reducerPath: "blogApi", // Unique key for this API slice
  baseQuery: fetchBaseQuery({
    baseUrl: "https://healthsync-backend-bfrv.onrender.com/api",
    credentials: "include",

    }),
  tagTypes: ["BlogPost"], // For cache invalidation
  endpoints: (builder) => ({
    // Fetch all blogs (with optional filters and pagination)
    getBlogs: builder.query<GetBlogsResponse, { author_id?: string; tag?: string; page?: number; limit?: number }>({
      query: (params) => ({
      url: "/blogs",
      method: "GET",
      params, 
      }),
      providesTags: ['BlogPost'],  
    }),

// Fetch bookmarked blogs for current user
getBookmarkedBlogs: builder.query<BlogResponse, void>({
  query: () => ({
    url: "/blogs/bookmarks/me",
    method: "GET",
  }),
  providesTags: ['BlogPost'],
}),

// Bookmark a blog
bookmarkBlog: builder.mutation<void, { blogId: string }>({
  query: ({ blogId }) => ({
    url: `/blogs/${blogId}/bookmarks/me`,
    method: 'PATCH',
  }),
  invalidatesTags: ['BlogPost'],
}),
// Remove bookmark from a blog
removeBookmark: builder.mutation<void, { blogId: string }>({
  query: ({ blogId }) => ({
    url: `/blogs/${blogId}/bookmarks/me`,
    method: 'DELETE',
  }),
  invalidatesTags: ['BlogPost'],
}),
    // Create a blog post
    createBlogPost: builder.mutation<BlogPost, CreateBlogPostPayload>({
        query: (newPost) => {
          return {
            url: "/blogs",
            method: "POST",
            body: {
                author: newPost.author,
                title: newPost.title,
                content: newPost.content,
                tags: newPost.tags || [], // Default empty array if not provided
                thumbnail: newPost.thumbnail, // Optional
                published: newPost.published ?? true, // Default to true
                publishedAt: newPost.publishedAt || new Date().toISOString()
            },
          }
        },
        invalidatesTags: ["BlogPost"],
      }),

    // Delete a blog post
    deleteBlogPost: builder.mutation<void, string>({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BlogPost"],
    }),
  }),
});

// Types
interface BlogPost {
  id: string;
  author: string; // Doctor ID
  title: string;
  content: string;
  tags?: string[];
  publishedAt: string;
}



// Export hooks
export const {
  useGetBlogsQuery,
  useCreateBlogPostMutation,
  useDeleteBlogPostMutation,
  useGetBookmarkedBlogsQuery,
  useBookmarkBlogMutation,
  useRemoveBookmarkMutation,
} = blogApi;