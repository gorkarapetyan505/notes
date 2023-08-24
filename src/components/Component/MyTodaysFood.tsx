import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectDay } from "../../features/day/daySlice";
import { Food } from "../../features/food/foodSlice";
import { deleteTodayFoodThunk } from "../../features/day/dayAPI";
import { useLocation } from "react-router-dom";
import { deleteDietFood, selectDiet } from "../../features/diet/dietSlice";

export const MyTodaysFood = React.memo(() => {
  const dispatch = useAppDispatch();
  const { today } = useAppSelector(selectDay);
  const {diet_foods} = useAppSelector(selectDiet)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const add = searchParams.get("add");
  const foods = add?diet_foods:today.foods  

  return (
    <div className="div-left" style={{height:`${window.innerHeight-58.5}px`}}>
      <div className="s1">
        <h3>{add?"Diet Food":"Food Today"}</h3>
        <h5 className="calorie">{foods?.reduce((a, b) => a + +b.calorie_count, 0)} calorie</h5>
      </div>
      <div className="s2">
        {foods?.map((e: any) => {
          return (
            <div key={e.id}>
              <div>
                <img style={{width:"45px",height:"45px"}} src={e.photo_url} />
                <p>
                  {e.food_name} ({e.value}{e.category == "Juice"?"ml":"g"}) - {e.calorie_count} calorie
                </p>
              </div>
              <button
                onClick={() =>{
                  if(add){
                    dispatch(deleteDietFood(e.id))
                  }else{
                    dispatch(deleteTodayFoodThunk({ today, id: e.id }))
                  }
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
});
