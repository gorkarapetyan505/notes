import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { User } from "./userSlice";
// import { Post } from "../post/postSlice";

const coll = collection(db, "users");

export const loginUserThunk = createAsyncThunk(
  "add user thumk",
  async (user: User) => {
    const res = await addDoc(coll, user);
    return { ...user, id: res.id };
  }
);
export const deleteUserByIdThunk = createAsyncThunk(
  "[delete user thunk]",
  async (id: string) => {
    const d = await deleteDoc(doc(coll, id));
    return id;
  }
);

export const getloginUserThunk = createAsyncThunk(
  "[get login user thunk]",
  async (email: string) => {
    const x = query(coll, where("email", "==", email));
    const data = await getDocs(x);
    const arr = data.docs.map((e) => ({ ...e.data(), id: e.id }));
    if (arr.length > 0) {
      return { ...arr[0] };
    }
  }
);
export const getAllUserThunk = createAsyncThunk(
  "[get all user thunk]",
  async () => {
    const data = await getDocs(coll);
    const arr = data.docs.map((e: any) => ({ ...e.data(), id: e.id } as User));
    return arr;
  }
);
export const getByIdUserThunk = createAsyncThunk(
  "[get  by id user thunk]",
  async (id: string) => {
    const obj = await getDoc(doc(coll, id));
    return { ...obj.data(), id: obj.id };
  }
);
export const getLoginUserThunk = createAsyncThunk(
  "[get login user thunk]",
  async (id: string) => {
    const obj = await getDoc(doc(coll, id));
    return { ...obj.data(), id: obj.id };
  }
);
export const updateByIdUserThunk = createAsyncThunk(
  "[get  by id update thunk]",
  async ({ obj, id }: { obj: { img: string }; id: string }) => {
    const data = await updateDoc(doc(coll, id), obj);
    return "update";
  }
);

export const updateUserPhotoThunk = createAsyncThunk(
  "[update photo thunk]",
  async ({
    userId,
    img,
  }: {
    userId: string;
    img: { photo: string; photoUrl: string };
  }) => {
    // console.log({userId,img})
    const obj = await updateDoc(doc(coll, userId), img);
    return { userId, img };
  }
);

// export const addStoredPostThunk=createAsyncThunk(
//     '[add stored post thunk]',
//     async ({user,post}:{user:User,post:Post})=>{
//         if( user.stored_post && user.stored_post?.some(e=>e.id==post.id)){
//             const obj=await updateDoc(doc(coll,user.id),{stored_post:[...user.stored_post.filter(e=>e.id!=post.id)]})
//             return {stored_post:[...user.stored_post.filter(e=>e.id!=post.id)]}
//         }else{
//             const obj=await updateDoc(doc(coll,user.id),{stored_post:[...user.stored_post,post]})
//             return {stored_post:[...user.stored_post,post]}
//         }
//     }
// )

export const getseeUserPostThunk = createAsyncThunk(
  "[get see user post thunk]",
  async (id: string) => {
    const user = await getDoc(doc(coll, id));
    const y = query(collection(db, "posts"), where("userId", "==", id));
    const data1 = await getDocs(y);

    const posts = data1.docs.map((e) => ({ ...e.data(), id: e.id }));
    return { posts, user: { ...user.data(), id } };
  }
);

export const updateUserThunk = createAsyncThunk(
  "[update user thunk]",
  async ({ id, data }: { id: string; data: any }) => {
    const res = await updateDoc(doc(coll, id), data);
    return data
  }
);
