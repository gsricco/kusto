// type Images = {
//   url: string
// }

export type CreatePostRequest = {
  description: string
}
export type CreatePostDescriptionRequest = {
  childrenMetadata: ChildrenMetadataType[]
  description: string
}
export type ChildrenMetadataType = {
  uploadId: string
}

export type EditPostRequest = {
  body: CreatePostRequest
  postId: string
}

export type CreatePostResponse = {
  createdAt: string
  description: string
  id: string
  images: ImagesPostType[]
  userId: number
}
export type CreatePostImagesResponse = {
  images: ImagesPostType[]
}

export type GetPostResponse = CreatePostResponse

export type GetUserAllPostsRequest = {
  idLastUploadedPost?: number
  pageNumber?: number
  pageSize?: number
  sortBy: string
  sortDirection?: string
}

export type GetUserAllPostsResponse = {
  items: ItemsPostType[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type ItemsPostType = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: ImagesPostType[]
  location: string
  owner: OwnerPostType
  ownerId: number
  updatedAt: string
}

export type ImagesPostType = {
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type OwnerPostType = {
  firstName: string
  lastName: string
}

// export type Owner = {
//   firstName?: string
//   lastName?: string
// }

export type CreatePostDescriptionResponse = {
  createdAt: string
  description: string
  id: number
  images: ImagesPostType[]
  location?: string
  owner: OwnerPostType
  ownerId: number
  updatedAt: string
}
