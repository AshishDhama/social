import { useNavigate, useParams } from "react-router-dom";
import {
  useAddPostMutation,
  useFetchUserPostsQuery,
  useFetchUserQuery,
  useRemovePostMutation,
} from "../store";
import Spinner from "../components/spinner";
import { UserCard } from "../components/user-card";
import { PostCard } from "../components/post-card";
import { Post } from "../models/post.model";
import CreateButton from "../components/create-button";
import { useRef, useState } from "react";
import Modal from "../components/modal";
import CreatePostForm from "../components/create-post-form";

export default function UserDetails() {
  const formRef = useRef<HTMLFormElement>(null);
  const [createPost] = useAddPostMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [removePost] = useRemovePostMutation();

  const {
    data: user,
    error: userError,
    isFetching: isFetchingUser,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = useFetchUserQuery(+userId!);
  const {
    data: posts,
    error: postsError,
    isFetching: isFetchingPosts,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = useFetchUserPostsQuery(+userId!);

  let content: JSX.Element | null = null;
  if (isFetchingUser) {
    content = <Spinner />;
  } else if (userError) {
    content = <div>Error fetching photos...</div>;
  } else if (user) {
    content = <UserCard key={user.id} user={user} />;
  }

  let postsContent: JSX.Element | JSX.Element[] | null = null;
  if (isFetchingPosts) {
    postsContent = <Spinner />;
  } else if (postsError) {
    postsContent = <div>Error fetching photos...</div>;
  } else if (posts) {
    postsContent = posts.map((post) => (
      <PostCard
        key={post.id}
        post={post}
        onClick={handlePostClick}
        onDelete={handlePostDelete}
      />
    ));
  }

  function handlePostClick(post: Post) {
    navigate(`/posts/${post.id}`);
  }

  function handleCreate() {
    setIsModalOpen(true);
  }

  function handleCreatePost() {
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const post: Omit<Post, "id"> = {
        title: formData.get("title") as string,
        body: formData.get("body") as string,
        user_id: +userId,
      };
      createPost({ user, post });
      setIsModalOpen(false);
    }
  }

  function handlePostDelete(post: Post) {
    removePost(post);
  }

  return (
    <>
      <div className="flex flex-row p-8 gap-8">
        <div className="flex flex-col gap-8">
          {content}
          <div className="flex items-center justify-center gap-x-6 bg-gray-50 border-dashed border-2 border-gray-500 rounded-md p-8 flex-col">
            <CreateButton text="Post" onClick={handleCreate} />
          </div>
        </div>
        <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(16rem,_1fr))] gap-8">
          {postsContent}
        </div>
      </div>
      <Modal
        title="Create Post"
        body={<CreatePostForm formRef={formRef} />}
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleCreatePost}
      />
    </>
  );
}
