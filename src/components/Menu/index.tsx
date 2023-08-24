import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link, useLocation } from "react-router-dom";
import { selectSUser } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getloginUserThunk } from "../../features/user/userAPI";
import { getTodayThunk } from "../../features/day/dayAPI";

export const Menu: React.FC = React.memo((): JSX.Element => {
  const [bool, setBool] = useState<Boolean>(false);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { user_log } = useAppSelector(selectSUser);
  const navRef = useRef<any>(null);
  const menu = [
    { id: 1, path: "/profile", name: "Profile" },
    { id: 2, path: "/add-food", name: "Food" },
    { id: 3, path: "/grafik", name: "Grafik" },
    { id: 4, path: "/diets", name: "Diets" },
  ];
  const loginmenu = [
    { id: 1, path: "/", name: "Login" },
    { id: 2, path: "/register", name: "Register" },
  ];
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setBool(user ? true : false);
      if (user && user.email) {
        dispatch(getloginUserThunk(user.email));
        //   .unwrap()
        //   .then((res) => {
        //     if (res && res.id) {
        //       dispatch(getTodayThunk(res?.id));
        //       console.log(1)
        //     }
        //   });
      }
    });
  }, []);
  const menuRef = () => {
    if (navRef.current.className == "s1") {
      navRef.current.className = "";
    } else {
      navRef.current.className = "s1";
    }
  };
  // console.log(user_log)
  return (
    <div className="menu">
      <div
        className="a7"
        onClick={() => {
          menuRef();
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav id="s1" ref={navRef}>
        {bool ? (
          <ul className="menu1">
            <h3>
              {user_log?.name} {user_log?.surname}
            </h3>
            <div>
              {menu?.map((e) => {
                return (
                  <li
                    onClick={() => {
                      menuRef();
                    }}
                    key={e.id}
                  >
                    <Link
                      to={e.path}
                      className={e.path == pathname ? "activ" : ""}
                    >
                      {e.name}
                    </Link>
                  </li>
                );
              })}
              <li>
                <button onClick={() => signOut(auth)}>Log Out</button>
              </li>
            </div>
          </ul>
        ) : (
          // <></>
          // <ul>
          //     {loginmenu?.map(e => {
          //         return <li  onClick={() => {menuRef()}}  key={e.id}><Link to={e.path} className={e.path == pathname ? 'activ' : ''} >{e.name}</Link></li>
          //     })}
          // </ul>
          <></>
        )}
      </nav>
    </div>
  );
});
