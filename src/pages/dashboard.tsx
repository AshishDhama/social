import { Link, Outlet } from "react-router-dom";
import useCurrentPath from "../hooks/useCurrentPath";
import classNames from "classnames";

export default function Dashboard() {
  const currentPath = useCurrentPath();
  console.log(currentPath);
  return (
    <div className="flex flex-col">
      <nav className="flex justify-between items-center bg-gray-200 text-gray-500 p-4">
        <ul className="flex gap-x-4">
          <li className={classNames('text-gray-500',{"text-blue-500" :currentPath === "/" })}>
            <Link to="/">Dashboard</Link>
          </li>
          <li className={classNames('text-gray-500',{"text-blue-500" :currentPath === "/users" })}>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
