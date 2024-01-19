import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import About from './pages/About';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signout from './pages/Signout';
import Home from './pages/Home';
import Navbar from './components/Navbar';

import './assets/main.css';
import Signup from './pages/signup';


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/sign-in" element={<Signin />}/>
        <Route path="/sign-out" element={<Signout />}/>
        <Route path="/sign-up" element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  )
}
