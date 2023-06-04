import { Link, Outlet } from "react-router-dom";
import useCurrentPath from "../hooks/useCurrentPath";

export default function Dashboard() {
  const currentPath = useCurrentPath();
  const usersSelected = currentPath === "/users" || currentPath === '/' || currentPath.split('/').includes('users') ;
  const postsSelected = currentPath === "/posts" || currentPath.split('/').includes('posts');
  const classes = "flex items-center px-4 py-2 font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200";
  return (
    <div className="flex flex-col h-full">
      <nav className="flex justify-between items-center bg-blue-500 p-4">
        <ul className="flex gap-x-4">
          <li className={ classes + (usersSelected ? ' bg-indigo-600 text-white ' : ' text-white')}>
            <Link to="/users">Users</Link>
          </li>
          <li className={classes + (postsSelected ? ' bg-indigo-600 text-white ' : ' text-white')}>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
