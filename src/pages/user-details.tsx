import { useNavigate, useParams } from "react-router-dom";
import { useFetchUserPostsQuery, useFetchUserQuery } from "../store";
import Skeleton from "../components/skeleton";
import { UserCard } from "../components/user-card";
import { PostCard } from "../components/post-card";
import { Post } from "../models/post.model";

export default function UserDetails() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  const {
    data: user,
    error: userError,
    isFetching: isFetchingUser,
  } = useFetchUserQuery(+userId);
  const {
    data: posts,
    error: postsError,
    isFetching: isFetchingPosts,
  } = useFetchUserPostsQuery(+userId);

  let content: JSX.Element | null = null;
  if (isFetchingUser) {
    content = <Skeleton className="h-8 w-8" times={4} />;
  } else if (userError) {
    content = <div>Error fetching photos...</div>;
  } else if (user) {
    content = <UserCard key={user.id} user={user} />;
  }

  let postsContent: JSX.Element | JSX.Element[] | null = null;
  if (isFetchingPosts) {
    postsContent = <Skeleton className="h-8 w-8" times={4} />;
  } else if (postsError) {
    postsContent = <div>Error fetching photos...</div>;
  } else if (posts) {
    postsContent = posts.map((post) => (
      <PostCard key={post.id} post={post} onClick={handlePostClick} />
    ));
  }

  function handlePostClick(post: Post) {
    navigate(`/posts/${post.id}`);
  }
  return (
    <div >
      {content}
      {postsContent}
    </div>
  );
}
