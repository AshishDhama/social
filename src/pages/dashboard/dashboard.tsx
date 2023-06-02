import { Link, Outlet } from "react-router-dom";
import style from "./dashboard.module.scss";

export default function Layout() {
    return (
      <div className={style["layout"]}>
        <nav className={style["nav-bar"]}>
          <ul className={style["nav-bar__ul"]}>
            <li className={style["nav-bar__li"]}>
              <Link to="/Home">Home</Link>
            </li>
            <li className={style["nav-bar__li"]}>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Outlet/>
      </div>
    );
  }