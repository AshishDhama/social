import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIBaseURL, AuthToken } from "../../constants";
import { User } from "../../models/user.model";
import { Post } from "../../models/post.model";

const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: APIBaseURL,
  }),
  endpoints(builder) {
    return {
      removePost: builder.mutation<Post, {userId: number, postId: Pick<Post, 'id'>}>({
        query: (data) => {
          return {
            url: `/users/${data.userId}/posts/${data.postId}}`,
            method: "DELETE",
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthToken}`
            }
          };
        },
      }),
      addPost: builder.mutation<Post, {user: User, post: Omit<Post, 'id'>}>({
        query: (data) => {
          return {
            url: `/users/${data.user.id}/posts`,
            method: "POST",
            body:{
              title: data.post.title,
              body: data.post.body,
              user: data.user,
              user_id: data.user.id
            },
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthToken}`
            }
          };
        },
      }),
      fetchPost: builder.query<Post, number>({
        query: (postId) => {
          return {
            url: `/posts/${postId}`,
            method: "GET",
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthToken}`
            }
          };
        },
      }),
      fetchUserPosts: builder.query<Post[], number>({
        query: (userId) => {
          return {
            url: `/users/${userId}/posts`,
            method: "GET",
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthToken}`
            }
          };
        },
      }),
      fetchAllPosts: builder.query<Post[], void>({
        query: () => {
          return {
            url: "/posts",
            method: "GET",
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthToken}`
            }
          };
        },
      }),
    };
  },
});

export const {
  useFetchAllPostsQuery,
  useFetchPostQuery,
  useFetchUserPostsQuery,
  useAddPostMutation,
  useRemovePostMutation,
} = postsApi;
export { postsApi };
