import { useNavigate } from "react-router-dom";
import { useFetchAllPostsQuery } from "../store";
import Skeleton from "../components/skeleton";
import CreateButton from "../components/create-button";
import { PostCard } from "../components/post-card";
import { Post } from "../models/post.model";

export default function UserListPage() {
  const navigate = useNavigate();
  const { data, error, isFetching } = useFetchAllPostsQuery();

  function handleClick(post: Post) {
    navigate(`/posts/${post.id}`);
  }

  let content: JSX.Element | JSX.Element[] | null = null;
  if (isFetching) {
    content = <Skeleton className="h-8 w-8" times={4} />;
  } else if (error) {
    content = <div>Error fetching photos...</div>;
  } else if (data) {
    content = data.map((post: Post) => {
      return <PostCard key={post.id} post={post} onClick={handleClick} />;
    });
  }

  return <div className="grid grid-cols-[repeat(auto-fill,_minmax(16rem,_1fr))] gap-8 p-8">
    <div className="flex items-center justify-center gap-x-6 bg-gray-50 border-dashed border-2 border-gray-500 rounded-md p-8 flex-col">
      <CreateButton onClick={() => navigate('/users/create')} />
    </div>
    {content}
    </div>;
}
