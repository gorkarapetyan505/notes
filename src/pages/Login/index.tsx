import React, { useEffect } from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login: React.FC = React.memo((): JSX.Element => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        navigate("/profile");
      }
    });
  }, []);
  const save = (data: any) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        // console.log(res);
        navigate("/profile");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your email or password is incorrect",
        });
      });
  };
  return (
    <div className="login">
      <div className="box">
        <div className="form">
          <form onSubmit={handleSubmit(save)}>
            <h2>Singn in</h2>
            <div className="inputBox">
              <input type="text" required {...register("email")} />
              <span>Username</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input type="password" required {...register("password")} />
              <span>Password</span>
              <i></i>
            </div>
            <div className="link">
              <a href="#">Forget Password</a>
              {/* <a href="#"></a> */}
              <Link to={"/register"}>Signup</Link>
            </div>
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
});
