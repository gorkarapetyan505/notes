import React from "react";
import { Day } from "../../features/day/daySlice";
import { User } from "../../features/user/userSlice";
interface Type{
    today:Day
}

export const ProfileGrafik = React.memo(({today,user}:{today:Day,user:User})=>{
    const {walking , crunch , situp ,pushup , barpushup , water,rope}  = today
    // console.log(today.id)
    return <div>
        <div className="grafik">
            <div style={walking/20 <= 300 ?{height:`${walking/20}px`}:{height:`${walking/20/2}px`}}> <span className="name">Walking</span><span className="e1">{walking} / 6000</span></div>
            <div style={pushup*1.5 <=300?{height:`${pushup*1.5}px`}:{height:`${pushup*1.5}px`}}><span className="name">Pushup</span><span className="e1">{pushup} / 200</span></div>
            <div style={crunch <= 300 ?{height:`${crunch}px`}:{height:`${crunch/2}px`}}><span className="name">Crunch</span><span className="e1">{crunch} / 300</span></div>
            <div style={situp<=300?{height:`${situp}px`}:{height:`${situp/2}px`}}><span className="name">Situp</span><span className="e1">{situp} / 300</span></div>
            <div style={barpushup*10 <=300?{height:`${barpushup*10}px`}:{height:`${barpushup*10/2}px`}}><span className="name">Barpushup</span><span className="e1">{barpushup} / 30</span></div>
            <div style={rope/4 <=300?{height:`${rope/4}px`}:{height:`${rope/8}px`}}><span className="name">Rope</span><span className="e1">{rope} / 1200</span></div>
        </div>
        {/* <div>{Math.ceil(user.weight*((0.0155*barpushup)+ (0.0115*pushup)+(0.0135*situp)+(0.014*situp)))} kaloria</div> */}
    </div>
})