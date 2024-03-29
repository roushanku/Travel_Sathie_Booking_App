import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
export default function  PlacePage() {
    const {id} = useParams();
    const [place , setPlace] = useState(null);
    useEffect(() => {
        if(!id) {
            return;
        }

        axios.get(`http://localhost:4000/places/${id}`).then(response => {
            setPlace(response.data);
        });
    } , [id]);
    if(!place) return "";
    return ( 
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="tect-3xl">{place.title}</h1>
            <a className="my-2 block font-semibold underline" target="blank" href={'https://maps.google.com/?q=' + place.address}>{place.address}</a>
            <div className="grid gap-2 grid-cols-[2fr_1fr]">
                <div className="">
                    image 1
                    <img className="aspect-square object-cover "src="https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/495309476.jpg?k=78c036d9191c26b58bdc75880aca796994fc692c1402906986058d183ea22a7b&o=" alt=""></img>
                </div>
                <div className="">
                    image 2
                    <img className="aspect-square object-cover"src="https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/495324733.jpg?k=dea16d0a7e755d604654bd6df6824907ea2b57ec89a9f27205c57eb7bca63a34&o= " alt=""></img>
                    <img className="aspect-square object-cover"src="https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/495309457.jpg?k=c60159df4cded5c28ba77e9bac28a56f5953cc36462b54eb612aea224514c732&o="></img>
                </div>
            </div>
        </div>
    );
} 