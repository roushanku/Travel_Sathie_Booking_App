import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user,setUser] = useState( null);

    useEffect( ()=>{
      async function fetchData(){
        try{
          if(!user){
            const res  = await axios.get("http://localhost:4000/profile");
            console.log(res.data);
            setUser(res.data);
          }
        }catch(err){
          console.log(err);
        }
      }
      fetchData();
    },[])
  return <UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>;
}
