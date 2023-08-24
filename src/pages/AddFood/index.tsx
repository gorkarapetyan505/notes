import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSUser } from "../../features/user/userSlice";
import { selectDay } from "../../features/day/daySlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getloginUserThunk } from "../../features/user/userAPI";
import { getTodayThunk } from "../../features/day/dayAPI";
import "./style.scss";
import { FoodMenu } from "../../components/Component/FoodMenu";
import { MyTodaysFood } from "../../components/Component/MyTodaysFood";
import { getAllFoodThunk } from "../../features/food/foodAPI";

export const AddFood = React.memo(() => {
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
    <div className="addFood">
      <MyTodaysFood/>
      <FoodMenu />
    </div>
  );
});
