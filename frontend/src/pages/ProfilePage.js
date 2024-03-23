import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Placespage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
    const {ready , user , setUser} = useContext(UserContext);
    const [redirect , setRedirect] = useState(null);

    let {subpage} = useParams();
    // console.log("This is subapge",subpage);
    if(subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('http://localhost:4000/logout');
        setUser(null);
        setRedirect('/');
    } 
    if(!ready) {
        return 'Loading......';
    }

    if(ready && !user && !redirect) {
        return <Navigate to={'/login'}/>
    }


    if(redirect) {
        return <Navigate to={redirect}/>
    }

    return (
        <div>
        <AccountNav/>
        {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
                Logged in as {user.name} ({user.email})<br />
                <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
            </div>
        )} 

        {subpage === 'places' && (
            <Placespage/>
        )}
        </div>
    );
}
