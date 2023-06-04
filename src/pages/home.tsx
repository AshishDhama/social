import { Link, Outlet } from "react-router-dom";
import useCurrentPath from "../hooks/useCurrentPath";

export default function Dashboard() {
  const currentPath = useCurrentPath();
  const usersSelected = currentPath === "/users" || currentPath === '/' || currentPath.split('/').includes('users') ;
  const postsSelected = currentPath === "/posts" || currentPath.split('/').includes('posts');
  const classes = 'hover:text-blue-500 cursor-pointer transition-colors duration-200 ease-in-out font-semibold'
  return (
    <div className="flex flex-col">
      <nav className="flex justify-between items-center bg-gray-200 text-gray-500 p-4">
        <ul className="flex gap-x-4">
          <li className={ classes + (usersSelected ? ' text-blue-500' : ' text-gray-500')}>
            <Link to="/users">Users</Link>
          </li>
          <li className={classes + (postsSelected ? ' text-blue-500' : ' text-gray-500')}>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
