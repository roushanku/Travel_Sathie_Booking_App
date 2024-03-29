import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import Registerpage from './pages/Registerpage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './pages/ProfilePage';
import Placespage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';

axios.defaults.withCredentials = true;

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
        <Route path = "/" element={<Layout/>}>
        <Route path='/' element={<IndexPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<Registerpage/>}/>
        <Route path='/account' element={<ProfilePage/>}/>
        <Route path='/account/places' element={<Placespage/>}/>
        <Route path='/account/places/new' element={<PlacesFormPage/>}/>
        <Route path='/account/places/:id' element={<PlacesFormPage/>}/>
        <Route path='/place/:id' element={<PlacePage/>}/> 
        <Route path='/account/bookings' element={<BookingsPage/>}/>
        <Route path='/account/bookings/:id' element={<BookingPage/>}/>
        </Route> 
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
