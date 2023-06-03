import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from './apis/usersAPI';
import { postsApi } from './apis/postsAPI';
import { commentsApi } from './apis/commentsAPI';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(postsApi.middleware)
      .concat(commentsApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchUserQuery,
  useFetchUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
} from './apis/usersAPI';

export {
  useFetchAllPostsQuery,
  useFetchUserPostsQuery,
  useFetchPostQuery,
  useAddPostMutation,
  useRemovePostMutation,
} from './apis/postsAPI';

export {
  useFetchPostCommentsQuery,
  useAddCommentMutation,
} from './apis/commentsAPI';
