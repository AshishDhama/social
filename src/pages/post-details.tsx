import { useParams } from "react-router-dom";
import Skeleton from "../components/skeleton";
import {
  useAddCommentMutation,
  useFetchPostCommentsQuery,
  useFetchPostQuery,
  useFetchUsersQuery,
} from "../store";
import { PostCard } from "../components/post-card";
import { CommentCard } from "../components/comment-card";
import CreateButton from "../components/create-button";
import Modal from "../components/modal";
import { useRef, useState } from "react";
import { Comment } from "../models/comment.model";
import CreateCommentForm from "../components/create-comment-form";
import { User } from "../models/user.model";

export default function PostDetails() {
  const formRef = useRef<HTMLFormElement>(null);
  const [createComment] = useAddCommentMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { postId } = useParams<{ postId: string }>();
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

  let postContent: JSX.Element | null = null;
  if (isFetchingPost) {
    postContent = <Skeleton className="h-8 w-8" times={4} />;
  } else if (postError) {
    postContent = <div>Error fetching photos...</div>;
  } else if (post) {
    postContent = <PostCard key={post.id} post={post} />;
  }

  let commentsContent: JSX.Element | JSX.Element[] | null = null;
  if (isFetchingComments) {
    commentsContent = <Skeleton className="h-8 w-8" times={4} />;
  } else if (commentsError) {
    commentsContent = <div>Error fetching photos...</div>;
  } else if (commentsData) {
    commentsContent = commentsData.map((comment) => (
      <CommentCard key={comment.id} comment={comment} />
    ));
  }

  function handleCreate() {
    setIsModalOpen(true);
  }

  function handleCreatePost() {
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
      createComment({ post, comment });
      setIsModalOpen(false);
    }
  }

  return (
    <div className="flex flex-row p-8 gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-center gap-x-6 bg-gray-50 border-dashed border-2 border-gray-500 rounded-md p-8 flex-col">
          <CreateButton text="Comment" onClick={handleCreate} />
        </div>
      </div>
      <div className="w-full">
        {postContent}
        {commentsContent}
      </div>
      <Modal
        title="Create Comment"
        body={<CreateCommentForm users={users} formRef={formRef} />}
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleCreatePost}
      />
    </div>
  );
}
