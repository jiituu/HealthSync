"use client"

import Image from "next/image"
import type React from "react"
import { useState, useEffect } from "react"
import { Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import { useGetBlogsQuery, useBookmarkBlogMutation } from "@/redux/api/blogApi"
import type { SingleBlogObject } from "@/types/blog"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { formatDistanceToNow } from "date-fns"
import { useDebounce } from "@/hooks/use-debounce"
import imgg from '@/public/images/doctor.png';


const ITEMS_PER_PAGE = 3

const Blog: React.FC = () => {
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBlog, setSelectedBlog] = useState<SingleBlogObject | null>(null)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const {
    data: blogsData,
    isLoading,
    isError,
    refetch,
  } = useGetBlogsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    tag: debouncedSearchTerm || undefined,
  })

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  const [bookmarkBlog] = useBookmarkBlogMutation()

  const handleBookmarkToggle = async (blogId: string) => {
    try {
      await bookmarkBlog({ blogId }).unwrap()
      toast({ title: "Added to saved articles" })
      refetch()
    } catch (error: any) {
      console.error(error)
      toast({
        variant: "destructive",
        title: error?.data?.message || "Failed to update bookmark",
      })
    }
  }

  const totalPages = blogsData?.data?.totalPages || 1
  const blogs = blogsData?.data?.blogs || []

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

  const handleClearSearch = () => {
    setSearchTerm("")
  }

  const handleReadMore = (blog: SingleBlogObject) => {
    setSelectedBlog(blog)
  }

  return (
    <div className="mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Articles</h1>
        <p className="text-muted-foreground mb-6">Discover the latest insights and stories from our community</p>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>

        {debouncedSearchTerm && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {blogs.length === 0 ? "No results found for " : `Showing results for `}
              <span className="font-medium text-foreground">{debouncedSearchTerm}</span>
              <span className="text-muted-foreground"> in title and content</span>
            </p>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <Card className="p-8 text-center bg-red-50 border-red-200">
          <h3 className="text-lg font-medium mb-2">Unable to load articles</h3>
          <p className="text-muted-foreground mb-4">
            There was a problem loading the articles. Please try again later.
          </p>
          <Button onClick={() => refetch()}>Retry</Button>
        </Card>
      ) : blogs.length === 0 ? (
        <Card className="p-8 text-center bg-muted/50">
          <h3 className="text-lg font-medium mb-2">No articles found</h3>
          <p className="text-muted-foreground">
            {debouncedSearchTerm
              ? "Try adjusting your search terms or browse all articles."
              : "There are no articles available at the moment."}
          </p>
          {debouncedSearchTerm && (
            <Button variant="outline" className="mt-4" onClick={handleClearSearch}>
              Clear search
            </Button>
          )}
        </Card>
      ) : (
        <>
          <div className="space-y-6">
            {blogs.map((blog: SingleBlogObject) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onBookmarkToggle={handleBookmarkToggle}
                onReadMore={handleReadMore}
              />
            ))}
          </div>

          <div className="flex justify-between items-center mt-8">
            <div className="text-sm text-muted-foreground">
              Showing page {currentPage} of {totalPages}
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
        </>
      )}

      <BlogDetailDialog blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
    </div>
  )
}

interface BlogCardProps {
  blog: SingleBlogObject
  onBookmarkToggle: (blogId: string) => void
  onReadMore: (blog: SingleBlogObject) => void
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onBookmarkToggle, onReadMore }) => {
  // Assuming blog has a createdAt field, otherwise use a placeholder
  const publishedDate = blog.createdAt ? formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true }) : "Recently"
  const authorName = blog.author ? `${blog.author.firstname} ${blog.author.lastname || ''}`.trim() : "Anonymous";

  return (
    <Card className="overflow-hidden transition-all shadow-md bg-[#fff4e3]">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Image
              src={imgg}
              alt={`${authorName} profile`}
              className="rounded-full object-cover border w-16 h-16"
              width={48}
              height={48}
            />
            <div>
              <h3 className="font-semibold">{authorName}</h3>
              <p className="text-xs text-muted-foreground">{publishedDate}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBookmarkToggle(blog._id)}
            className="text-muted-foreground hover:text-primary"
            aria-label={blog.isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {blog.isBookmarked ? <BookmarkCheck className="h-5 w-5 text-primary" /> : <Bookmark className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold mb-1">{blog.title}</h2>
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
  const authorName = blog?.author ? `${blog.author.firstname} ${blog.author.lastname || ''}`.trim() : "Anonymous";
  return (
    <Dialog open={!!blog} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        {blog && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={imgg}
                  alt={`${authorName} profile`}
                  className="rounded-full object-cover border w-16 h-16"
                  width={48}
                  height={48}
                />
                <div>
                  <DialogTitle className="text-left">{authorName}</DialogTitle>
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

export default Blog
