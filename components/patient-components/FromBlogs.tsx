import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { useGetBlogsQuery } from '@/redux/api/blogApi'
import { format } from 'date-fns'

const FromBlogs = () => {
  // Fetch the 3 most recent blogs
  const { data: blogsData, isLoading, isError } = useGetBlogsQuery({
    page: 1,
    limit: 3,
    sort: '-publishedAt' // Ensure newest blogs come first
  })

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex flex-col gap-4 basis-3/5">
        <div className="flex items-center justify-between">
          <h1 className='font-bold'>From Blogs</h1>
          <Link href='/patient/blog' className='text-primaryColor underline'>View all</Link>
        </div>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="shadow-md rounded-xl bg-white border border-gray-200">
            <div className="animate-pulse">
              <CardHeader className="p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 flex flex-col gap-4 basis-3/5">
        <div className="flex items-center justify-between">
          <h1 className='font-bold'>From Blogs</h1>
          <Link href='/patient/blog' className='text-primaryColor underline'>View all</Link>
        </div>
        <div className="text-center py-8 text-red-500">
          Failed to load blogs. Please try again later.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4 basis-3/5">
      <div className="flex items-center justify-between">
        <h1 className='font-bold'>From Blogs</h1>
        <Link href='/patient/blog' className='text-primaryColor underline'>View all</Link>
      </div>

      {blogsData?.data.blogs.map((blog) => (
        <Card key={blog._id} className="shadow-md rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src="/images/default-avatar.png"
                  alt={`${blog.author.firstname} ${blog.author.lastname}`}
                />
                <AvatarFallback>
                  {blog.author.firstname[0]}{blog.author.lastname[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-sm font-semibold text-gray-800">
                  {blog.author.firstname} {blog.author.lastname}
                </h2>
                <p className="text-xs text-gray-500">
                  {format(new Date(blog.publishedAt), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <h3 className="text-md font-medium text-gray-900 mb-2">{blog.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs text-green-600">
                {blog.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
              {blog.content}
            </p>
            <Link
              href={`/patient/blog`}
              className="text-primaryColor text-xs font-medium hover:underline"
            >
              Read full article →
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default FromBlogs