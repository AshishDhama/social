import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIBaseURL } from "../../constants";
import { User } from "../../types/user.type";

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
          };
        },
      }),
      addUser: builder.mutation({
        query: (user: User) => {
          return {
            url: "/users",
            method: "POST",
            body: {
              email: user.email,
              name: user.name,
              status: user.status,
              gender: user.gender
            },
          };
        },
      }),
      fetchUsers: builder.query<User[], void>({
        query: () => {
          return {
            url: "/users",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
} = usersApi;
export { usersApi };
