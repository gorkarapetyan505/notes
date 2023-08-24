import React from "react";
import "./style.scss"
import { Menu } from "../../components/Menu";
import { Outlet } from "react-router-dom";

export const Layout = React.memo(()=>{
    return <div className="" style={{backgroundColor: '#252525'}} >
        <Menu/>
        <Outlet/>
    </div>
})