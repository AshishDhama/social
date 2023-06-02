import { useLayoutEffect, useRef } from "react";
import { User } from "../../types/user.type";
import { randomColor } from "../../utils";
import styles from "./user-card.module.scss";
type Props = {
  user: User;
  onClick: (user: User) => void;
};

export function UserCard({ user, onClick }: Props) {
  const color = randomColor();
  const iconRef = useRef<HTMLSpanElement>(null);
  const statusClass =
    user.status === "active"
      ? styles["user-card__active"]
      : styles["user-card__inactive"];

  useLayoutEffect(() => {
    if (iconRef.current) {
      iconRef.current.style.backgroundColor = color;
    }
  }, []);

  function handleClick() {
    onClick(user);
  };

  return (
    <div onClick={handleClick} className={styles["user-card"]} key={user.id}>
      <span ref={iconRef} className={styles["user-card__icon"]} >
        {user.name.charAt(0)}
        <span className={statusClass} />
      </span>
      <h3 className={styles["user-card__name"]}>{user.name}</h3>
      <p className={styles["user-card__email"]}>{user.email}</p>
    </div>
  );
}
