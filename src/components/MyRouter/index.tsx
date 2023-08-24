import React from "react";
import "./style.scss"
import { useRoutes } from "react-router-dom";
import { Layout } from "../../pages/Layout";
import { Login } from "../../pages/Login";
import { Register } from "../../pages/Register";
import { Profile } from "../../pages/Profile";
import { AddFood } from "../../pages/AddFood";
import { Grafiks } from "../../pages/Grafiks";
import { Diets } from "../../pages/Diets";

export const MyRouter = React.memo(()=>{
   const routes = useRoutes([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Login/>
            },{
                path:'/register',
                element:<Register/>
            },{
                path:'/profile',
                element:<Profile/>
            },{
                path:'/add-food',
                element:<AddFood/>
            },{
                path:'/grafik',
                element:<Grafiks/>
            },{
                path:'/diets',
                element:<Diets/>
            },
        ]
    },
    {
        path:"*",
        element:'404 erore'
    }
   ])
   return routes
})