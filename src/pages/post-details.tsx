import { useParams } from "react-router-dom";
import Spinner from "../components/spinner";
import {
  useAddCommentMutation,
  useFetchPostCommentsQuery,
  useFetchPostQuery,
  useFetchUserQuery,
  useFetchUsersQuery,
} from "../store";
import { CommentCard } from "../components/comment-card";
import { useRef } from "react";
import { Comment } from "../models/comment.model";
import CreateCommentForm from "../components/create-comment-form";
import { User } from "../models/user.model";
import { Post } from "../models/post.model";
import { PostDetailsCard } from "../components/post-details-card";
interface PostParams {
  postId: string
}
export default function PostDetails() {
  const formRef = useRef<HTMLFormElement>(null);
  const [createComment] = useAddCommentMutation();
  const { postId } = useParams<{ postId: string }>() as PostParams;
  const { data: users} = useFetchUsersQuery();

  console.log(postId);
  const {
    data: post,
    error: postError,
    isFetching: isFetchingPost,
  } = useFetchPostQuery(+postId);
  const {
    data: commentsData,
    error: commentsError,
    isFetching: isFetchingComments,
  } = useFetchPostCommentsQuery(+postId);
  const {data:author}= useFetchUserQuery(post?.user_id as number, {skip: !post?.user_id});

  let postContent: JSX.Element | null = null;
  if (isFetchingPost) {
    postContent = <Spinner />;
  } else if (postError) {
    postContent = <div>Error fetching photos...</div>;
  } else if (post) {
    postContent = <PostDetailsCard key={post.id} post={post} author={author as User}/>;
  }

  let commentsContent: JSX.Element | JSX.Element[] | null = null;
  if (isFetchingComments) {
    commentsContent = <Spinner />;
  } else if (commentsError) {
    commentsContent = <div>Error fetching photos...</div>;
  } else if (commentsData) {
    commentsContent = commentsData.map((comment) => (
      <CommentCard key={comment.id} comment={comment} />
    ));
  }

  function handleCreateComment() {
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const userId = formData.get("author") as string
      const user = users?.find((u: User) => u.id === +userId) as User;
      const comment: Omit<Comment, "id"> = {
        body: formData.get("body") as string,
        name: user.name,
        email: user.email,
        post_id: +postId,
      };
      const postData = post as Post;
      createComment({ post: postData, comment });
    }
  }
  const usersOptions = users as User[];

  return (
    <div className="flex flex-col overflow-hidden gap-4">
      <div className="flex flex-col items-center overflow-y-scroll">
        {postContent}
        <div className="flex flex-col w-full gap-4 max-w-[1440px] pt-8">
        {commentsContent}
        </div>
      </div>
      <div className="flex justify-center px-8 w-full">
      {usersOptions && <CreateCommentForm formRef={formRef} users={usersOptions} onSubmit={handleCreateComment} />}
      </div>
    </div>
  );
}
