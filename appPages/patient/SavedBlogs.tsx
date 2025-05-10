"use client"

import Image from "next/image"
import type React from "react"
import { useState } from "react"
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import { useGetBookmarkedBlogsQuery, useRemoveBookmarkMutation } from "@/redux/api/blogApi"
import  { SingleBlogObject } from "@/types/blog"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { formatDistanceToNow } from "date-fns"
import imgg from '@/public/images/doctor.png';
import { FaBookmark } from "react-icons/fa"


const ITEMS_PER_PAGE = 5

const SavedBlogs: React.FC = () => {
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBlog, setSelectedBlog] = useState<SingleBlogObject | null>(null)

  const { data: savedBlogsData, isLoading, isError, refetch } = useGetBookmarkedBlogsQuery()

  const [removeBookmark] = useRemoveBookmarkMutation()

  const handleRemoveBookmark = async (blogId: string) => {
    try {
      await removeBookmark({ blogId }).unwrap()
      toast({ title: "Removed from saved articles" })
      refetch()
    } catch (error: any) {
      console.error("Failed to remove bookmark:", error)
      toast({
        variant: "destructive",
        title: error?.data?.message || "Failed to remove bookmark",
      })
    }
  }

  const handleReadMore = (blog: SingleBlogObject) => {
    setSelectedBlog(blog)
  }

  // If no data is available yet, use empty array
  const savedBlogs = savedBlogsData?.data || []

  // Calculate pagination
  const totalItems = savedBlogs.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentBlogs = savedBlogs.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Saved Articles</h1>
        <p className="text-muted-foreground">Articles you have bookmarked for later reading</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <Card className="p-8 text-center bg-red-50 border-red-200">
          <h3 className="text-lg font-medium mb-2">Unable to load saved articles</h3>
          <p className="text-muted-foreground mb-4">
            There was a problem loading your saved articles. Please try again later.
          </p>
          <Button onClick={() => refetch()}>Retry</Button>
        </Card>
      ) : savedBlogs.length === 0 ? (
        <Card className="p-8 text-center bg-muted/50">
          <div className="flex justify-center mb-4 text-muted-foreground">
            <BookOpen className="h-16 w-16" />
          </div>
          <h3 className="text-xl font-medium mb-2">No Saved Articles Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            You have not bookmarked any articles. Click the bookmark icon on articles to save them here for later
            reading.
          </p>
          {/* <Button variant="outline">
            <a href="/blog">Browse Articles</a>
          </Button> */}
        </Card>
      ) : (
        <>
          <div className="space-y-6">
            {currentBlogs.map((blog: SingleBlogObject) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onRemoveBookmark={handleRemoveBookmark}
                onReadMore={handleReadMore}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-8">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} saved articles
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage <= 1}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage >= totalPages}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <BlogDetailDialog blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
    </div>
  )
}

interface BlogCardProps {
  blog: SingleBlogObject
  onRemoveBookmark: (blogId: string) => void
  onReadMore: (blog: SingleBlogObject) => void
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onRemoveBookmark, onReadMore }) => {
  // Assuming blog has a createdAt field, otherwise use a placeholder
  const publishedDate = blog.createdAt ? formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true }) : "Recently"

  return (
    <Card className="overflow-hidden transition-all shadow-md bg-[#fff4e3]">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Image
              src={imgg}
              alt={`${blog.author.firstname} profile`}
              className="rounded-full object-cover border w-16 h-16"
              width={48}
              height={48}
            />
            <div>
              <h3 className="font-semibold">{blog.author.firstname}</h3>
              <p className="text-xs text-muted-foreground">{publishedDate}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveBookmark(blog._id)}
            className="text-primary hover:text-primary/80"
            aria-label="Remove bookmark"
          >
            <FaBookmark className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold mb-3">{blog.title}</h2>
        <p className="text-muted-foreground line-clamp-3">{blog.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 pt-2 pb-4">
        <div className="flex flex-wrap gap-2">
          {blog.tags?.map((tag, index) => (
            <Badge key={index} className="font-normal bg-secondaryColor">
              {tag}
            </Badge>
          ))}
          {!blog.tags?.length && (
            <Badge className="font-normal bg-secondaryColor">
              General
            </Badge>
          )}
        </div>
        <Button variant="link" className="p-0 h-auto text-primary" onClick={() => onReadMore(blog)}>
          Read more
        </Button>
      </CardFooter>
    </Card>
  )
}

interface BlogDetailDialogProps {
  blog: SingleBlogObject | null
  onClose: () => void
}

const BlogDetailDialog: React.FC<BlogDetailDialogProps> = ({ blog, onClose }) => {
  return (
    <Dialog open={!!blog} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        {blog && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <Image
                  alt={`${blog.author} profile`}
                  className="rounded-full object-cover border w-16 h-16"
                  width={48}
                  height={48}
                  src={imgg}
                />
                <div>
                  <DialogTitle className="text-left">{blog.author.firstname}</DialogTitle>
                  <DialogDescription>
                    {blog.createdAt ? formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true }) : "Recently"}
                  </DialogDescription>
                </div>
              </div>
              <h2 className="text-2xl font-bold mt-4 mb-2 text-left">{blog.title}</h2>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>{blog.content}</p>

                {/* If the blog has sections or additional content, you can add it here */}
                {blog.sections?.map((section: { title: string; content: string }, index: number) => (
                  <div key={index} className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                    <p>{section.content}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {blog.tags?.map((tag, index) => (
                  <Badge key={index} className="font-normal">
                    {tag}
                  </Badge>
                ))}
                {!blog.tags?.length && (
                  <Badge className="font-normal text-muted-foreground bg-secondaryColor">
                    General
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

const BlogCardSkeleton: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Skeleton className="h-5 w-16 rounded-full mr-2" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </CardFooter>
    </Card>
  )
}

export default SavedBlogs
