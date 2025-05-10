"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Search, Trash2, Calendar, User, Clock, Filter, Eye } from "lucide-react"
import { useGetBlogsQuery, useDeleteBlogPostMutation } from "@/redux/api/blogApi"
import type { SingleBlogObject } from "@/types/blog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

const ContentManagement = () => {
  const ITEMS_PER_PAGE = 3
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [blogToDeleteId, setBlogToDeleteId] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState("newest")
  const [selectedBlog, setSelectedBlog] = useState<SingleBlogObject | null>(null)

  const { toast } = useToast()

  const {
    data: apiResponse,
    isLoading,
    isError,
    refetch,
  } = useGetBlogsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  })

  const [deleteBlogPost, { isLoading: isDeleting, isError: deleteError }] = useDeleteBlogPostMutation()

  const blogsFromAPI: SingleBlogObject[] = apiResponse?.data?.blogs || []

  const filteredBlogs = useMemo(() => {
    const filtered = blogsFromAPI.filter(
      (blog) =>
        blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return filtered.sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        case "a-z":
          return a.title.localeCompare(b.title)
        case "z-a":
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })
  }, [blogsFromAPI, searchQuery, sortOrder])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleDeleteConfirm = async () => {
    if (blogToDeleteId) {
      const blogBeingDeleted = filteredBlogs.find(b => b._id === blogToDeleteId);
      const title = blogBeingDeleted ? blogBeingDeleted.title : null;

      try {
        await deleteBlogPost(blogToDeleteId).unwrap()
        setBlogToDeleteId(null)
        toast({
          title: "Blog Deleted Successfully",
          description: title
            ? `The blog post titled "${title}" has been permanently removed.`
            : "The blog post has been permanently removed.",
          variant: "default",
        })
        refetch() // Refetch the blog list
      } catch (err) {
        console.error("Failed to delete blog:", err)
        toast({
          title: "Failed to Delete Blog",
          description: title
            ? `Could not delete the blog post titled "${title}". Please try again.`
            : "There was an error deleting the blog post. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const totalPages = apiResponse?.data?.totalPages || 1

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleViewDetails = (blogId: string) => {
    const blog = blogsFromAPI.find((blog) => blog._id === blogId)
    if (blog) {
      setSelectedBlog(blog)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Blog</h1>
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full md:w-96">
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-32 hidden md:block" />
        </div>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-28" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6 min-h-[50vh] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="bg-red-100 text-red-600 p-3 rounded-full inline-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium">Error Loading Blogs</h3>
              <p className="text-gray-500 text-sm">
                We could not load the blog posts. Please try again later or contact support if the problem persists.
              </p>
              <Button onClick={() => refetch()} className="mt-2">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Manage Blog</h1>
        <p className="text-gray-500 mb-6">View, search, and manage blog posts</p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search blogs by title or content..."
              className="pl-10 bg-white focus:outline-none"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="a-z">Title A-Z</SelectItem>
                <SelectItem value="z-a">Title Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <Card key={blog._id} className="overflow-hidden transition-all hover:shadow-md bg-[#fbffff]">
                <CardHeader className="p-4 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{blog.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="flex items-center">
                            <User className="mr-1 h-3 w-3" />
                            <span className="font-semibold">By: Dr.{blog.author.firstname} {blog.author.lastname}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{blog.content}</p>
                  <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-4 gap-y-2">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(blog.publishedAt)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatTime(blog.publishedAt)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={() => handleViewDetails(blog._id)}
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center"
                        onClick={() => setBlogToDeleteId(blog._id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    {blogToDeleteId === blog._id && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete the blog post titled &quot;
                            {blog.title}&quot;.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4">
                          <DialogClose asChild>
                            <Button variant="outline" onClick={() => setBlogToDeleteId(null)}>
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Confirm Delete"}
                          </Button>
                        </DialogFooter>
                        {deleteError && <p className="text-red-500 text-sm mt-2">Failed to delete blog.</p>}
                      </DialogContent>
                    )}
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white border-dashed border-2 p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {searchQuery ? "No matching blogs found" : "No blogs available"}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchQuery
                  ? "Try adjusting your search terms or clear the search to see all blogs."
                  : "There are no blog posts available at the moment. Check back later or create a new post."}
              </p>
              {searchQuery && (
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              )}
            </div>
          </Card>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage > 1 ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <PaginationItem key={pageIndex}>
                    <PaginationLink
                      isActive={currentPage === pageIndex + 1}
                      onClick={() => handlePageChange(pageIndex + 1)}
                      className="cursor-pointer"
                    >
                      {pageIndex + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage < totalPages ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      {/* Blog Details Dialog */}
      <Dialog open={!!selectedBlog} onOpenChange={(open) => !open && setSelectedBlog(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedBlog?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>
                Published: {selectedBlog && formatDate(selectedBlog.publishedAt)} at{" "}
                {selectedBlog && formatTime(selectedBlog.publishedAt)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User className="h-4 w-4" />
              <span>
                Author:{" "}
                {selectedBlog?.author
                  ? `${selectedBlog.author.firstname} ${selectedBlog.author.lastname || ""}`.trim()
                  : "Anonymous"}
              </span>
            </div>
            <div className="mt-4 border-t pt-4">
              <h3 className="font-medium mb-2">Content:</h3>
              <p className="text-gray-700 whitespace-pre-line">{selectedBlog?.content}</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedBlog(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ContentManagement
