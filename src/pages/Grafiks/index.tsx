import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getLoginUserThunk,
  getloginUserThunk,
} from "../../features/user/userAPI";
import { useNavigate } from "react-router-dom";
import { getTodayThunk, searchDayThunk } from "../../features/day/dayAPI";
import { selectDay } from "../../features/day/daySlice";
import Chart from "react-apexcharts";
import "./style.scss";
import { Button, Form } from "react-bootstrap";

import { selectSUser } from "../../features/user/userSlice";

type FormType = {
  year: number;
  month: number;
  category: string;
  grafik: string;
};
export const Grafiks = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user_log } = useAppSelector(selectSUser);
  const { day_data } = useAppSelector(selectDay);
  const date = new Date();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>();
  const [state, setState] = useState<any>({
    options: {
      colors: ["#E91E63"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "People Born",
        data: [],
      },
    ],
    type: "line",
  });
  const d1 = (data: any, category: string) => {
    switch (category) {
      case "Walking":
        return [...data.map((e: any) => e.walking)];
      case "Pushup":
        return [...data.map((e: any) => e.pushup)];
      case "Crunch":
        return [...data.map((e: any) => e.crunch)];
      case "Situp":
        return [...data.map((e: any) => e.situp)];
      case "Barpushup":
        return [...data.map((e: any) => e.barpushup)];
      case "Foods":
        return [
          ...data.map((e: any) =>
            e.foods.reduce((a: any, b: any) => a + +b.calorie_count, 0)
          ),
        ];
    }
    return [];
  };
  
  const search = (data: FormType) => {
    console.log(user_log.id);
    dispatch(
      searchDayThunk({ id: user_log.id, year: data.year, month: data.month })
    )
      .unwrap()
      .then((res: any) => {
        const arr = res.sort((a: any, b: any) => a.day - b.day);
        setState({
          options: {
            colors: ["#0D6EFD"],
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: [...arr.map((e: any) => e.day)],
            },
          },
          series: [
            {
              name: data.category,
              data: d1(arr, data.category),
            },
          ],
          type: state.type,
        });
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        dispatch(getloginUserThunk(user.email));
        search({year: date.getFullYear(),
          month: date.getMonth(),
          category: "Walking",
          grafik: "bar"})
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <div className="Grafik">
      <div className="selects">
        <Form onSubmit={handleSubmit(search)}>
          <Form.Select
            aria-label="Default select example"
            defaultValue={date.getFullYear()}
            {...register("year", { required: "enter year" })}
          >
            <option value={""} hidden key={0}>
              Year
            </option>
            <option value="2023" key={1}>
              2023
            </option>
          </Form.Select>

          <Form.Select
            defaultValue={date.getMonth()}
            aria-label="Default select example"
            {...register("month", { required: "enter month" })}
          >
            <option value={""} hidden key={"100"}>
              Mount
            </option>
            <option value="0" key={0}>
              January
            </option>
            <option value="1" key={1}>
              February
            </option>
            <option value="2" key={2}>
              March
            </option>
            <option value="3" key={3}>
              April
            </option>
            <option value="4" key={4}>
              May
            </option>
            <option value="5" key={5}>
              June
            </option>
            <option value="6" key={6}>
              July
            </option>
            <option value="7" key={7}>
              August
            </option>
            <option value="8" key={8}>
              September
            </option>
            <option value="9" key={9}>
              October
            </option>
            <option value="10" key={10}>
              November
            </option>
            <option value="11" key={11}>
              December
            </option>
          </Form.Select>

          <Form.Select
            defaultValue={"Walking"}
            {...register("category", { required: "enter category  " })}
          >
            <option value={""} hidden>
              Category
            </option>
            <option value="Walking">Walking</option>
            <option value="Pushup">Pushup</option>
            <option value="Crunch">Crunch</option>
            <option value="Situp">Situp</option>
            <option value="Barpushup">Barpushup</option>
            <option value="Foods">Foods</option>
          </Form.Select>
          <Button type="submit" variant="primary">
            Search
          </Button>
        </Form>
      </div>
      <div className="d1">
        <Chart
          options={state.options}
          series={state.series}
          type={state.type}
          width="1000"
        />
        <div className="images">
          <img src="/img/basic-bar.png" onClick={()=>setState({...state,type:"bar"})} className = {state.type == "bar"?'border':''} />
          <img src="/img/basic-bar (1).png" onClick={()=>setState({...state,type:"line"})} className = {state.type == "line"?'border':''} />
          <img src="/img/basic-bar (2).png" onClick={()=>setState({...state,type:"area"})} className = {state.type == "area"?'border':''}/>
          {/* <img src="/img/basic-bar (3).png" onClick={()=>setState({...state,type:"rader"})} className = {state.type == "rader"?'border':''}/> */}
          <img src="/img/basic-bar (4).png" onClick={()=>setState({...state,type:"scatter"})} className = {state.type == "scatter"?'border':''}/>
          <img src="/img/basic-bar (5).png" onClick={()=>setState({...state,type:"heatmap"})} className = {state.type == "heatmap"?'border':''}/>
        </div>
      </div>
    </div>
  );
});
