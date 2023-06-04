import { useLayoutEffect, useRef } from "react";
import { User } from "../models/user.model";
import { randomColor } from "../utils";
import { TrashIcon, UserIcon } from "@heroicons/react/20/solid";
type Props = {
  user: User;
  onClick?: (user: User) => void;
  onDelete?: (user: User) => void;
};

export function UserCard({ user, onClick, onDelete }: Props) {
  const color = randomColor();
  const iconRef = useRef<HTMLSpanElement>(null);
  const statusClass = user.status === "active" ? "bg-green-500" : "bg-red-500";

  useLayoutEffect(() => {
    if (iconRef.current) {
      iconRef.current.style.backgroundColor = color;
    }
  }, [color]);

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event?.stopPropagation();
    onClick?.(user);
  }
  function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event?.stopPropagation();
    onDelete?.(user);
  }
  return (
    <div
      className="flex justify-start items-center gap-6 shadow-md p-8 rounded-md flex-col"
      onClick={handleClick}
    >
      <span
        ref={iconRef}
        className="h-16 w-16 flex items-center justify-center text-white font-black relative rounded-lg"
      >
        {user.name.charAt(0)}
        <span
          className={`h-4 w-4 absolute bottom-0 right-0 rounded-full inline-flex items-center justify-center ring-2 ring-white ${statusClass}`}
        ></span>
      </span>
      <div className="flex-grow">
        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
          {user.name}
        </h3>
        <p className="text-sm break-all font-semibold leading-6 text-indigo-600">
          {user.email}
        </p>
      </div>
      <div className="flex justify-between items-center w-full g-8">
        {onClick && (
          <button
            onClick={handleClick}
            className="flex justify-center items-center hover:bg-blue-700 hover:text-white text-blue-600 font-semibold py-2 px-4 rounded"
          >
            View
            <UserIcon className="h-4 w-4 ml-2 inline-flex" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={handleDelete}
            className="flex justify-center items-center hover:bg-red-700 hover:text-white text-red-600 font-semibold py-2 px-4 rounded"
          >
            Delete
            <TrashIcon className="h-4 w-4 ml-2 inline-flex" />
          </button>
        )}
      </div>
    </div>
  );
}
