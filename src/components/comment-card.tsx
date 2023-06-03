import { Comment } from "../models/comment.model";

type Props = {
  comment: Comment;
  onClick?: (comment: Comment) => void;
};
export function CommentCard({ comment, onClick }: Props) {
  function handleClick() {
    onClick?.(comment);
  }
  return (
    <div
      className="flex flex-col bg-white shadow-md rounded-md p-4"
      onClick={handleClick}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              {comment.name}
            </span>
            <span className="text-sm font-semibold text-gray-500">
              {comment.email}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <span className="text-sm font-semibold text-gray-900">
          {comment.body}
        </span>
      </div>
    </div>
  );
}
