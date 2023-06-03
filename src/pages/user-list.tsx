import { User } from "../models/user.model";
import { UserCard } from "../components/user-card";

import { useNavigate } from "react-router-dom";
import { useFetchUsersQuery } from "../store";
import Skeleton from "../components/skeleton";

export default function UserListPage() {
  const navigate = useNavigate();
  const { data, error, isFetching } = useFetchUsersQuery();

  function handleClick(user: User) {
    navigate(`/users/${user.id}`);
  }

  let content: JSX.Element | JSX.Element[] | null = null;
  if (isFetching) {
    content = <Skeleton className="h-8 w-8" times={4} />;
  } else if (error) {
    content = <div>Error fetching photos...</div>;
  } else if (data) {
    content = data.map((user: User) => {
      return <UserCard key={user.id} user={user} onClick={handleClick} />;
    });
  }

  return <div className="grid grid-cols-[repeat(auto-fill,_minmax(16rem,_1fr))] gap-8">{content}</div>;
}
