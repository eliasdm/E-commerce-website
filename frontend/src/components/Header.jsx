import React from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../common';
import {toast} from 'react-toastify'
import { Link} from 'react-router-dom'
import { setUserDatails } from '../store/userSlice';

export const Header = () => {

  const user = useSelector(state=>state?.user?.user)
  const dispatch = useDispatch()
  const handleLogout = async() => {
    const respose = await fetch(summaryApi.logout.url,{
      method:summaryApi.logout.method,
      credentials:'include'
    });

    const result = await respose.json();
    if(respose.ok){
      toast.success(result.message)
      dispatch(setUserDatails(null))

    }else
        toast.error('error')
  }

  return ( 
   <header className='h-12 w-full shadow-md bg-white' >
    <div className=' h-full container mx-auto flex items-center px-1 justify-between'>
      <div className=''>
          <Logo w={40} h={50}/>
      </div>

      <div className='flex item-center w-full justify-between max-w-md border rounded-full'>
        <input type="text" placeholder='search product' className='w-full outline-none focus-within:shadow-md bg-slate-100 px-6 rounded-l-full' />
        <div className='text-lg min-w-[50px] bg-blue-400 flex items-center justify-center rounded-r-full'>
          <FaSearch/>
        </div>
      </div>

      <div className='flex items-center gap-7'>

        <div className='text-2xl cursor-pointer'>
            {
              user?.name?(
                <p className= ' bg-blue-600  text-white uppercase w-6 h-6 p-1  flex items-center justify-center rounded-full'>
                  {user?.name.slice(0,1)}</p>
              )
              :(
                <FaRegCircleUser/>
              )
            }

        </div>

        <div className='text-2xl relative'>
            <span><FaShoppingCart/></span>

            <div className='bg-blue-400 text-white w-5 h-5 rounded-full p-1 flext items-center justify-center absolute -top-2 -right-2'>
                <p className='text-sm'>0</p>
            </div>
        </div>

        <div>
          {
            user?._id ?(
              <button onClick={handleLogout} className='bg-blue-500 rounded-full text-white px-3 hover:bg-blue-600'>logout</button>
            )
            :(
              <Link to="/login" className='bg-blue-500 rounded-full text-white px-3 hover:bg-blue-600'>Login</Link>
            )
          }
        </div>
      </div>
    </div>
   </header> 

  )
}

export default Header