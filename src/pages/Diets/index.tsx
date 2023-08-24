import React, { useEffect } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSUser } from "../../features/user/userSlice";
import { selectDay } from "../../features/day/daySlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getloginUserThunk } from "../../features/user/userAPI";
import { getTodayThunk } from "../../features/day/dayAPI";

export const Diets = React.memo(() => {
    const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user_log } = useAppSelector(selectSUser);
  const { today } = useAppSelector(selectDay);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        dispatch(getloginUserThunk(user.email))
          .unwrap()
          .then((res) => {
            if (res && res.id) {
              dispatch(getTodayThunk(res?.id));
            }
          });
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <div className="diets">
      <div>sad</div>
      <Link to={"/add-food?add=diet"}>Add Diet</Link>
    </div>
  );
});
