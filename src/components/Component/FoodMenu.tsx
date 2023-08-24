import React, { useEffect, useState } from "react";
import { FoodForm } from "./FoodForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Food, FoodCategory, selectFood } from "../../features/food/foodSlice";
import {
  deleteFoodByIdThunk,
  getAllFoodThunk,
  serachCategoryTrueThunk,
  serachFoodThunk,
} from "../../features/food/foodAPI";
import { Day, selectDay } from "../../features/day/daySlice";
import { addTodayFoodThunk } from "../../features/day/dayAPI";
import Swal from "sweetalert2";
import { UpdateFood } from "./UpdateFood";
import { Button, Form } from "react-bootstrap";
import { selectSUser } from "../../features/user/userSlice";
import { useLocation } from "react-router-dom";
import { addDietFood, selectDiet } from "../../features/diet/dietSlice";
import { addDietThunk } from "../../features/diet/dietAPI";

export const FoodMenu = React.memo(({}) => {
  const dispatch = useAppDispatch();
  const { foods } = useAppSelector(selectFood);
  const { today } = useAppSelector(selectDay);
  const { diet_foods } = useAppSelector(selectDiet);
  const [dietName, setDietName] = useState<string>("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const add = searchParams.get("add");
  console.log(add);
  const {
    user_log: { status },
  } = useAppSelector(selectSUser);
  const [state, setState] = useState({ food_name: "", category: "", sort: "" });
  useEffect(() => {
    dispatch(serachFoodThunk(state));
  }, [state]);
  useEffect(() => {
    dispatch(getAllFoodThunk());
  }, []);

  const addFood = async ({ today, food }: { today: Day; food: Food }) => {
    const { value: number } = await Swal.fire({
      title: `${food.food_name}`,
      input: "text",
      inputLabel: `${food.category == "Juice" ? "(100ml)" : "(100g)"} - ${
        food.calorie_count
      }`,
      inputPlaceholder: `Write your food ${
        food.category == "Juice" ? "ml" : "gram"
      }`,
    });

    if (number && !isNaN(number)) {
      const data: any = {
        ...food,
        calorie_count: Math.floor((food.calorie_count / 100) * number),
        value: number,
      };
      if (add) {
        dispatch(addDietFood(data));
      } else {
        dispatch(addTodayFoodThunk({ today, food: data }));
      }
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 400,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    }
  };
  const saveDiet = () => {
    dispatch(addDietThunk({ name: dietName, foods: diet_foods })).unwrap().then(res=>{
      console.log(res);
    })
  };
  return (
    <div
      className="div-right"
      style={{ height: `${window.innerHeight - 58.5}px` }}
    >
      <div
        className="fillter"
        style={{
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", height: "40px", gap: "20px" }}>
          {status == "admin" && !add ? <FoodForm /> : <></>}
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setState({ ...state, category: e.target.value })}
          >
            <option hidden value={""}>
              Category
            </option>
            <option value={""}>All Food</option>
            {FoodCategory?.map((e: string, i: number) => {
              return (
                <option value={e} key={i}>
                  {e}
                </option>
              );
            })}
          </Form.Select>
          <Form.Control
            placeholder="Search"
            onChange={(e) => setState({ ...state, food_name: e.target.value })}
          />
          <Button
            variant="primary"
            onClick={() => setState({ ...state, sort: "-" })}
            style={{ width: "90px" }}
          >
            Sort -
          </Button>
          <Button
            variant="primary"
            onClick={() => setState({ ...state, sort: "+" })}
            style={{ width: "90px" }}
          >
            Sort +
          </Button>
        </div>
        {add ? (
          <div style={{ display: "flex", height: "40px", gap: "20px" }}>
            <Form.Control
              placeholder="Enter Diet name"
              onChange={(e) => setDietName(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={saveDiet}
              style={{ width: "120px" }}
            >
              Save Diet
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="foods">
        {foods?.map((e: Food) => {
          return (
            <div key={e.id}>
              <div
                className="w1"
                onClick={() => {
                  if (!today?.diet) {
                    addFood({ today, food: e });
                  }
                }}
              >
                <img
                  src={e.photo_url}
                  style={{ width: "174px", height: "174px" }}
                />

                <p>
                  {e.food_name} {e.category == "Juice" ? "(100ml)" : "(100g)"} -{" "}
                  <span style={{ color: " rgb(11, 0, 0)", fontSize: "17px" }}>
                    {e.calorie_count} calorie
                  </span>
                </p>
              </div>
              {status == "admin" && !add ? (
                <div className="changeDiv">
                  <UpdateFood data={e} />
                  <button
                    onClick={(w) => {
                      w.stopPropagation();
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          dispatch(
                            deleteFoodByIdThunk({ id: e.id, url: e.photo_path })
                          ).then((res) => {
                            Swal.fire(
                              "Deleted!",
                              "Your file has been deleted.",
                              "success"
                            );
                          });
                        }
                      });
                    }}
                  >
                    <img src="/icon/bin.png" />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
