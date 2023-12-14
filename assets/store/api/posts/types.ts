type Images = {
  url: string
}

export type CreatePostRequest = {
  description: string
}

export type EditPostRequest = {
  body: CreatePostRequest
  postId: string
}

export type CreatePostResponse = {
  createdAt: string
  description: string
  id: string
  images: Images[]
  userId: number
}

export type GetPostResponse = CreatePostResponse

export type GetUserAllPostsResponse = {
  items: CreatePostResponse[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type GetUserAllPostsRequest = {
  idLastUploadedPost?: number
  pageNumber?: number
  pageSize?: number
  sortDirection?: string
}
