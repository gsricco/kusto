import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
  QueryStatus
} from "@reduxjs/toolkit/dist/query";
import { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { CreatePostResponse } from "assets/store/api/posts/types";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  LoadingPostStyle,
  LoadingStyle,
  PhotoStyle,
  PhotosBlock,
  ScrollStyle
} from "styles/styledComponents/profile/profile.styled";
import { baseTheme } from "styles/styledComponents/theme";
import emptyPhoto from "../../public/img/404.svg";

type PropsType = {
  posts: CreatePostResponse[] | undefined;
  postSize: number;
  setIsPostActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  getCurrentPost: LazyQueryTrigger<
    QueryDefinition<
      string,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
      "createPost" | "editPost" | "deletePost",
      CreatePostResponse,
      "postsApi"
    >
  >;
  totalCount: number;
  scrollSize: number;
  isLoading: boolean;
  status: QueryStatus;
};

export const PostPhotos: React.FC<PropsType> = ({
  posts,
  postSize,
  setIsPostActive,
  setPageSize,
  pageSize,
  getCurrentPost,
  totalCount,
  scrollSize,
  isLoading,
  status
}) => {
  const [page, setPage] = useState(1);
  const scrollHandler = () => {
    // console.log('scrollHeight', element.scrollHeight)
    // console.log('scrollTop', element.scrollTop)
    // console.log('clientHeight', element.clientHeight)
    // console.log('element.scrollHeight - element.scrollTop', (element.scrollHeight - element.scrollTop))
    console.log(document.documentElement.scrollHeight - document.documentElement.scrollTop);

    if (document.documentElement.scrollHeight - document.documentElement.scrollTop <= 1000) {
      let newPageSize = pageSize + 9;
      if (totalCount + 9 >= newPageSize) {
        setPageSize(newPageSize);
        setPage((prev) => prev + 1);
      }
    }
  };
  if (isLoading) console.log("%c loading posts...", consoleStyle);

  console.log(document.documentElement.scrollHeight - document.documentElement.scrollTop);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, [totalCount, page]);

  return (
    <>
      <ScrollStyle>
        <PhotosBlock>
          {posts?.map((p) => (
            <PhotoStyle key={p.id}>
              <Image
                src={p.images.length ? p.images[0].url : emptyPhoto}
                width={postSize}
                height={postSize}
                alt={"post image"}
                onClick={() =>
                  getCurrentPost(p.id)
                    .unwrap()
                    .then(() => setIsPostActive(true))
                }

                // style={{ }}
              />
            </PhotoStyle>
          ))}
        </PhotosBlock>
      </ScrollStyle>
    </>
  );
};

const consoleStyle = `
padding: 20px;
background-color: ${baseTheme.colors.accent[100]};
border-radius: 20px;
color: white}`;
