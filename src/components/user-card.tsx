import { useLayoutEffect, useRef } from "react";
import { User } from "../models/user.model";
import { randomColor } from "../utils";
type Props = {
  user: User;
  onClick?: (user: User) => void;
};

export function UserCard({ user, onClick }: Props) {
  const color = randomColor();
  const iconRef = useRef<HTMLSpanElement>(null);
  const statusClass = user.status === "active" ? "bg-green-500" : "bg-red-500";

  useLayoutEffect(() => {
    if (iconRef.current) {
      iconRef.current.style.backgroundColor = color;
    }
  }, [color]);

  function handleClick() {
    onClick?.(user);
  }
  return (
    <div className="flex items-center gap-x-6 shadow-md p-8 flex-col" onClick={handleClick}>
      <span ref={iconRef} className="h-16 w-16 flex items-center justify-center text-white font-black relative rounded-lg">
      {user.name.charAt(0)}
        <span
          className={`h-4 w-4 absolute bottom-0 right-0 rounded-full inline-flex items-center justify-center ring-2 ring-white ${statusClass}`}
        ></span>
      </span>
      <div>
        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
          {user.name}
        </h3>
        <p className="text-sm font-semibold leading-6 text-indigo-600">
          {user.email}
        </p>
      </div>
    </div>
  );
}
