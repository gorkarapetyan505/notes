import React from "react";
import { Day } from "../../features/day/daySlice";
import { User } from "../../features/user/userSlice";
import { Food } from "../../features/food/foodSlice";
import { UpdateUser } from "./UpdateUser";

interface Type {
  today: Day;
  user: User;
}
export const ProfileInfo = React.memo(({ today, user }: Type) => {
  const {walking,situp,pushup,barpushup,crunch,rope} = today
  // console.log(today.id)
  return (
    <div className="profile_info">
      <div className="foods">
        <div className="w1">
          <h3>Food Today</h3>
          <h3>+{today?.foods?.reduce((a, b) => a + +b.calorie_count, 0)}</h3>
        </div>
        {today.foods?.map((e: any) => {
          return (
            <div key={e.id}>
              <div>
                <img width={45} src={e.photo_url} />
                <p>
                {e.food_name} ({e.value}{e.category == "Juice"?"ml":"g"})  - {e.calorie_count} calorie
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="goal">
        <div></div>
      </div>
      <div className="user_info">
        <div>Age : {user.age}</div>
        <div>Weight : {user.weight}</div>
        <div>Height : {user.height}</div>
      </div>
      <div>{Math.ceil(user.weight*((barpushup * 0.0155)+ (0.015*pushup)+(0.0135*situp)+(crunch * 0.014))+(walking / 1.5 / 16)+(rope/3))} calorie</div>

      <div>
        <UpdateUser user = {user}/>
      </div>
    </div>
  );
});
