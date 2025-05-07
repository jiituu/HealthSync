"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { Search, ChevronLeft, ChevronRight, Plus, Trash2, BookOpen, X, Clock, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useGetBlogsQuery, useCreateBlogPostMutation, useDeleteBlogPostMutation } from "@/redux/api/blogApi"
// import { useGetCurrentDoctorQuery } from "@/redux/api/doctorApi"
import { toast } from "react-hot-toast"
import type { SingleBlogObject } from "@/types/blog"
import { useSessionUser } from "@/components/context/Session"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type SortOption = {
  label: string
  value: string
  sortFn: (a: SingleBlogObject, b: SingleBlogObject) => number
}

const sortOptions: SortOption[] = [
  {
    label: "Newest First",
    value: "newest",
    sortFn: (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  },
  {
    label: "Oldest First",
    value: "oldest",
    sortFn: (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
  },
  {
    label: "Title (A-Z)",
    value: "title-asc",
    sortFn: (a, b) => a.title.localeCompare(b.title),
  },
  {
    label: "Title (Z-A)",
    value: "title-desc",
    sortFn: (a, b) => b.title.localeCompare(a.title),
  },
]

const EducationCenter = () => {
  // const { data: doctorData } = useGetCurrentDoctorQuery()
  const { user } = useSessionUser()
  const doctorName = user?.firstname || ""
  // const doctorId = user?._id || doctorData?.data?._id || ""

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [totalPages, setTotalPages] = useState(1)

  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")

  const [sortOption, setSortOption] = useState<SortOption>(sortOptions[0])

  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedPost, setSelectedPost] = useState<SingleBlogObject | null>(null)
  const [validationErrors, setValidationErrors] = useState<{
    title?: string
    content?: string
  }>({})

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery])

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useGetBlogsQuery({
    page: currentPage,
    limit: itemsPerPage,
    // search: debouncedSearchQuery,
  })

  const blogs = response?.data?.blogs || []

  const filteredAndSortedBlogs = [...blogs]
    .filter((blog) => {
      if (!debouncedSearchQuery) return true
      return (
        blog.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
    })
    .sort(sortOption.sortFn)

  useEffect(() => {
    if (response?.data?.totalPages) {
      setTotalPages(response.data.totalPages)
    }
  }, [response])

  const [createBlogPost, { isLoading: isCreating }] = useCreateBlogPostMutation()
  const [deleteBlogPost, { isLoading: isDeleting }] = useDeleteBlogPostMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setValidationErrors({})

    if (!title.trim()) {
      setValidationErrors({ title: "Title is required" })
      toast.error("Title is required")
      return
    }
    if (!content.trim()) {
      setValidationErrors({ content: "Content is required" })
      toast.error("Content is required")
      return
    }

    try {
      await createBlogPost({
        author: doctorName,
        title,
        content,
        tags: [],
        published: true,
      }).unwrap()

      toast.success("Blog post created successfully!")
      setTitle("")
      setContent("")
      setIsCreatingPost(false)
      refetch() 
    } catch (err: any) {
      if (err.data?.error) {
        const errorMessage = err.data.error

        if (errorMessage.includes('"title" length')) {
          setValidationErrors({
            title: "Title must be at least 5 characters long",
          })
          toast.error("Title must be at least 5 characters long")
        } else if (errorMessage.includes('"content" length')) {
          setValidationErrors({
            content: "Content must be at least 20 characters long",
          })
          toast.error("Content must be at least 20 characters long")
        } else {
          toast.error(errorMessage)
        }
      } else {
        toast.error("Failed to create blog post")
        console.error("Blog creation error:", err)
      }
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteBlogPost(postId).unwrap()
        toast.success("Post deleted successfully")
        refetch() 
      } catch (err) {
        toast.error("Failed to delete post")
        console.error("Delete error:", err)
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="mx-auto py-8 px-4 md:px-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Share your medical knowledge and insights with the community
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10 bg-white border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {debouncedSearchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </Button>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Clock className="mr-2 h-4 w-4" />
                <span>{sortOption.label}</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortOption(option)}
                  className={sortOption.value === option.value ? "bg-accent font-medium" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          onClick={() => setIsCreatingPost(true)}
          className="bg-secondaryColor hover:bg-orange-300 text-white w-full md:w-auto"
        >
          <Plus className="mr-2" size={16} />
          Create New Post
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="font-semibold text-xl text-gray-800">Latest Articles</h2>
          <div className="text-sm text-gray-500">
            {filteredAndSortedBlogs.length} {filteredAndSortedBlogs.length === 1 ? "post" : "posts"}
          </div>
        </div>

        {debouncedSearchQuery && (
          <div className="text-sm text-gray-500 mb-4">
            {filteredAndSortedBlogs.length === 0
              ? "No results found for "
              : `Showing ${filteredAndSortedBlogs.length} result${filteredAndSortedBlogs.length === 1 ? "" : "s"} for `}
            <span className="font-medium text-emerald-600">{debouncedSearchQuery}</span>
            <Button
              variant="link"
              size="sm"
              className="text-gray-500 p-0 h-auto ml-1"
              onClick={() => setSearchQuery("")}
            >
              Clear
            </Button>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-red-50 rounded-lg border border-red-100">
            <div className="text-red-500 mb-2">Error loading blogs</div>
            <Button variant="outline" onClick={() => refetch()} className="text-red-600 border-red-200 hover:bg-red-50">
              Try Again
            </Button>
          </div>
        ) : filteredAndSortedBlogs.length > 0 ? (
          <div className="space-y-4">
            {filteredAndSortedBlogs.map((blog) => (
              <Card
                key={blog._id}
                className={`overflow-hidden transition-all duration-200 shadow-md bg-[#fff4e3] ${
                  blog.author === doctorName ? "border-l-4 border-emerald-500" : ""
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-gray-200">
                        <AvatarImage src="/images/doctor.png" alt={blog.author || "Doctor"} />
                        <AvatarFallback>{blog.author?.charAt(0) || "D"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {blog.author || "Anonymous Doctor"}
                          {blog.author === doctorName && (
                            <Badge className="ml-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">You</Badge>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">{formatDate(blog.publishedAt)}</p>
                      </div>
                    </div>
                    {blog.author === doctorName && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeletePost(blog._id)}
                        disabled={isDeleting}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <h4 className="text-lg font-medium mb-2">{blog.title || "Untitled Post"}</h4>
                  <p className="text-gray-700 line-clamp-3">{blog.content}</p>
                </CardContent>
                <CardFooter className="pt-0 flex justify-end">
                  <Button
                    variant="ghost"
                    className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50"
                    onClick={() => setSelectedPost(blog)}
                  >
                    <BookOpen size={16} className="mr-1" />
                    Read more
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
            {debouncedSearchQuery ? (
              <p className="mt-2 text-gray-500">No results match your search. Try different keywords.</p>
            ) : (
              <p className="mt-2 text-gray-500">Be the first to share your knowledge with the community!</p>
            )}
            <Button
              className="mt-4 bg-secondaryColor hover:bg-orange-300 text-white"
              onClick={() => setIsCreatingPost(true)}
            >
              Create your first post
            </Button>
          </div>
        )}

        {blogs.length > 0 && totalPages > 1 && (
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isCreatingPost} onOpenChange={setIsCreatingPost}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Create New Post</DialogTitle>
            <DialogDescription>
              Share your medical knowledge and insights with other healthcare professionals
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (validationErrors.title) {
                    setValidationErrors((prev) => ({ ...prev, title: undefined }))
                  }
                }}
                placeholder="Enter blog title (at least 5 characters)..."
                className={validationErrors.title ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {validationErrors.title && <p className="text-red-500 text-sm">{validationErrors.title}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value)
                  if (validationErrors.content) {
                    setValidationErrors((prev) => ({ ...prev, content: undefined }))
                  }
                }}
                placeholder="Write something insightful (at least 20 characters)..."
                className={validationErrors.content ? "border-red-500 focus-visible:ring-red-500" : ""}
                rows={8}
              />
              {validationErrors.content && <p className="text-red-500 text-sm">{validationErrors.content}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsCreatingPost(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-secondaryColor hover:bg-orange-300 text-white" disabled={isCreating}>
                {isCreating ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {selectedPost && (
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedPost.title}</DialogTitle>
              <div className="flex items-center gap-3 mt-2">
                <Avatar className="h-10 w-10 border border-gray-200">
                  <AvatarImage src="/images/doctor.png" alt={selectedPost.author || "Doctor"} />
                  <AvatarFallback>{selectedPost.author?.charAt(0) || "D"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {selectedPost.author || "Anonymous Doctor"}
                    {selectedPost.author === doctorName && (
                      <Badge className="ml-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">You</Badge>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{formatDate(selectedPost.publishedAt)}</p>
                </div>
              </div>
            </DialogHeader>
            <div className="prose max-w-none mt-4 text-gray-800">
              {selectedPost.content.split("\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default EducationCenter
