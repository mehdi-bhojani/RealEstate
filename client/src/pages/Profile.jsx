import React from 'react';
import {useSelector} from 'react-redux';

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)  
    return (
      <>
    <div className='max-w-lg m-0 p-5 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col space-y-7'>
        <img className='cursor-pointer rounded-full my-3 max-w-fit object-cover self-center' src={currentUser.avatar} alt="" />
        <input className='p-3 rounded text-lg bg-gray-100 focus:outline-none' type="text" placeholder='username' />
        <input className='p-3 rounded text-lg bg-gray-100 focus:outline-none' type="email" placeholder='email' />
        <input className='p-3 rounded text-lg bg-gray-100 focus:outline-none' type="password" placeholder='password' />
        <button className='p-3 bg-slate-600 text-white rounded uppercase font-medium hover:opacity-75 disabled:opacity-80' type='submit'>Update</button>
        <div className="flex justify-between">
          <span className='text-red-600 font-medium'>Delete Account</span>
          <span className='text-red-600 font-medium'>Signout</span>
        </div>
      </form>
    </div>
    </>
  )
}
