import React, { useState } from "react";
import { Day } from "../../features/day/daySlice";
import { User } from "../../features/user/userSlice";
import { useAppDispatch } from "../../app/hooks";
import { updateTodayThunk } from "../../features/day/dayAPI";

interface Type {
  today: Day;
  weight:number
}

export const EditeGrafik = React.memo(({ today ,weight }:Type) => {
  const {id, walking, crunch, situp, pushup, barpushup ,rope,water } = today;
  const [num,  setNum ] = useState<string>('')
  const dispatch = useAppDispatch()
  return (
    <div className="editeDivs">

      <div className="div1">
        <div className="s1">
          <h3>Walking</h3>
          {/* <button>Edite</button> */}
        </div>
        <div className="s2">
          <div>{walking} / 6000</div>
          <div className="g1">
            <div style={{width:`${walking/20}px`}}></div>
          </div>    
          <div>{Math.round(walking / 1.5 / 16)} calorie</div>
        </div>
        <div className="s3">
          <input onKeyDown={(e)=>{
            if(e.code == 'Enter' && !isNaN(+num) && num.length>0){
                dispatch(updateTodayThunk({id,data:{walking:walking+ +num}}))
            }
          }} 
          onChange={(e)=>setNum(e.target.value)} />
          <div>
            <button onClick={()=>dispatch(updateTodayThunk({id,data:{walking:walking+200}}))}>+</button>
            <button onClick={()=>dispatch(updateTodayThunk({id,data:{walking:walking-200}}))}>-</button>
          </div>
        </div>
      </div>

      

      <div className="div1">
        <div className="s1">
          <h3>Pushup</h3>
          {/* <button>Edite</button> */}
        </div>
        <div className="s2">
          <div>{pushup} / 200</div>
          <div className="g1">
            <div style={{width:`${pushup*1.5}px`}}></div>
          </div>    
          <div>{Math.round(pushup*0.015*weight)} calorie</div>
        </div>
        <div className="s3">
          <input onKeyDown={(e)=>{
            if(e.code == 'Enter' && !isNaN(+num) && num.length>0){
                dispatch(updateTodayThunk({id,data:{pushup:pushup+ +num}}))
            }
          }} 
          onChange={(e)=>setNum(e.target.value)} />
          <div>
            <button onClick={()=>dispatch(updateTodayThunk({id,data:{pushup:pushup+10}}))}>+</button>
            <button onClick={()=>dispatch(updateTodayThunk({id,data:{pushup:pushup-10}}))}>-</button>
          </div>
        </div>
      </div>


      <div className="div1">
        <div className="s1">
          <h3>Crunch</h3>
          {/* <button>Edite</button> */}
        </div>
        <div className="s2">
          <div>{crunch} / 300</div>
          <div className="g1">
            <div style={{width:`${crunch}px`}}></div>
          </div>    
          <div>{Math.round(crunch * weight * 0.014)} calorie</div>
        </div>
        <div className="s3">
          <input onKeyDown={(e)=>{
            if(e.code == 'Enter' && !isNaN(+num) && num.length>0){
                dispatch(updateTodayThunk({id,data:{crunch:crunch+ +num}}))
            }
          }} 
          onChange={(e)=>setNum(e.target.value)} />
          <div>
            <button onClick={()=>dispatch(updateTodayThunk({id,data:{crunch:crunch+20}}))}>+</button>
            <button onClick={()=>dispatch(updateTodayThunk({id,data:{crunch:crunch-20}}))}>-</button>
          </div>
        </div>
      </div>
      
      <div className="div1">
        <div className="s1">
          <h3>Situp</h3>
          {/* <button>Edite</button> */}
        </div>
        <div className="s2">
          <div>{situp} / 300</div>
          <div className="g1">
            <div style={{width:`${situp}px`}}></div>
          </div>    
          <div>{Math.round(situp * weight * 0.0135)} calorie</div>
        </div>
        <div className="s3">
          <input onKeyDown={(e)=>{
            if(e.code == 'Enter' && !isNaN(+num) && num.length>0){
                dispatch(updateTodayThunk({id,data:{situp:situp+ +num}}))
            }
          }} 
          onChange={(e)=>setNum(e.target.value)} />
          <div>
            <button onClick={()=>dispatch(updateTodayThunk({id,data:{situp:situp+20}}))}>+</button>
            <button onClick={()=>dispatch(updateTodayThunk({id,data:{situp:situp-20}}))}>-</button>
          </div>
        </div>
      </div>


      <div className="div1">
        <div className="s1">
          <h3>Barpushup</h3>
          {/* <button>Edite</button> */}
        </div>
        <div className="s2">
          <div>{barpushup} / 30</div>
          <div className="g1">
            <div style={{width:`${barpushup*10}px`}}></div>
          </div>    
          <div>{Math.round(barpushup * weight * 0.0155)} calorie</div>
        </div>
        <div className="s3">
          <input onKeyDown={(e)=>{
            if(e.code == 'Enter' && !isNaN(+num) && num.length>0){
                dispatch(updateTodayThunk({id,data:{barpushup:barpushup+ +num}}))
            }
          }} 
          onChange={(e)=>setNum(e.target.value)} />
          <div>
            <button onClick={()=>dispatch(updateTodayThunk({id,data:{barpushup:barpushup+1}}))}>+</button>
            <button onClick={()=>dispatch(updateTodayThunk({id,data:{barpushup:barpushup-1}}))}>-</button>
          </div>
        </div>
      </div>

      <div className="div1">
        <div className="s1">
          <h3>Rope</h3>
          {/* <button>Edite</button> */}
        </div>
        <div className="s2">
          <div>{rope} / 1200</div>
          <div className="g1">
            <div style={{width:`${rope/4}px`}}></div>
          </div>    
          <div>{Math.round(rope/3)} calorie</div>
        </div>
        <div className="s3">
          <input onKeyDown={(e)=>{
            if(e.code == 'Enter' && !isNaN(+num) && num.length>0){
                dispatch(updateTodayThunk({id,data:{rope:rope+ +num}}))
            }
          }} 
          onChange={(e)=>setNum(e.target.value)} />
          <div>
            <button onClick={()=>dispatch(updateTodayThunk({id,data:{rope:rope+100}}))}>+</button>
            <button onClick={()=>dispatch(updateTodayThunk({id,data:{rope:rope-100}}))}>-</button>
          </div>
        </div>
      </div>


    </div>
  );
});
