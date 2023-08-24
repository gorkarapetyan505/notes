import React, { useState } from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import { User } from "../../features/user/userSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAppDispatch } from "../../app/hooks";
import {
  loginUserThunk,
  updateByIdUserThunk,
} from "../../features/user/userAPI";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export const Register: React.FC = React.memo((): JSX.Element => {
  const [img, setImg] = useState<any>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const save = (data: User) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res: any) => {
        const { password, ...us } = data;
        dispatch(loginUserThunk({ ...data, photo: "", photoUrl: "" ,status:"user"})).then(
          (user: any) => {
            reset();
            navigate("/profile");
          }
        );
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Does the email you wrote exist?",
        });
      });
  };
  return (
    <div
      className="f1
  "
    >
      <div className="register">
        <form onSubmit={handleSubmit(save)}>
          <input
            {...register("name", { required: "enter your name" })}
            placeholder="Name"
            className="inp1"
          />
          {/* {errors.name && <p>{errors.name.message}</p>} */}

          <input
            {...register("surname", { required: "enter your surname" })}
            placeholder="Surname"
            className="inp1"
          />
          {/* {errors.surname && <p>{errors.surname.message}</p>} */}

          <input
            {...register("age", { required: "enter your age" })}
            placeholder="Age"
            className="inp1"
          />
          {/* {errors.age && <p>{errors.age.message}</p>} */}
          <input
            {...register("height", { required: "enter your height" })}
            placeholder="Height"
            className="inp1"
          />

          <input
            {...register("weight", { required: "enter your weight" })}
            placeholder="Weight"
            className="inp1"
          />

          <input
            {...register("email", { required: "enter your email" })}
            placeholder="Email"
            className="inp1"
          />
          {/* {errors.email && <p>{errors.email.message}</p>} */}

          <input
            {...register("password", { required: "enter your password" })}
            placeholder="Password"
            className="inp1"
          />
          <div className="loginLink">
            <Link to={"/"}>Login</Link>
          </div>
          <button className="button123">Register</button>
        </form>
      </div>
    </div>
  );
});
