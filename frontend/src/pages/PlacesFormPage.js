import { useEffect, useState } from "react";
import { Link, Navigate, useAsyncError, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";

export default function PlacesFormPage() {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([""]); 
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setmaxGuests] = useState(1);
    const [reDirectToPlacesList , setreDirectToPlacesList] = useState(false);
    const [redirect,setRedirect] = useState(false);

    const { action } = useParams();

    useEffect(() => {
      if(!id) {
        return;
      }

      axios.get("http://localhost:4000/places/"+id).then(response => {
        const {data} = response;
        setTitle(data.title);
        setAddress(data.address)
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setmaxGuests(data.maxGuests);
      });
      
     },[id]);

    function inputHeader(text) {
        return <h2 className="text-2xl mt-4">{text}</h2>;
      }
    
      function inputDescription(text) {
        return <p className="text-gray-500 text-sm">{text}</p>;
      }
    
      function preInput(header, description) {
        return (
          <>
            {inputHeader(header)}
            {inputDescription(description)}
          </>
        );
      }
    
      async function addNewPlace(ev) {
        ev.preventDefault();
        const placedata = 
          {title , address , addedPhotos , 
          description , Perks , extraInfo ,
          checkIn , checkOut , maxGuests};
    
        const res = await axios.post('http://localhost:4000/places' , placedata);
        console.log(res.data);
        setreDirectToPlacesList(true); 
        setRedirect(true);
      }

      if(redirect){
        return <Navigate to={"/account/places"}/>
      }

      if(reDirectToPlacesList && !action){
        return <Navigate to={"/account/places"}/>
      }

  return (
    <>
      <div>
        <AccountNav/>
        <form onSubmit={addNewPlace}>
          {preInput(
            "Title",
            "Title for your place shoule be short and classy as advertisement"
          )}
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="title , for example : my lovely apparment"
          />
          {preInput("Address", "Address to this place")}
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="address"
          />
          {preInput("Photos", "mode = better")}
          <PhotosUploader />
          {preInput("Description", "Description of the place")}
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />

          {preInput("Perks", "select all perks of your places")}
          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks} />
          </div>
          {preInput("Extra info", "house rules , etc")}
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          {preInput(
            "Check in&out time",
            "add check in&out time,remember to clean bedRoom"
          )}
          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                placeholder="14:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                placeholder="22:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">max number of Guest</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(ev) => setmaxGuests(ev.target.value)}
              />
            </div>
          </div>
          <div>
            <button className="primary my-4">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
