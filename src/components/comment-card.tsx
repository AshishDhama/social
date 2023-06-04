import { Comment } from "../models/comment.model";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/20/solid";

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
      className="flex flex-col gap-4 bg-gray-100 rounded-md p-4 border-2 border-gray-200"
      onClick={handleClick}
    >
      <div className="flex flex-col mt-2">
        <div className="flex flex-col text-xs text-gray-900">
          <span className="font-bold">Comment:</span>
          <span className="text-lg">{comment.body}</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="flex items-center text-xs font-semibold text-gray-900">
          <UserIcon className="w-5 h-5 mr-2" />
          {comment.name}
        </span>
        <span className="flex items-center text-xs font-semibold text-gray-500">
          <EnvelopeIcon className="w-5 h-5 mr-2" />
          {comment.email}
        </span>
      </div>
    </div>
  );
}
