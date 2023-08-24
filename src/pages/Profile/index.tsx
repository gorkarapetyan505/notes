import React, { useEffect } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSUser } from "../../features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getloginUserThunk } from "../../features/user/userAPI";
import { getTodayThunk } from "../../features/day/dayAPI";
import { selectDay } from "../../features/day/daySlice";
import { ProfileGrafik } from "../../components/Component/ProfileGrafik";
import { EditeGrafik } from "../../components/Component/EditeGrafik";
import { ProfileInfo } from "../../components/Component/ProfileInfo";
import { Footer } from "../../components/Footer";

export const Profile = React.memo(() => {
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
    <div className="profile">
      <div>
        <div className="flex">
          <ProfileGrafik today={today} user = {user_log} />
          <ProfileInfo  today={today} user = {user_log} />
        </div>
        <div>
          <EditeGrafik today = {today} weight = {user_log.weight} />
        </div>
        <Footer/>
      </div>
    </div>
  );
});
