import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import Registerpage from './pages/Registerpage';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
        <Route path = "/" element={<Layout/>}>
        <Route path='/' element={<IndexPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<Registerpage/>}/>
        </Route> 
        </Routes>
      </BrowserRouter>
  )
}

export default App
