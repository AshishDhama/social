import { ArrowLongRightIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Post } from "../models/post.model";

type Props = {
  post: Post;
  onClick?: (post: Post) => void;
  onDelete?: (post: Post) => void;
};

export function PostCard({ post, onClick , onDelete}: Props) {

  function handleClick() {
    onClick?.(post);
  }

  function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event?.stopPropagation();
    onDelete?.(post);
  }
  const content = post.body.length > 100 ? post.body.substring(0, 100) + "..." : post.body;
  const title = post.title.length > 50 ? post.title.substring(0, 100) + "..." : post.title;

  return (
    <div
      className="flex justify-between h-80 items-center gap-6 shadow-md p-8 rounded-md flex-col cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
      onClick={handleClick}
    >
      <div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="font-normal text-sm text-gray-700 dark:text-gray-400">{content}</p>
      </div>
      <div className="flex justify-between items-center w-full g-8">
          {onClick && (
            <button
              onClick={handleClick}
              className="flex justify-center items-center hover:bg-blue-700 hover:text-white text-blue-600 font-semibold py-2 px-4 rounded"
            >
              More
              <ArrowLongRightIcon className="h-4 w-4 ml-2" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="flex justify-center items-center hover:bg-red-700 hover:text-white text-red-600 font-semibold py-2 px-4 rounded"
            >
              Delete
              <TrashIcon className="h-4 w-4 ml-2" />
            </button>
          )}
        </div>
    </div>
  );
}
