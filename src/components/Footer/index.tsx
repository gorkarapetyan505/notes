import React, { useEffect } from "react";
import "./style.scss"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const Footer = React.memo(() => {
//   const navigate = useNavigate();
//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//           if (user && user.email) {
            
//           } else {
//             navigate("/");
//           }
//         });
//       }, []);
  return (
    <>
      <footer className="footer">&copy; 2023 Calorie Tracker Website. All rights reserved.</footer>
    </>
  );
});
