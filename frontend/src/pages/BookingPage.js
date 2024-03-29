import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookingPage() {
    const [booking , setBooking] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        axios.get('http://localhost:4000/bookings').then(response => {
            const foundBooking = response.data.find(({_id}) => _id === id);
            if(foundBooking) {
                setBooking(foundBooking);
            }
        })
    } ,[id]);

    if(!booking) {
        return "";
    }
    return (
        <div>
            Single Booking... {id}
        </div>
    );
}