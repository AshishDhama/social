import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIBaseURL, AuthToken } from "../../constants";
import { User } from "../../models/user.model";

const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: APIBaseURL,
  }),
  endpoints(builder) {
    return {
      removeUser: builder.mutation({
        query: (user: User) => {
          return {
            url: `/users/${user.id}`,
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${AuthToken}`,
            },
          };
        },
      }),
      addUser: builder.mutation({
        query: (user: Omit<User, "id">) => {
          return {
            url: "/users",
            method: "POST",
            body: {
              email: user.email,
              name: user.name,
              status: user.status,
              gender: user.gender,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${AuthToken}`,
            },
          };
        },
      }),
      fetchUser: builder.query<User, number>({
        query: (userId) => {
          return {
            url: `/users/${userId}`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${AuthToken}`,
            },
          };
        },
      }),
      fetchUsers: builder.query<User[], void>({
        query: () => {
          return {
            url: "/users",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${AuthToken}`,
            },
          };
        },
      }),
    };
  },
});

export const {
  useFetchUserQuery,
  useFetchUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
} = usersApi;
export { usersApi };
