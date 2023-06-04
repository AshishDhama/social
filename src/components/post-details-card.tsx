import { UserIcon } from "@heroicons/react/20/solid";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";

type Props = {
  post: Post;
  onDelete?: (post: Post) => void;
  author: User;
};
export function PostDetailsCard({ post, author, onDelete }: Props) {
  function handleDelete() {
    onDelete?.(post);
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-md cursor-pointer bg-blue-50">
      <div className="flex flex-col justify-start items-start w-full g-8">
        <h3 className="text-lg font-bold">{post.title}</h3>
        <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
          {post.body}
        </p>
      </div>
      <div className="flex justify-between items-center w-full g-8">
        {author && <h3 className="flex justify-center items-center gap-2 text-sm font-bold"><UserIcon className="w-4 h-4"/> {author.name}</h3>}
        {onDelete && (
          <button
            onClick={handleDelete}
            className="flex justify-center items-center hover:bg-red-700 hover:text-white text-red-600 font-semibold py-2 px-4 rounded"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
