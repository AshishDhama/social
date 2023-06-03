import { Post } from "../models/post.model";

type Props = {
  post: Post;
  onClick?: (post: Post) => void;
};

export function PostCard({ post, onClick }: Props) {

  function handleClick() {
    onClick?.(post);
  }
  return (
    <div
      className="flex justify-start items-center gap-6 shadow-md p-8 rounded-md flex-col"
      onClick={handleClick}
    >
      <h3 className="text-2xl font-bold">{post.title}</h3>
      <p className="text-xl">{post.body}</p>
    </div>
  );
}
