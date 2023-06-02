import { User } from "../../types/user.type";
import { UserCard } from "../../components/user-card";

import styles from "./user-list.module.scss";
import { useNavigate } from "react-router-dom";
import { useFetchUsersQuery } from "../../store";
import Skeleton from "../../components/skeleton/skeleton";

export default function UserListPage() {
  const navigate = useNavigate();
  const { data, error, isFetching } = useFetchUsersQuery();

  function handleClick(user: User) {
    navigate(`/user/${user.id}`);
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
  return <div className={styles["user-list"]}>{content}</div>;
}
