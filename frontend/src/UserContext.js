import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {data} from "autoprefixer";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user,setUser] = useState( null);
    const [ready , setReady] = useState(false);

    useEffect( ()=>{
      // async function fetchData(){
      //   try{
      //     if(!user){
      //       const res  = await axios.get("http://localhost:4000/profile");
      //       console.log(res.data);
      //       setUser(res.data);
      //     }
      //   }catch(err){
      //     console.log(err);
      //   }
      // }
      // fetchData();

      if(!user) {
        axios.get("http://localhost:4000/profile").then(({data}) => {
          setUser(data);
          setReady(true);
        })
      }

    },[])
  return <UserContext.Provider value={{user,setUser,ready}}>{children}</UserContext.Provider>;
}


