import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import About from './pages/About';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signout from './pages/Signout';
import Home from './pages/Home';
import './assets/main.css';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/sign-in" element={<Signin />}/>
        <Route path="/sign-out" element={<Signout />}/>
      </Routes>
    </BrowserRouter>
  )
}
