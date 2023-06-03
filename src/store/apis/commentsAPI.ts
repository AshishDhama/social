import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIBaseURL, AuthToken } from "../../constants";
import { User } from "../../models/user.model";
import { Post } from "../../models/post.model";

const commentsApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: APIBaseURL,
  }),
  endpoints(builder) {
    return {
      addComment: builder.mutation<Post, {postId: Pick<Post, 'id'>, comment: Omit<Comment, 'id'>}>({
        query: (data) => {
          return {
            url: `/posts/${data.postId}/comeents`,
            method: "POST",
            body:data.comment,
            headers:{
              "Content-Type": "application/json",
              Authorization: `bearer ${AuthToken}`
            }
          };
        },
      }),
      fetchPostComments: builder.query<Comment[], Post>({
        query: (Post) => {
          return {
            url: `/posts/${Post.id}/comments`,
            method: "GET",
            headers:{
              "Content-Type": "application/json",
              Authorization: `bearer ${AuthToken}`
            }
          };
        },
      }),
    };
  },
});

export const {
  useFetchPostCommentsQuery,
  useAddCommentMutation,
} = commentsApi;
export { commentsApi };
