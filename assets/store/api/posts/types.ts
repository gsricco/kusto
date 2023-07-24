type Images = {
  url: string;
};

export type CreatePostRequest = {
  description: string;
};

export type EditPostRequest = {
  body: CreatePostRequest;
  postId: string;
};

export type CreatePostResponse = {
  id: string;
  userId: string;
  description: string;
  createdAt: string;
  images: Images[];
};

export type GetPostResponse = CreatePostResponse;

export type GetUserPostResponse = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: CreatePostResponse[];
};