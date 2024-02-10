// import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import About from './pages/About';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signout from './pages/Signout';
import Home from './pages/Home';
import Navbar from './components/Navbar';

import './assets/main.css';
import Signup from './pages/signup';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-in" element={<Signin />}/>
        <Route path="/sign-out" element={<Signout />}/>
        <Route path="/sign-up" element={<Signup />}/>
        <Route path="/listing/:listingId" element={<Listing />}/>
        <Route element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/create-listing" element={<CreateListing />}/>
          <Route path="/update-listing/:listingId" element={<UpdateListing />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
