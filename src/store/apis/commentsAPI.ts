import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIBaseURL, AuthToken } from "../../constants";
import { Post } from "../../models/post.model";
import { Comment } from "../../models/comment.model";

const commentsApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: APIBaseURL,
  }),
  tagTypes: ['Comment'],
  endpoints(builder) {
    return {
      addComment: builder.mutation<Post, {post: Post, comment: Omit<Comment, 'id'>}>({
        query: (data) => {
          return {
            url: `/posts/${data.post.id}/comments`,
            method: "POST",
            body: { 
              name: data.comment.name,
              body: data.comment.body,
              email: data.comment.email,
              post: data.post,
            },
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthToken}`
            }
          };
        },
        invalidatesTags: ['Comment'],
      }),
      fetchPostComments: builder.query<Comment[], number>({
        query: (postId) => {
          return {
            url: `/posts/${postId}/comments`,
            method: "GET",
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthToken}`
            }
          };
        },
        providesTags: ['Comment'],
      }),
    };
  },
});

export const {
  useFetchPostCommentsQuery,
  useAddCommentMutation,
} = commentsApi;
export { commentsApi };
